import React, { useState, useEffect } from 'react';

// APIから取得するユーザーデータの型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

const UserFetcher: React.FC = () => {
  // ユーザーリストを管理する状態 (State)
  // 初期値は空の配列 []
  const [users, setUsers] = useState<User[]>([]);
  
  // ローディング状態を管理するState
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // コンポーネントがマウント（画面に表示）されたときに一度だけ実行される関数
  useEffect(() => {
    // 外部APIにアクセスする非同期関数
    const fetchUsers = async () => {
      try {
        // ① APIへのリクエスト (fetch関数を使用)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // リクエストが成功したかチェック
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        // ② 取得したJSONデータをTypeScriptのUser型配列に変換
        const data: User[] = await response.json();
        
        // ③ 状態 (State) の更新
        setUsers(data);
        
      } catch (error) {
        console.error("APIエラー:", error);
      } finally {
        // ④ 処理が終わったらローディング状態を解除
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // 依存配列が空の [] なので、初回マウント時のみ実行

  // 画面に表示するUIの作成
  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>データ取得中...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>JSONPlaceholderから取得したユーザー一覧</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* ⑤ 取得した users 配列をループ処理 (map) で表示 */}
        {users.map((user) => (
          <li 
            key={user.id} 
            style={{ 
              border: '1px solid #ddd', 
              background: '#dfdfdf',
              padding: '10px', 
              marginBottom: '10px',
              borderRadius: '4px'
            }}
          >
            <strong>ID: {user.id}</strong> / 名前: {user.name} / Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFetcher;