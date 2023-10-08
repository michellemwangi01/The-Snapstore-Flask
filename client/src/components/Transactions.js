import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteDialog from "./Confirmdelet";

function Transactions({ jwToken }) {
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetch(
      "https://the-snapstore-flask-api.onrender.com/snapstore/transactions",
      {
        headers: {
          Authorization: `Bearer ${jwToken}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleDelete = async (transactionId) => {
    // Open the confirmation dialog and store the selected item ID
    setIsDialogOpen(true);
    setSelectedItemId(transactionId);
  };

  const handleCancel = () => {
    // Close the confirmation dialog
    setIsDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirm = async () => {
    try {
      // Send a DELETE request to the API to delete the resource
      await fetch(`http://127.0.0.1:5555/api/transactions/${selectedItemId}`, {
        method: "DELETE",
      });
      // Update the local state by removing the deleted resource
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== selectedItemId
        )
      );

      // Close the confirmation dialog
      setIsDialogOpen(false);
      setSelectedItemId(null);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  return (
    <div className="tablediv">
      <table
        id="transaction"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0px 10px",
          borderRadius: "15px",
          margin: "2rem",
        }}
      >
        <tbody>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>PhotoName</th>
            <th>Purchased By</th>
            <th>Price</th>
            <th>Date of Purchase</th>
            <th></th>
          </tr>

          {transactions.map((item, index) => (
            <tr key={item.id}>
              <td style={{ marginBottom: "10px" }}>{index + 1}</td>
              <td>
                <img
                  src={item.photo.image}
                  alt="Item Photo"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{item.photo.name}</td>
              <td>{toTitleCase(item.user.username)}</td>
              <td>
                $
                {item.photo.price.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>{item.purchased_at}</td>

              <td>
                <FontAwesomeIcon
                  color="red"
                  id="myicon"
                  icon={faTrash}
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDeleteDialog
        isOpen={isDialogOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
export default Transactions;
