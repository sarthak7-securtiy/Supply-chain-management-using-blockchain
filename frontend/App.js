import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [product, setProduct] = useState('');
  const [batchId, setBatchId] = useState('');
  const [batch, setBatch] = useState(null);

  const createBatch = async () => {
    await axios.post('http://localhost:4000/createBatch', { product });
    alert('Batch created!');
  };

  const getBatch = async () => {
    const res = await axios.get(`http://localhost:4000/getBatch/${batchId}`);
    setBatch(res.data);
  };

  return (
    <div>
      <h1>Supply Chain DApp</h1>
      <div>
        <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Product Name" />
        <button onClick={createBatch}>Create Batch</button>
      </div>
      <div>
        <input value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Batch ID" />
        <button onClick={getBatch}>Get Batch</button>
        {batch && (
          <div>
            <p>ID: {batch.id}</p>
            <p>Product: {batch.product}</p>
            <p>Owner: {batch.owner}</p>
            <p>State: {batch.state}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
