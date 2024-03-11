import './App.css'
import Header from '../Header/Header.jsx'
import HomePage from './homepage.jsx';


function App() {

  return (
    <div>
        <Header />
        <div className="homepage-app">
            <HomePage />
        </div>
    </div>
  )
}

export default App

