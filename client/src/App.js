import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/">
            <div>hello username</div>
          </Route>

          <Route exact path = "/login">
            <div>login</div>
          </Route>
        </Switch>
      
        
      </Router>  



    </div>
  );
}

export default App;
