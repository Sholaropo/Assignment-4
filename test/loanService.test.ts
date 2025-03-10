import { getAllLoans, createLoan } from "../src/api/v1/services/loanService";
import {
  getDocuments,
  createDocument,
} from "../src/api/v1/repositories/firestoreRepository";
import { Loan } from "../src/api/v1/models/loanModel";
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  getDocuments: jest.fn(),
  createDocument: jest.fn(),
}));
describe("Loan Service", () => {
  describe("getAllLoans", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all loans when the request is successful", async () => {
      const mockDate = new Date();
      const mockDocs: QueryDocumentSnapshot[] = [
        {
          id: "loan1",
          data: () =>
            ({
              amount: "1000",
              description: "Medical Loan",
              approved: false,
              reviewed: false,
              createdAt: mockDate,
              updatedAt: mockDate,
            } as DocumentData),
        } as QueryDocumentSnapshot,
        {
          id: "loan2",
          data: () =>
            ({
              amount: "100",
              description: "Personal Loan",
              approved: false,
              reviewed: false,
              createdAt: mockDate,
              updatedAt: mockDate,
            } as DocumentData),
        } as QueryDocumentSnapshot,
      ];

      const mockSnapshot: QuerySnapshot = {
        docs: mockDocs,
      } as QuerySnapshot;

      (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

      const result: Loan[] = await getAllLoans();

      expect(getDocuments).toHaveBeenCalledWith("loans");
      expect(getDocuments).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: "loan1",
        amount: "1000",
        description: "Medical Loan",
        approved: false,
        reviewed: false,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      expect(result[1]).toEqual({
        id: "loan2",
        amount: "100",
        description: "Personal Loan",
        approved: false,
        reviewed: false,
        createdAt: mockDate,
        updatedAt: mockDate,
      });
    });
  });
});
