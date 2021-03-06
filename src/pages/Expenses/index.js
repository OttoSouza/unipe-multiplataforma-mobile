import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ToastAndroid,
} from "react-native";
import AppBar from "../../components/AppBar";
import { GlobalContext } from "../../context/GlobalContext";
import IconM1 from "react-native-vector-icons/MaterialIcons";
import IconM2 from "react-native-vector-icons/MaterialCommunityIcons";

const Expenses = () => {
  const {
    totalExpense,
    expenses,
    addExpenses,
    deleteExpenses,
    findExpense,
    updateExpenses,
    expenseSelected,
  } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const toastError = () => {
    ToastAndroid.showWithGravity(
      "Empty name or value, please fill them",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const toastMensage = (mensage) => {
    ToastAndroid.showWithGravity(
      mensage,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  function handleSubmit() {
    if (name === "" || value === "") {
      toastError();
    } else if (!expenseSelected) {
      addExpenses(name, value);
      toastMensage("Expense Add");
      setName("");
      setValue("");
    } else {
      updateExpenses(expenseSelected.id, name, value);
      toastMensage("Expense Updated");
      setName("");
      setValue("");
    }
  }

  useEffect(() => {
    if (expenseSelected) {
      setName(expenseSelected.name);
      setValue(String(expenseSelected.value));
    } else {
      setName("");
      setValue("");
    }
  }, [expenseSelected]);

  return (
    <View style={styles.main}>
      <AppBar title="Expenses" total={totalExpense.toFixed(2)} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Expenses"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="value"
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {expenseSelected ? "Edit" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleList}>Your Expenses</Text>

      {expenses.length ? (
        <FlatList
          data={expenses}
          keyExtractor={(expenses) => String(expenses.id)}
          renderItem={({ item: expenses }) => (
            <View style={styles.expensesContainer}>
              <Text style={styles.expenseText}>{expenses.name}</Text>
              <Text style={styles.expenseText}>R$ {expenses.value}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  style={styles.iconSpace}
                  onPress={() => findExpense(expenses.id)}
                >
                  <IconM1 name="edit" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteExpenses(expenses.id);
                    toastMensage("Expense Deleted");
                  }}
                >
                  <IconM2 name="trash-can" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Empty</Text>
        </View>
      )}
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1C2E42",
  },
  form: {
    marginTop: 40,
    paddingHorizontal: 12,
  },
  input: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#618F74",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#fff" },

  expensesContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginHorizontal: 12,
    height: 50,
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 12,
  },
  titleList: {
    color: "#618F74",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: "90%",
    alignSelf: "center",
  },

  expenseText: {
    color: "#000",
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconSpace: {
    marginRight: 12,
  },
  emptyContainer: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
