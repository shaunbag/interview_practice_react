import './App.css'
import Calc from './components/Calc';
import TipCalculator from './components/TIpCalculator';
import FormValidation from './components/FormValidation';
import Todo from './components/Todo';
import ExpenseTracker from './components/ExpenseTracker';
import Weather from './components/Weather';


function App() {

 

  return (
    <>
      {/**Todo App */}
      <Todo/>
      <hr/>
      {/** the Calculator mini app */}
      <Calc />
      <hr/>

      {/**my tip calculator */}
      <TipCalculator />
      <hr/>

      {/**form validation */}
      <FormValidation />
      <hr/>

      {/**Expense tracker */}
      <ExpenseTracker />
      <hr/>

      <Weather />
    </>
  )
}

export default App
