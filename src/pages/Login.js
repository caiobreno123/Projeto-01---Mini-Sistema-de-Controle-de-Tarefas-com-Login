import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [cpf, setCpf] = useState('');

  function limparCPF(valor) {
    return valor.replace(/\D/g, '');
  }

  function entrar() {
    const cpfValido = '12345678900';

    if (limparCPF(cpf) === cpfValido) {
      onLogin();
    } else {
      alert('CPF inválido');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Login com CPF</Text>

      <TextInput
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title="Entrar" onPress={entrar} />
    </View>
  );
}
