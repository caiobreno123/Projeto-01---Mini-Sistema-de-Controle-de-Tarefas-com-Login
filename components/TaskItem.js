import { View, Text, Button } from 'react-native';

export default function TaskItem({ tarefa, onDelete, onToggle }) {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          textDecorationLine: tarefa.concluida ? 'line-through' : 'none',
        }}
      >
        {tarefa.texto}
      </Text>

      <Button title="Concluir" onPress={() => onToggle(tarefa.id)} />
      <Button title="Excluir" onPress={() => onDelete(tarefa.id)} />
    </View>
  );
}
