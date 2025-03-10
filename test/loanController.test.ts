jest.mock("../src/api/v1/services/loanService", () => ({
  getAllLoans: jest.fn(),
  createLoan: jest.fn(),
  reviewLoan: jest.fn(),
  approveLoan: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as loanController from "../src/api/v1/controllers/loanController";
import * as loanService from "../src/api/v1/services/loanService";

jest.mock("../src/api/v1/services/loanService");

describe("Loan Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("getAllLoans", () => {
    it("should handle successful operation", async () => {
      const mockLoans = [
        {
          id: "1",
          amount: "1000",
          description: "Medical Loan",
          approved: false,
          reviewed: false,
        },
      ];

      (loanService.getAllLoans as jest.Mock).mockResolvedValue(mockLoans);

      await loanController.getAllLoans(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Loans Retrieved",
        data: mockLoans,
        status: "success",
      });
    });
  });

  describe("createLoan", () => {
  it("should handle successful loan creation", async () => {
    const loanData = {
        "amount": "1000",
        "description": "Medical Loan",
        "approved": false,
        "reviewed": false
    };
    
    const createdLoan = {
      id: "2",
      "amount": "1000",
      "description": "Medical Loan",
      "approved": false,
      "reviewed": false
    };

    mockReq.body = loanData;
    (loanService.createLoan as jest.Mock).mockResolvedValue(createdLoan);

    await loanController.createLoan(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(loanService.createLoan).toHaveBeenCalledWith(loanData);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Loan Created",
      data: createdLoan,
      status: "success",
    });
  });
});
});
