import express, { Router } from "express";
import * as loanController from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import { loanSchema, deleteLoanSchema } from "../validation/loanValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";