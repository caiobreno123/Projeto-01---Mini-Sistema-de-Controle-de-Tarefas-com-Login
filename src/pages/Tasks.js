import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';
import TaskItem from '../../components/TaskItem';

export default function Tasks({ onLogout }) {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState([]);

  function adicionar() {
    if (!texto) return;

    const nova = {
      id: Date.now().toString(),
      texto,
      concluida: false,
    };

    setTarefas([...tarefas, nova]);
    setTexto('');
  }

  function remover(id) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  function toggle(id) {
    setTarefas(
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  const concluidas = tarefas.filter(t => t.concluida).length;

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text>Tarefas concluídas: {concluidas}</Text>

      <TextInput
        placeholder="Nova tarefa"
        value={texto}
        onChangeText={setTexto}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title="Adicionar" onPress={adicionar} />

      {tarefas.length === 0 && <Text>Nenhuma tarefa</Text>}

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            tarefa={item}
            onDelete={remover}
            onToggle={toggle}
          />
        )}
      />

      <Button title="Sair" onPress={onLogout} />
    </View>
  );
}
