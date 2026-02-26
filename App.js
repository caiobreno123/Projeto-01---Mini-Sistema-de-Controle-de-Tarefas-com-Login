import { View } from 'react-native';
import { useState } from 'react';
import Login from './src/pages/Login';
import Tasks from './src/pages/Tasks';

export default function App() {
  const [logado, setLogado] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {!logado ? (
        <Login onLogin={() => setLogado(true)} />
      ) : (
        <Tasks onLogout={() => setLogado(false)} />
      )}
    </View>
  );
}
