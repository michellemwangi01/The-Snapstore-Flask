import React, { useState, useEffect } from "react";
import "../styles/mystyles.css";

function Transactions({ jwToken }) {
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    console.log(jwToken);
    fetch("http://127.0.0.1:5555/snapstore/transactions", {
      headers: {
        Authorization: `Bearer ${jwToken.access_token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTransaction(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <div className="tablediv">
      <table id="transaction">
        <tbody>
          <tr>
            <th>#</th>
            <th>Purchased By</th>
            <th>Name of Item</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Date of purchase</th>
            <th></th>
          </tr>

          {transactions.map((item) => (
            <tr className="" key={item.id}>
              <td className="historyRow">{item.id}</td>

              <td className="historyRow">{item.user.username}</td>
              <td className="historyRow">{item.photo.name}</td>

              <td className="historyRow">{item.quantity}</td>
              <td className="historyRow">{item.amount}</td>
              <td className="historyRow">{item.purchased_at}</td>

              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
