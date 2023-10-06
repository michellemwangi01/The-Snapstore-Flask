import React, { useState, useEffect } from "react";

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
            <th>Id</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Photoid</th>
            <th>Userid</th>
            <th></th>
          </tr>

          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.quantity}</td>
              <td>{item.amount}</td>
              <td>{item.purchased_at}</td>
              <td>{item.user.username}</td>

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
