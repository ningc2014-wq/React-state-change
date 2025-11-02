// src/components/Counter.tsx のコードを以下に書き換える

import React from 'react';

// Propsの型を更新：count（値）とonUpdate（更新関数）を受け取る
interface CounterProps {
  title: string;
  count: number; // 現在の値を親から受け取る
  onUpdate: (value: number) => void; // 値を更新するための関数を親から受け取る
}

// コンポーネントを定義。ここでは State を使わない（値を保持しない）
const Counter: React.FC<CounterProps> = ({ title, count, onUpdate }) => {
  
  // onUpdate関数を使って、親のStateを間接的に更新する
  const handleIncrement = () => {
    onUpdate(count + 1);
  };
  
  const handleDecrement = () => {
    onUpdate(count - 1);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h2>{title}</h2>
      
      {/* 親から受け取った count の値を表示 */}
      <p>現在の値: {count}</p> 
      
      <button onClick={handleIncrement}>
        + 1 (親のStateを更新)
      </button>
      
      <button onClick={handleDecrement} style={{ marginLeft: '10px' }}>
        - 1 (親のStateを更新)
      </button>
    </div>
  );
};

export default Counter;