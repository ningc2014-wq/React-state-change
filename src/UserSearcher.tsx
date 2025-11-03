import React, { useState, useEffect } from 'react';

// ユーザーデータの型を定義（genderプロパティを追加）
interface User {
  id: number;
  name: string;
  email: string;
  gender?: 'Male' | 'Female'; // MaleまたはFemale、あるいは未定義（APIから取得しないため）
}

const UserSearcher: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // ★追加: 性別フィルター用のState
  const [genderFilter, setGenderFilter] = useState<'' | 'Male' | 'Female'>(''); // 全て、男性、女性

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // データ取得（非同期通信）
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await response.json();
        
        // ★追加: 取得した各ユーザーにランダムで性別を付与
        const usersWithGender = data.map(user => ({
          ...user,
          gender: Math.random() > 0.5 ? 'Male' : 'Female' // 50%の確率で男性か女性を割り当てる
        }));
        setUsers(usersWithGender); // 性別付きのデータをStateに格納

      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 検索キーワードと性別フィルターに基づいてリストをフィルタリング
  const filteredUsers = users.filter(user => {
    // 名前とEmailでの検索条件
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // ★追加: 性別での検索条件
    const matchesGender = genderFilter === '' || user.gender === genderFilter;

    return matchesSearchTerm && matchesGender; // 両方の条件を満たすユーザーを返す
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>ユーザー検索デモ (性別フィルター付き)</h1>
      
      {/* 検索入力フォーム */}
      <input
        type="text"
        placeholder="名前またはEmailで検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', fontSize: '16px' }}
      />

      {/* ★追加: 性別フィルター用ドロップダウン */}
      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value as '' | 'Male' | 'Female')}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px' }}
      >
        <option value="">全ての性別</option>
        <option value="Male">男性</option>
        <option value="Female">女性</option>
      </select>

      {/* ローディング状態の表示 */}
      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#007bff' }}>データを読み込み中...</p>
      ) : (
        <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '400px', overflowY: 'auto' }}>
          {filteredUsers.length === 0 && !isLoading ? (
            <p style={{ textAlign: 'center', color: '#ff4d4f' }}>該当するユーザーが見つかりませんでした。</p>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} style={{ borderBottom: '1px dotted #eee', padding: '10px' }}>
                <p><strong>名前:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>性別:</strong> {user.gender || '不明'}</p> {/* 性別を表示、なければ「不明」 */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearcher;