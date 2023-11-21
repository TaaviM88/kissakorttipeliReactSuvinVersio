import './App.css'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Koti';
function App() {


  return (
    <>
    <Router>
    
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

        </ul>
      </nav>
    </div>
    
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>

    </Routes>
    
    

  </Router>
    </>
  )
}

export default App
