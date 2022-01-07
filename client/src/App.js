import './App.css';
import Nav from './components/Nav';
import HomeScreen from "./Screens/HomeScreen"
import LoginScreen from "./Screens/LoginScreen"
import RegisterScreen from "./Screens/RegisterScreen"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "./actions/registerActions"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  const dispatch = useDispatch();
  const getUserState = useSelector(state => state.userLogin)

  const { userkeys } = getUserState

  let accessToken;
  if (userkeys) {
    accessToken = userkeys.access_token
  }
  useEffect(() => {

    if (accessToken) {
      dispatch(getUserDetails(accessToken))

    }
  }, [userkeys, accessToken, dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/" exact>
            <Nav />
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
