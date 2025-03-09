import express, { Router } from "express";
import * as loanController from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import { loanSchema, deleteLoanSchema } from "../validation/loanValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Create a new loan request.
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    validateRequest(loanSchema),
    loanController.createLoan
);

export default router