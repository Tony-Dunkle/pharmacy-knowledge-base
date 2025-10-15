---
creation_date: 2025-10-15
last_modified: 2025-10-15
tags: [pharmacy, software, pioneer-rx, billing, accounts-receivable, credit-cards]
---

# Managing A/R and Credit Cards in PioneerRx

This note outlines the standard procedures for adding new **Accounts Receivable (A/R)** accounts and storing **Credit Cards** on file within the [[PioneerRx]] pharmacy software system. Properly managing these features is critical for efficient billing, patient convenience, and maintaining compliance.

***

## Adding a New A/R Account

An [[Accounts Receivable (A/R)]] account allows patients or families to charge prescriptions and other items to a house account, which can then be billed on a recurring cycle.

### Step-by-Step Instructions

1.  **Navigate to the Patient Profile**: Search for and select the primary patient who will be the account holder.
2.  **Open the A/R Tab**: Within the patient's profile, locate and click on the **A/R** tab. This section manages all charge account activities for that patient.
3.  **Create the New Account**:
    * Click the **"Add New Account"** or a similarly labeled button. If the patient is not already associated with an account, the system may prompt you to create one automatically.
    * A new window or form will appear to configure the A/R account details.
4.  **Enter Account Information**:
    * **Account Holder**: The patient's name will typically auto-populate. This can be changed if another individual (e.g., a caregiver or parent) is financially responsible.
    * **Billing Address**: Confirm the mailing address for statements is correct.
    * **Credit Limit**: Set a maximum balance the account is allowed to carry. This is a crucial step for risk management. A value of **$0.00** may signify an unlimited limit, depending on system configuration.
    * **Billing Cycle**: Assign the account to a predefined billing cycle (e.g., "Monthly," "End-of-Month," "1st-of-Month"). This determines when statements are generated.
5.  **Save the Account**: Once all required fields are completed, click **"Save"** or **"OK"** to finalize the creation of the account.

### Key Considerations

* **Linking Family Members**: After creating the primary account, you can link other family members to it. This allows multiple patients to charge to a single, consolidated statement. This is typically done from the A/R tab of each family member's profile by searching for and linking to the existing account holder.
* **Charging to the Account**: Once the A/R account is active, a new payment option, "Charge to A/R," will become available at the [[Point of Sale (POS)]] for that patient and any linked members.

***

## Adding a Credit Card on File

Storing a credit card allows for quick, convenient payment of copays at the POS or for settling A/R balances automatically. This process is designed to be secure and compliant with industry standards.

### Step-by-Step Instructions

1.  **Navigate to the Patient Profile**: Search for and select the relevant patient.
2.  **Access the Payment Information Section**: Go to the **A/R** tab. There is typically a dedicated section or button for managing cards, often labeled **"Card on File," "Manage Cards,"** or represented by a credit card icon.
3.  **Initiate the "Add Card" Process**: Click the button to add a new card. This will launch a secure entry form.
4.  **Enter Card Details**:
    * Use the connected, patient-facing card terminal (PIN pad) to enter the card information. **For security and [[PCI Compliance]], pharmacy staff should never handle the patient's card or manually type the full card number into the software.**
    * The patient will swipe, insert, or tap their card and enter the requested information (e.g., CVV, ZIP code) on the PIN pad.
5.  **Save the Tokenized Card**: After the patient confirms the details on the terminal, the system will securely save a **token** representing the card—not the actual card number. This token can be used for future transactions. The card will now appear (usually masked, e.g., "Visa ****1234") in the patient's profile.

### Important Notes on Security

* **[[PCI Compliance]]**: PioneerRx uses tokenization to ensure that sensitive cardholder data is not stored on your local server. This is essential for protecting patient data and meeting payment card industry regulations.
* **[[HIPAA]]**: While credit card information itself is not Protected Health Information (PHI), its association with a patient profile makes security paramount. Always follow established procedures and never write down or store card numbers insecurely.