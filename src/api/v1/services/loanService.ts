import { Loan } from "../models/loanModel";
import {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByFieldValue,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "loans";

/**
 * @description Get all loans.
 * @returns {Promise<Loan[]>}
 */
export const getAllLoans = async (): Promise<Loan[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Loan;
    });
};

/**
 * @description Get loans by a specific field value.
 * @param {string} fieldName - The name of the field to filter by.
 * @param {any} fieldValue - The value to match against the field.
 * @param {number} [limit] - Optional maximum number of loans to return.
 * @returns {Promise<Loan[]>} Array of loans matching the criteria.
 * @throws {Error} If no loans with the given field value are found or if the query fails.
 */
export const getLoansByField = async (
    fieldName: string,
    fieldValue: any,
    limit?: number
): Promise<Loan[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot =
        await getDocumentsByFieldValue(
            COLLECTION,
            fieldName,
            fieldValue,
            limit
        );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Loan;
    });
};

/**
 * @description Create a new loan.
 * @param {Partial<Loan>} loan - The loan data.
 * @returns {Promise<Loan>}
 */
export const createLoan = async (loan: Partial<Loan>): Promise<Loan> => {
    const id: string = await createDocument(COLLECTION, loan);
    return { id, ...loan } as Loan;
};

/**
 * @description Update an existing loan.
 * @param {string} id - The ID of the loan to update.
 * @param {Partial<Loan>} loan - The updated loan data.
 * @returns {Promise<Loan>}
 * @throws {Error} If the loan with the given ID is not found.
 */
export const updateLoan = async (
    id: string,
    loan: Partial<Loan>
): Promise<Loan> => {
    await updateDocument(COLLECTION, id, loan);
    return { id, ...loan } as Loan;
};

/**
 * @description Delete a loan.
 * @param {string} id - The ID of the loan to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the loan with the given ID is not found.
 */
export const deleteLoan = async (id: string): Promise<void> => {
    await deleteDocument(COLLECTION, id);
};
