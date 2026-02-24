import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

export default function App() {

  const CPF_FIXO = "12345678900";

  const [cpf, setCpf] = useState("");
  const [logado, setLogado] = useState(false);

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("baixa");
  const [filtro, setFiltro] = useState("todas");

  function fazerLogin() {
    if (cpf === CPF_FIXO) {
      setLogado(true);
    } else {
      alert("CPF inválido!");
    }
  }

  function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    const existe = tarefas.some(
      t => t.texto.toLowerCase() === novaTarefa.toLowerCase()
    );

    if (existe) {
      alert("Tarefa duplicada!");
      return;
    }

    const nova = {
      id: Date.now().toString(),
      texto: novaTarefa,
      concluida: false,
      prioridade: prioridade
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function limparConcluidas() {
    setTarefas(tarefas.filter(t => !t.concluida));
  }

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true;
  });

  const concluidas = tarefas.filter(t => t.concluida).length;

  if (!logado) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>
        <TextInput
          placeholder="Digite o CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
          style={styles.input}
        />
        <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <TextInput
        placeholder="Nova tarefa"
        value={novaTarefa}
        onChangeText={setNovaTarefa}
        style={styles.input}
      />

      <View style={styles.prioridadeContainer}>
        <Text>Prioridade:</Text>
        {["baixa", "media", "alta"].map(p => (
          <TouchableOpacity key={p} onPress={() => setPrioridade(p)}>
            <Text style={prioridade === p ? styles.selecionado : styles.normal}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </TouchableOpacity>

      <Text>Concluídas: {concluidas}</Text>

      <View style={styles.filtroContainer}>
        {["todas", "pendentes", "concluidas"].map(f => (
          <TouchableOpacity key={f} onPress={() => setFiltro(f)}>
            <Text style={filtro === f ? styles.selecionado : styles.normal}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tarefasFiltradas.length === 0 ? (
        <Text style={{ marginTop: 20 }}>
          Nenhuma tarefa encontrada.
        </Text>
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.tarefa,
              item.concluida && styles.concluida,
              { backgroundColor: corPrioridade(item.prioridade) }
            ]}>
              <Text
                style={{
                  textDecorationLine: item.concluida ? "line-through" : "none"
                }}
              >
                {item.texto}
              </Text>

              <View style={styles.botoesLinha}>
                <TouchableOpacity onPress={() => concluirTarefa(item.id)}>
                  <Text>✔</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                  <Text>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparConcluidas}>
        <Text style={styles.botaoTexto}>Limpar Concluídas</Text>
      </TouchableOpacity>
    </View>
  );
}

function corPrioridade(prioridade) {
  if (prioridade === "alta") return "#ffb3b3";
  if (prioridade === "media") return "#fff0b3";
  return "#b3ffd9";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold"
  },
  tarefa: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  concluida: {
    opacity: 0.6
  },
  botoesLinha: {
    flexDirection: "row",
    gap: 10
  },
  filtroContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10
  },
  prioridadeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  selecionado: {
    fontWeight: "bold",
    color: "blue"
  },
  normal: {
    color: "black"
  },
  botaoLimpar: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10
  }
});
