import React, { useState } from 'react';

// コンポーネントの定義
const GreetingChanger: React.FC = () => {
  // ① Stateの定義: [現在の値, 値を更新する関数] = useState(初期値)
  // greetingMessageは、画面に表示されるテキストです。
  const [greetingMessage, setGreetingMessage] = useState<string>("Hello, React!");

  // ② ボタンがクリックされたときに実行される関数
  const handleClick = () => {
    if (greetingMessage === "Hello, React!") {
      // 現在の値が「Hello, React!」なら、日本語に変える
      setGreetingMessage("こんにちは、React！");
    } else {
      // それ以外なら、英語に戻す
      setGreetingMessage("Hello, React!");
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      
      {/* ③ Stateの値（greetingMessage）を表示 */}
      <h2 style={{ color: '#333' }}>{greetingMessage}</h2>

      {/* ④ ボタンがクリックされたら handleClick 関数を実行 */}
      <button 
        onClick={handleClick}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        メッセージを切り替える
      </button>

      <p style={{ marginTop: '20px' }}>
        ↑ ボタンを押して、上のテキストを切り替えてみましょう。
      </p>
    </div>
  );
};

export default GreetingChanger;