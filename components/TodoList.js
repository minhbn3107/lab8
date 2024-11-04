import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectTodos,
    fetchTodos,
    editTodoItem,
    removeToDoItem,
} from "../todosSlice";
import { useFocusEffect } from "@react-navigation/native";

export default function TodoList({ navigation }) {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const [todoList, setTodoList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchTodos());
            setTodoList(todos || []);
            console.log("todos", todos);
        }, [todos])
    );

    const toggleCompleted = async (id) => {
        try {
            const todoToUpdate = todoList.find((todo) => todo.id === id);
            const updatedTodo = {
                ...todoToUpdate,
                completed: !todoToUpdate.completed,
            };

            dispatch(editTodoItem(updatedTodo)).unwrap();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const navigateToEdit = (item) => {
        navigation.navigate("AddTodo", { todoItem: item });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Image
                    style={styles.searchIcon}
                    source={require("../assets/searchIcon.png")}
                />
                <TextInput style={styles.input} placeholder="Search" />
            </View>
            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Pressable onPress={() => toggleCompleted(item.id)}>
                            <MaterialIcons
                                name={
                                    item.completed
                                        ? "check-box"
                                        : "check-box-outline-blank"
                                }
                                size={24}
                                color={item.completed ? "green" : "gray"}
                            />
                        </Pressable>
                        <Text
                            style={[
                                styles.taskText,
                                item.completed && styles.completedTask,
                            ]}
                        >
                            {item.title}
                        </Text>
                        <Pressable onPress={() => navigateToEdit(item)}>
                            <MaterialIcons name="edit" size={24} color="red" />
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                dispatch(removeToDoItem(item.id)).unwrap()
                            }
                        >
                            <MaterialIcons
                                name="delete"
                                size={24}
                                color="red"
                            />
                        </Pressable>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
            <Pressable
                style={styles.fab}
                onPress={() => navigation.navigate("AddTodo", { todoItem: "" })}
            >
                <MaterialIcons name="add" size={24} color="#fff" />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    searchIcon: {
        position: "absolute",
        left: 10,
        zIndex: 1,
    },
    input: {
        height: 40,
        width: "100%",
        paddingLeft: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    listContent: {
        paddingBottom: 100,
    },
    taskContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    completedTask: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#00BCD4",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
