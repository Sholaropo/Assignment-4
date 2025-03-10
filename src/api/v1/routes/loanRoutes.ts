import express, { Router } from "express";
import * as loanController from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import { loanSchema } from "../validation/loanValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all loans.
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["officer", "manager"] }),
  loanController.getAllLoans
);

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

/**
 * @route PUT /:id
 * @description review an existing loan.
 */
router.put(
  "/:id/review",
  authenticate,
  isAuthorized({ hasRole: ["officer"] }),
  validateRequest(loanSchema),
  loanController.reviewLoan
);

/**
 * @route PUT /:id
 * @description approve an existing loan.
 */
router.put(
  "/:id/approve",
  authenticate,
  isAuthorized({ hasRole: ["manager"] }),
  validateRequest(loanSchema),
  loanController.approveLoan
);

export default router;
