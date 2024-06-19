import { useState, useEffect } from "react";
import "./user-rewards.css";
import axios from "axios";

const UserRewards = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
        axios.get("http://localhost:4000/transactionData").then((res)=>{
                setApiData(calculateRewardsPerCustomer(res.data));
                setLoading(false);
        }).catch((err)=>console.log(err))
    };
    fetchApi();
  }, []);

  //
  const calculatePointsPerMonth = (amount) => {
    let totalPoints = 0;
    if (amount > 100) {
      totalPoints =
      totalPoints +
        ((amount - 100) * 2 + 1 * 50);
    }
    if (
      amount > 50 &&
      amount < 100
    ) {
      totalPoints = totalPoints + (amount - 50);
    }
    
    return totalPoints
  }

  //This function takes api results array and  calculates rewards per customer and returns an array of objects containing total rewards and rewards per month.
  const calculateRewardsPerCustomer = (result) => {
    return result.map((itm) => {
      let totalRewards = 0;
      let rewardsInJanuary = 0;
      let rewardsInFebruary = 0;
      let rewardsInMarch = 0;

      //This loops through transaction array per customer
      itm.transactions.forEach((transaction) => {
        switch (true) {
          //Calculates January rewards
          case new Date(transaction.dateOfTransaction).getMonth() === 0:
            rewardsInJanuary =  rewardsInJanuary + calculatePointsPerMonth(transaction.purchaseAmount)

            break;
          //Calculates February rewards
          case new Date(transaction.dateOfTransaction).getMonth() === 1:
            rewardsInFebruary =  rewardsInFebruary + calculatePointsPerMonth(transaction.purchaseAmount)
            break;
          // Calculates March rewards
          case new Date(transaction.dateOfTransaction).getMonth() === 2:
            rewardsInMarch =  rewardsInMarch + calculatePointsPerMonth(transaction.purchaseAmount)

            break;
          default:
            break;
        }
      });
      //Calculates total rewards per customer
      totalRewards = rewardsInJanuary + rewardsInFebruary + rewardsInMarch;

      return {
        customerName: itm.customerName,
        totalRewards,
        rewardsInJanuary,
        rewardsInFebruary,
        rewardsInMarch,
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
              <th>Rewards In January</th>
              <th>Rewards In February</th>
              <th>Rewards In March</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((itm, idx) => (
              <tr key={idx} data-testid={`user-reward-${idx}`}>
                <td>{itm.customerName}</td>
                <td>{itm.totalRewards} points</td>
                <td>{itm.rewardsInJanuary} points</td>
                <td>{itm.rewardsInFebruary} points</td>
                <td>{itm.rewardsInMarch} points</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>...Loading</p>}
    </div>
  );
};

export default UserRewards;