import "./App.css";
import { Alert } from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";

const uuid = require("uuid");
const intialExpenses = [
  { id: uuid.v4(), charge: "rent", amount: 1600 },
  { id: uuid.v4(), charge: "car payment", amount: 400 },
  { id: uuid.v4(), charge: "credit card bill", amount: 600 },
];

function App() {
  //** State Values **//
  //All expenses, add expense
  const [expenses, setExpenses] = useState(intialExpenses);
  //single expense//
  const [charge, setCharge] = useState("");
  //single amount//
  const [amount, setAmount] = useState("");
  //Alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // ** Functionality **//

  const handleCharge = (e) => {
    // console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    // console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item Edited Successfully " });
      } else {
        const singleExpense = { id: uuid.v4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item Added Successfully " });
      }
      setCharge("");
      setAmount("");
    } else {
      //handle Alert Called
      handleAlert({
        type: "danger",
        text: `Charge can't be empty value and amount should be greater than 0 `,
      });
    }
  };
  //clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items Deleted" });
  };
  //handle delete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    // console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "One Item Deleted" });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total Spending :
        <span className="total">
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
