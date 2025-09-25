import React from 'react';
import { useTotalWithdrawn } from '../hooks/useBnbCapital';

function TotalWithdrawnDisplay() {
  const { data: totalWithdrawn, isLoading, error } = useTotalWithdrawn();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Total Withdrawn</h2>
      <p>{totalWithdrawn ? totalWithdrawn.toString() : '0'} ETH</p>
    </div>
  );
}

export default TotalWithdrawnDisplay;
