import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- DOM Elements ---
const homeView = document.getElementById('home-view');
const docsView = document.getElementById('docs-view');
const homeSearchForm = document.getElementById('home-search-form');
const homeSearchInput = document.getElementById('home-search-input');
const suggestionsContainer = document.getElementById('search-suggestions');
const cardsContainer = document.getElementById('category-cards-container');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const docsNav = document.getElementById('docs-nav');
const docsContentWrapper = document.getElementById('docs-content-wrapper');
const docsSearchInput = document.getElementById('docs-search-input');
const printButton = document.getElementById('print-button');

// --- App State ---
const appState = {
    notes: [],
    procedures: [],
    activeDoc: null
};

// --- Navigation ---
function navigateToDocs(section, docId = null) {
    homeView.classList.add('hidden');
    docsView.classList.remove('hidden');
    renderDocsNav(appState[section]);
    if (docId) {
        displayItemContent(section, docId);
    } else {
        docsContentWrapper.innerHTML = '<div class="placeholder"><h2>Select a page from the list.</h2></div>';
        printButton.classList.remove('visible');
    }
}

function navigateToHome() {
    docsView.classList.add('hidden');
    homeView.classList.remove('hidden');
    homeSearchInput.value = '';
    suggestionsContainer.innerHTML = '';
}

// --- Rendering ---
function renderDocsNav(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.dataset.id = item.id;
        li.dataset.section = item.section;
        ul.appendChild(li);
    });
    docsNav.innerHTML = '';
    docsNav.appendChild(ul);
}

function displayItemContent(section, docId) {
    const doc = appState[section].find(d => d.id === docId);
    if (doc) {
        appState.activeDoc = doc;
        docsContentWrapper.innerHTML = doc.contentHtml;
        printButton.classList.add('visible');
        docsSearchInput.value = ''; // Clear in-page search on new page
        // Highlight active item in nav
        docsNav.querySelector('.active')?.classList.remove('active');
        docsNav.querySelector(`[data-id="${docId}"]`)?.classList.add('active');
    }
}

// --- Search ---
function handleInPageSearch() {
    if (!appState.activeDoc) return;
    const searchTerm = docsSearchInput.value.trim();
    let content = appState.activeDoc.contentHtml;
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        content = content.replace(regex, match => `<mark class="highlight">${match}</mark>`);
    }
    docsContentWrapper.innerHTML = content;
    const firstHighlight = docsContentWrapper.querySelector('.highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// --- Main Initialization & Event Handlers ---
async function fetchData(collectionName, sectionId) {
    const q = query(collection(db, collectionName), orderBy('title', 'asc'));
    const snapshot = await getDocs(q);
    const tempDiv = document.createElement('div');
    return snapshot.docs.map(doc => {
        const data = doc.data();
        tempDiv.innerHTML = data.contentHtml;
        return {
            id: doc.id,
            ...data,
            textContent: tempDiv.textContent || "",
            section: sectionId
        };
    });
}

async function main() {
    [appState.notes, appState.procedures] = await Promise.all([
        fetchData('notes', 'notes'),
        fetchData('procedures', 'procedures')
    ]);

    renderCategoryCards();

    // --- Event Listeners ---
    backToHomeBtn.addEventListener('click', navigateToHome);
    printButton.addEventListener('click', () => window.print());
    docsSearchInput.addEventListener('input', handleInPageSearch);
    cardsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (card) navigateToDocs(card.dataset.section);
    });

    homeSearchInput.addEventListener('input', handleHomeSearch);
    homeSearchForm.addEventListener('submit', (e) => e.preventDefault());
    suggestionsContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) navigateToDocs(item.dataset.section, item.dataset.id);
    });

    // ** THIS IS THE CORRECTED, WORKING EVENT LISTENER **
    docsNav.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (li) {
            displayItemContent(li.dataset.section, li.dataset.id);
        }
    });
}

function handleHomeSearch() {
    const searchTerm = homeSearchInput.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = '';
    if (!searchTerm) return;
    const allItems = [...appState.notes, ...appState.procedures];
    const results = allItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.textContent.toLowerCase().includes(searchTerm)
    ).slice(0, 7);
    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `${item.title} <small>${item.section === 'notes' ? 'Meds' : 'Proc'}</small>`;
        div.dataset.id = item.id;
        div.dataset.section = item.section;
        suggestionsContainer.appendChild(div);
    });
}

function renderCategoryCards() {
    const sections = [
        { id: 'notes', title: 'Medication Database', description: 'Search for specific drugs and pharmacology information.' },
        { id: 'procedures', title: 'Pharmacy Procedures', description: 'Internal SOPs and pharmacy-specific guidelines.' }
    ];
    cardsContainer.innerHTML = '';
    sections.forEach(section => {
        const count = appState[section.id].length;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.dataset.section = section.id;
        card.innerHTML = `<h3>${section.title}</h3><p>${section.description}</p><span>${count} pages</span>`;
        cardsContainer.appendChild(card);
    });
}

main();