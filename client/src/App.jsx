import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './routers/MainRouter'

/*
=========================================================
* Group Name: ExpressCrew
* Project Name: Farmer's Market [FARM]
=========================================================
*/
function App() {

  return (
      <Router>
        <MainRouter/>
      </Router>
  )
}

export default App
