---
creation_date: 2025-10-15
last_modified: 2025-10-15
tags: [pharmacy, software, pioneer-rx, pos, transactions, returns, auditing]
---

# Using the Post-Receipt Scan Function in PioneerRx

This note details the purpose and procedure for using the **Post-Receipt Scan** function within the [[PioneerRx]] pharmacy software. This feature is a powerful tool for quickly recalling completed transactions directly from the physical receipt.

The primary purpose of this function is to streamline common post-sale activities such as returns, receipt reprints, and transaction verifications. It works by scanning the unique **barcode** printed at the bottom of every receipt, which serves as a direct link to the transaction record in the system.

***

## Core Functionality & Use Cases

Scanning a receipt barcode from the [[Point of Sale (POS)]] screen immediately retrieves the associated transaction details. This avoids the need to manually search for a patient and then sift through their sales history.

**Common use cases include:**

* **Processing [[Returns and Refunds]]**: Quickly pull up a sale to return one or more items to inventory and refund the patient's payment.
* **Reprinting Receipts**: Generate a duplicate receipt for a patient who lost the original. This is often required for insurance, flexible spending accounts, or health savings accounts ([[FSA/HSA Compliance]]).
* **Transaction Verification**: Instantly view the details of a past sale to confirm items purchased, copay amounts, or payment method used.
* **Auditing**: Efficiently check and validate sales during end-of-day reconciliation or for inventory queries.

***

## Step-by-Step Procedure

The process is designed for speed and efficiency at the checkout counter.

1.  **Navigate to the POS Screen**: Ensure you are on the main [[Point of Sale (POS)]] interface where you would normally ring up sales. The screen should be cleared and ready for a new transaction (no items or patient loaded).
2.  **Acquire the Patient's Receipt**: You must have the original physical receipt that you wish to look up.
3.  **Scan the Receipt Barcode**: Using your standard barcode scanner, scan the barcode located on the receipt (typically at the very bottom).
4.  **Transaction Recall**: The system will automatically close the POS screen and open a detailed view of the recalled transaction. This view will display:
    * All items included in the sale.
    * Payment information (e.g., cash, credit card type).
    * Date and time of the transaction.
    * The cashier who processed the sale.
5.  **Perform the Desired Action**: From this screen, you will have several options available, such as:
    * **Return Items**: Select specific items from the list to process a return.
    * **Reprint Receipt**: Click a button to send a duplicate copy of the receipt to the printer.
    * **View Details**: Simply review the information and close the window when finished.

***

### Key Considerations

* **Damaged Barcodes**: If a receipt's barcode is smudged, torn, or otherwise unreadable, you will not be able to use this function. In such cases, you must revert to a [[Manual Transaction Lookup]] through the patient's profile.
* **User Permissions**: Certain actions, particularly processing returns or voids, may be restricted by [[User Permissions]]. A manager's authorization or login may be required to complete these tasks.
* **Audit Trail**: Every action performed after recalling a transaction (e.g., a return or reprint) is logged in the system. This creates a clear and traceable record, which is critical for maintaining accurate financial and [[Inventory Management]] records.