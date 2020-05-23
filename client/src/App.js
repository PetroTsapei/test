import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./views/examples/Login";
import Profile from "./views/examples/Profile";
import Register from "./views/examples/Register";

import { UserContext } from './contexts/userContext';

function App() {
  const [user, setUser] = useState({
    loggedIn: localStorage.getItem('loggedIn')
  });

  const logout = () => setUser({});

  const renderRoutes = () => {
    if (user.loggedIn) {
      return (
        <>
          <Route
            path="/"
            exact
            render={props => <Profile {...props} />}
          />
          <Redirect to="/" />
        </>
      )
    }

    return (
      <>
        <Route path="/" exact render={Login} />
        <Route
          path="/register-page"
          exact
          render={props => <Register {...props} />}
        />
        <Redirect to="/" />
      </>
    )
  };

  const value = {
    user,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Switch>
          { renderRoutes() }
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
