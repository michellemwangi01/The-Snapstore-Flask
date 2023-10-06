import React, { useState } from 'react';
import Navbar from './Navbar';
import Transactions from './Transactions';

function TransactionPage() {
  const [searchterm, setSearchterm] = useState('');

  return (
    <div>
      <Navbar setSearchterm={setSearchterm} />
      <Transactions searchterm={searchterm} />
    </div>
  );
}

export default TransactionPage;