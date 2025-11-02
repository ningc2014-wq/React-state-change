import React from 'react';
import GreetingChanger from './GreetingChanger'; // ★インポート★

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React State の基本</h1>
      <GreetingChanger /> {/* ★コンポーネントを表示★ */}
    </div>
  );
};

export default App;