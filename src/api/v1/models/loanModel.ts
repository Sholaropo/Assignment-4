/**
 * @interface Loan
 * @description Represents a loan object.
 */
export type Loan = {
    id: string;
    amount: string;
    description: string;
    approved: boolean;
    reviewed: boolean;
    createdAt: Date;
    updatedAt: Date;
};
