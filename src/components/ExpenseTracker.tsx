import { useState } from "react"

// define a type for the Expense object
type Expense = {
    item: string;
    cost: number;
    id: number;
    cleared: boolean;
}

export default function ExpenseTracker() {

    // monitor budget here
    const [budget, setBudget] = useState<number>(0)
    const [itemInput, setItemInput] = useState<string>("")
    const [costInput, setCostInput] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([])
    // create a variable that checks the remaining budget, once, then we can use this everywhere else
    const remainingBudget = checkInBudget()
    // add expenses in a seprated function
    function addExpense() {
        if (itemInput?.length === 0 || itemInput === null) return
        if (costInput === null) return

        setExpenses([...expenses, { id: Date.now(), item: itemInput, cost: costInput, cleared: false }])
        setCostInput(0)
        setItemInput("")
    }

    // clear and expenses on click 
    function clearExpense(id: number) {
        setExpenses(expenses =>
            expenses.map(expense =>
                expense.id === id ? { ...expense, cleared: true } : expense
            )
        )
    }

    // check in budget function 
    function checkInBudget(): number{
        return expenses
                .filter(e => e.cleared) // get cleared items
                .reduce((total, e) => total - e.cost, budget) // take the original total = budget and subtract each expense thats cleared by cost
    }

    return (
        <>
            <h1>Expense Tracker</h1>
            <label>Budget:</label>
            <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
            <p>Budget After Expenses Cleared: £{remainingBudget}</p>
            <h2>Add Expenses</h2>

            <label>Name:</label>
            <input type="text" value={itemInput} onChange={(e) => setItemInput(e.target.value)} />

            <label>Cost:</label>
            <input type="number" value={costInput} onChange={(e) => setCostInput(Number(e.target.value))} />
            <button onClick={addExpense}>Add Expense</button>

            <h2>Expenses</h2>
            <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                {
                    expenses.map(expense => {
                        return <li
                            key={expense.id}
                            style={{ textDecoration: expense.cleared ? "line-through" : "none", margin: 10, width: '100%' }}
                        >{expense.item} : £{expense.cost} : in Budget? {expense.cost > remainingBudget ? "No" : "Yes"}
                            <button
                                disabled={expense.cost > remainingBudget}
                                style={{ float: "right" }}
                                onClick={() => clearExpense(expense.id)}>Clear Expense</button></li>
                    })
                }
            </ul>
        </>
    )
}