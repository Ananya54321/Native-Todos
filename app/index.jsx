import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { data } from "@/data/todos";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      const newid = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newid, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    input: {
      flex: 1,
      marginRight: 10,
      fontSize: 18,
    },
    addButton: {
      backgroundColor: "green",
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    todoContainer: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: "#f9f9f9",
      borderRadius: 5,
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    todoText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    todoDescription: {
      fontSize: 14,
      color: "gray",
    },
    toggleText: {
      color: "blue",
      marginTop: 5,
    },
    removeText: {
      color: "red",
      marginTop: 5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new Todo"
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            <Pressable onPress={() => toggleTodo(item.id)}>
              <Text style={styles.toggleText}>
                {item.completed ? "Completed" : "Not Completed"}
              </Text>
            </Pressable>
            <Pressable onPress={() => removeTodo(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
