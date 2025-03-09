import { Request, Response, NextFunction } from "express";
import * as itemService from "../services/loanService";
import type { Loan } from "../models/loanModel";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";