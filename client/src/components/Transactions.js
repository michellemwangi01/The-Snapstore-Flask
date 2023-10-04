
import React , {useState , useEffect} from 'react';

function Transactions() {

  const [transactions , setTransaction] = useState([])

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/api/transactions")
    .then((resp) => resp.json())
    .then((data)=>{
    console.log(data);
      setTransaction(data)
    })
  } , [])

  return (
    <div className="tablediv">
      <table id="transaction">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Photoid</th>
            <th> Userid</th>
               <th></th>
          </tr>
        
          {transactions.map((item) => (
            
            <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.quantity}</td>
            <td>{item.amount}</td>
            <td>{item.photo.id}</td>
            <td>{item.user.id}</td>

            <td>
              
            <button> Delete </button>  
          
             </td>
          </tr>
   
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
