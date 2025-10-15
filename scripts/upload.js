import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile, readdir, stat } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// --- Firebase Admin SDK Initialization ---
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
console.log('Firebase Admin SDK initialized.');

// Helper functions (processCallouts, getIconForCallout) remain the same...
function processCallouts(html) {
    const calloutRegex = /<blockquote>\s*<p>\[!(.*?)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/g;
    return html.replace(calloutRegex, (match, type, content) => {
        const calloutType = type.toLowerCase().trim();
        const lines = content.split('<br>');
        const title = lines.shift().trim();
        const body = lines.join('<br>').trim();
        return `<div class="callout callout-${calloutType}"><div class="callout-title"><span class="callout-icon">${getIconForCallout(calloutType)}</span><span class="callout-title-text">${title}</span></div><div class="callout-content"><p>${body.replace(/<br>/g, '</p><p>')}</p></div></div>`;
    });
}
function getIconForCallout(type) {
    if (type === 'warning') {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>';
    }
    return '';
}

/**
 * Generic function to upload all markdown files from a directory to a specified Firestore collection.
 * @param {string} dirName - The name of the directory (e.g., 'notes').
 * @param {string} collectionName - The name of the Firestore collection (e.g., 'notes').
 */
async function uploadFromDirectory(dirName, collectionName) {
    const directoryPath = path.join(process.cwd(), `../${dirName}`);

    try {
        await stat(directoryPath); // Check if directory exists
    } catch (error) {
        console.log(`Directory '../${dirName}' not found, skipping.`);
        return;
    }

    const collectionRef = db.collection(collectionName);
    const files = await readdir(directoryPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    if (markdownFiles.length === 0) {
        console.log(`No markdown files found in '/${dirName}'.`);
        return;
    }

    console.log(`Processing ${markdownFiles.length} files from '/${dirName}' for collection '${collectionName}'...`);
    const batch = db.batch();

    for (const file of markdownFiles) {
        const filePath = path.join(directoryPath, file);
        const fileContent = await readFile(filePath, 'utf8');
        let { data: frontmatter, content: markdownContent } = matter(fileContent);

        const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
        markdownContent = markdownContent.replace(wikiLinkRegex, (_, link, alias) => alias || link);

        let contentHtml = marked(markdownContent, { breaks: true });
        contentHtml = processCallouts(contentHtml);

        const docId = path.basename(file, path.extname(file)).replace(/\s+/g, '-');
        const docRef = collectionRef.doc(docId);

        batch.set(docRef, {
            title: frontmatter.title || path.basename(file, path.extname(file)),
            tags: frontmatter.tags || [],
            creation_date: frontmatter.creation_date ? new Date(frontmatter.creation_date) : new Date(),
            last_modified: frontmatter.last_modified ? new Date(frontmatter.last_modified) : new Date(),
            contentHtml: contentHtml
        });
    }

    await batch.commit();
    console.log(`Successfully uploaded ${markdownFiles.length} documents to '${collectionName}'.`);
}

// --- Main Execution ---
async function main() {
    console.log("Starting content upload process...");
    await uploadFromDirectory('notes', 'notes');
    await uploadFromDirectory('procedures', 'procedures');
    console.log("Upload process finished.");
}

main();