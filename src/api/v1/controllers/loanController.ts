import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loanService";
import type { Loan } from "../models/loanModel";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Get all loans.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllLoans = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loans: Loan[] = await loanService.getAllLoans();

        res.status(HTTP_STATUS.OK).json(
            successResponse(loans, "Loans Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Create a new loan.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newLoan: Loan = await loanService.createLoan(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newLoan, "Loan Created")
        );
    } catch (error) {
        next(error);
    }
};

export const reviewLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedLoan: Loan = await loanService.updateLoan(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedLoan, "Loan Updated")
        );
    } catch (error) {
        next(error);
    }
};

export const approveLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedLoan: Loan = await loanService.updateLoan(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedLoan, "Loan Updated")
        );
    } catch (error) {
        next(error);
    }
};