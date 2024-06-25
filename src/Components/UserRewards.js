import { useState, useEffect } from "react";
import React from "react";
import "./user-rewards.css";
import { getTransactions } from "../Services/apiService";

const UserRewards = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setApiData(calculateRewardsPerCustomer(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePointsPerMonth = (purchaseAmount) => {
    // Define the points calculation logic
    if (purchaseAmount <= 50) return 0;
    if (purchaseAmount <= 100) return purchaseAmount - 50;
    return (purchaseAmount - 100) * 2 + 50;
  };
  const calculateRewardsPerCustomer = (result) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const getMonthYearKey = (month, year) => `${year}-${month}`;

    // Determine the last three months
    const lastThreeMonths = [];
    for (let i = 0; i < 3; i++) {
      const month = currentMonth - i;
      const year = currentYear - Math.floor((12 + month) / 12) + 1;
      const adjustedMonth = (12 + month) % 12;
      lastThreeMonths.push(getMonthYearKey(adjustedMonth, year));
    }

    return result.map((itm) => {
      let totalRewards = 0;
      let rewardsInFirstMonth = 0;
      let rewardsInSecondMonth = 0;
      let rewardsInThirdMonth = 0;

      // Loop through the transaction array per customer
      itm.transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.dateOfTransaction);
        const transactionMonthYear = getMonthYearKey(
          transactionDate.getMonth(),
          transactionDate.getFullYear()
        );

        // Calculate rewards for transactions in the last three months
        switch (transactionMonthYear) {
          case lastThreeMonths[0]:
            rewardsInFirstMonth += calculatePointsPerMonth(
              transaction.purchaseAmount
            );
            break;
          case lastThreeMonths[1]:
            rewardsInSecondMonth += calculatePointsPerMonth(
              transaction.purchaseAmount
            );
            break;
          case lastThreeMonths[2]:
            rewardsInThirdMonth += calculatePointsPerMonth(
              transaction.purchaseAmount
            );
            break;
          default:
            break;
        }
      });

      // Calculate total rewards per customer
      totalRewards =
        rewardsInFirstMonth + rewardsInSecondMonth + rewardsInThirdMonth;

      return {
        customerName: itm.customerName,
        totalRewards,
        rewardsInFirstMonth,
        rewardsInSecondMonth,
        rewardsInThirdMonth,
      };
    });
  };

  return (
    <div className="UserRewards">
      {apiData.length > 0 && !loading ? (
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Rewards</th>
              <th>Rewards In 1st Month</th>
              <th>Rewards In 2nd Month</th>
              <th>Rewards In 3rd Month</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((itm, idx) => (
              <tr key={idx} data-testid={`user-reward-${idx}`}>
                <td>{itm.customerName}</td>
                <td>{itm.totalRewards} points</td>
                <td>{itm.rewardsInFirstMonth} points</td>
                <td>{itm.rewardsInSecondMonth} points</td>
                <td>{itm.rewardsInThirdMonth} points</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>...Loading</p>
      )}
    </div>
  );
};

export default UserRewards;
