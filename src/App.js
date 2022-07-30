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

  // ** Functionality **//
  const handleCharge = (e) => {
    // console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    // console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid.v4(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
    } else {
      //handle Alert Called
    }
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
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
