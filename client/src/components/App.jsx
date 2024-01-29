import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Navigation from "./Navigation"
import Authentication from "./Authentication"
import RaceInfo from './RaceInfo';
import Results from './Results';
import Photos from './Photos';
import Volunteer from './Volunteer';
import Shop from './Shop';
import RefundPolicy from './RefundPolicy';
import Directions from './Directions';


export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser()
  }, [])
  
  const fetchUser = () => {
    fetch('/authorized')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUser(data)
        })
      } else {
        setUser(null)
      }
    })
  }

  const updateUser = (user) => setUser(user)
  if (!user) return (
    <>
      <Navigation />
      <Authentication udpateUser = {updateUser}/>
    </>
  )
  return (
    <>
    <Navigation onUpdateUser={updateUser} />
    <Router>
      <div>
        <UserContext.Provider value={[user, setUser]}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/register">
            <RaceInfo />
          </Route>
          <Route exact path="/race-info">
            <RaceInfo />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/photos">
            <Photos />
          </Route>
          <Route exact path="/volunteer">
            <Volunteer />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/refund-policy">
            <RefundPolicy />
          </Route>
          <Route exact path="/directions">
            <Directions />
          </Route>
        </Switch>
        </UserContext.Provider>
      </div>
    </Router>
    </>
  );
}
export default App;
