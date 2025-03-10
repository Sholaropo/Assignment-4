export type LoanType = {
    id: string;
    amount: string;
    description: string;
    approved: boolean;
    reviewed: boolean;
    createdAt: Date;
    updatedAt: Date;
}