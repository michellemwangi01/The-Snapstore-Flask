import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDeleteDialog from './Confirmdelet';

function Transactions({ jwToken }) {
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [jwToken]);

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
      await fetch(`http://127.0.0.1:5555/snapstore/transactions/${selectedItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwToken.access_token}`,
        },
      });

      // Update the local state by removing the deleted resource
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== selectedItemId)
      );

      // Close the confirmation dialog
      setIsDialogOpen(false);
      setSelectedItemId(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

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
            <th>PhotoName</th>
            <th>Username</th>
            <th></th>
          </tr>
          {transactions.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.quantity}</td>
              <td>KSH {item.amount}</td>
              <td>{item.photo.name}</td>
              <td>{item.user.username}</td>
              <td>
                <FontAwesomeIcon
                  color='red'
                  id='myicon'
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
