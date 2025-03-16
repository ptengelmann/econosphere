import React, { useEffect, useState } from 'react';

const TestData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Test Data from Backend</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default TestData;
