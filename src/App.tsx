import './App.css'
import Calc from './components/Calc';
import TipCalculator from './components/TIpCalculator';
import FormValidation from './components/FormValidation';
import Todo from './components/Todo';
import ExpenseTracker from './components/ExpenseTracker';


function App() {

 

  return (
    <>
      {/**Todo App */}
      <Todo/>

      {/** the Calculator mini app */}
      <Calc />

      {/**my tip calculator */}
      <TipCalculator />

      {/**form validation */}
      <FormValidation />

      {/**Expense tracker */}
      <ExpenseTracker />
    </>
  )
}

export default App
