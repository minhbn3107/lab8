import {
    View,
    Text,
    TextInput,
    Image,
    Pressable,
    StyleSheet,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodoItem, addNewTodos } from "../todosSlice";

export default function AddTodo({ route, navigation }) {
    const dispatch = useDispatch();
    let { todoItem } = route.params;
    const [text, onChangeText] = useState(todoItem ? todoItem.title : "");
    const [state, setState] = useState("finish ➡");

    const editItem = async () => {
        if (todoItem) {
            const updatedTodo = {
                ...todoItem,
                title: text,
            };

            dispatch(editTodoItem(updatedTodo)).unwrap();

            setState("Updating ...");
        } else {
            dispatch(addNewTodos({ title: text, completed: false })).unwrap();

            setState("Creating ...");
        }
        setTimeout(() => navigation.navigate("TodoList"), 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ADD YOUR JOB</Text>
            <View style={styles.inputContainer}>
                <Image
                    source={require("../assets/sheetIcon.png")}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder="input your job"
                />
            </View>
            <Pressable style={styles.button} onPress={editItem}>
                <Text style={styles.buttonText}>{state}</Text>
            </Pressable>
            <Image
                source={require("../assets/note.png")}
                style={styles.noteImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "100%",
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#00BCD4",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    noteImage: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginTop: 30,
    },
});
