import { render, screen, act } from "@testing-library/react";
import UserRewards from "./UserRewards";
import { getTransactions } from "../Services/apiService";
import React from "react";

jest.mock("../Services/apiService");

const mockTransactions = [
  {
    customerId: 10,
    customerName: "James Brown",
    transactions: [
      {
        transactionId: 98,
        purchaseAmount: 220,
        dateOfTransaction: "06/25/2024",
      },
      {
        transactionId: 100,
        purchaseAmount: 520,
        dateOfTransaction: "05/29/2024",
      },
      {
        transactionId: 101,
        purchaseAmount: 100,
        dateOfTransaction: "04/05/2024",
      },
    ],
  },
  {
    customerId: 11,
    customerName: "Michael Phelps",
    transactions: [
      {
        transactionId: 102,
        purchaseAmount: 50,
        dateOfTransaction: "04/04/2024",
      },
      {
        transactionId: 103,
        purchaseAmount: 120,
        dateOfTransaction: "05/08/2024",
      },
    ],
  },
];

describe("UserRewards Component", () => {
  beforeEach(() => {
    getTransactions.mockResolvedValue(mockTransactions);
  });

  test("calculates rewards correctly for each month", async () => {
    await act(async () => {
      render(<UserRewards />);
    });

    expect(await screen.findByText("James Brown")).toBeInTheDocument();
    expect(await screen.findByText("Michael Phelps")).toBeInTheDocument();

    // Verify monthly rewards
    const jamesBrownRow = screen.getByText("James Brown").closest("tr");
    const michaelPhelpsRow = screen.getByText("Michael Phelps").closest("tr");

    // Ensure the correct row is found and then check its content
    expect(jamesBrownRow).toHaveTextContent("290");
    expect(michaelPhelpsRow).toHaveTextContent("0");

    // Verify total rewards
    expect(jamesBrownRow).toHaveTextContent("1230");
    expect(michaelPhelpsRow).toHaveTextContent("90");
  });
});
