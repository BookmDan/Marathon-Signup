import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => <div>Home Page</div>;
const Posts = () => <div>Posts Page</div>;
const Favorites = () => <div>Favorites Page</div>;

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <Navigation />
    <Route path="/" exact component={Home} />
    <Route path="/posts" component={Posts} />
    <Route path="/favorites" component={Favorites} />
  </Router>
);


// function App() {
//   // const [count, setCount] = useState(0)
//   const [productions, setProductions] = useState([])
//   const [productionEdit, setProductionEdit] = useState([])
//   const [user, setUser] = useState(null)
//   const history = useHistory()

//   useEffect(() => {
//     fetchProductions()
//   }, [])
  
//   const fetchProductions = () => (
//     fetch('/productions')
//       .then(res => res.json())
//     .then(setProductions)
//   )
//   const fetchUser = () => {
    
//   }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
