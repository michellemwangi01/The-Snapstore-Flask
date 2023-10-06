import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDeleteDialog from './Confirmdelet';

function Transactions({searchterm}) {
  console.log(searchterm);
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


 
  useEffect(() => {
    fetch("http://127.0.0.1:5555/snapstore/transactions")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
//   const filteredTransactions = transactions.filter((item) =>
//   typeof item.user_id=== 'string' && item.user_id.toLowerCase().includes(searchterm.toLowerCase())
// );

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
  

// console.log("filteredTransactions ",filteredTransactions);

  return (
    <div className="tablediv">
      <table id="transaction">
        <tbody>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Purchasetime</th>
            <th>User_id</th>
            <th></th>
          </tr>

  {transactions.map((item, index) => (
    <tr key={item.id}>
      <td>
      <img src= 'https://img.freepik.com/free-photo/camera-equipment-capturing-single-macro-object-generative-ai_188544-12096.jpg?w=740&t=st=1696576966~exp=1696577566~hmac=1e61322ac56a7e5c6db888c31502041896ada66bcfeb093ad1fafca8c3fb19f2' 
      alt={item.name} 
      width="50" 
      height="50" 
      style={{ borderRadius: "50%" }}
      />
      </td>
      <td>{index + 1}</td>
      <td>{item.quantity}</td>
      <td> KSH {item.amount}</td>
      <td>{item.purchased_at}</td>
      <td>{item.user_id}</td>
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