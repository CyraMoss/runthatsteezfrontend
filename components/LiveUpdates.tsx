// src/components/LiveUpdates.tsx
import { useEffect, useState } from 'react';

type LiveData = {
  message: string;
};

const LiveUpdates = () => {
  const [data, setData] = useState<LiveData | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      const message: LiveData = JSON.parse(event.data);
      setData(message);
    };

    ws.onclose = () => console.log('WebSocket connection closed');

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Live Updates</h1>
      <p>{data ? data.message : 'No updates yet'}</p>
    </div>
  );
};

export default LiveUpdates;
