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
  const [expenses, setExpenses] = useState(intialExpenses);

  return (
    <>
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending :
        <span className="total">
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
