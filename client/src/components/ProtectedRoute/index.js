import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import axios from "axios";
import LoginPage from "../../pages/LoginPage";

 function PrivateRoute({ children, ...rest }) {
  const [state, setState] = useState({isAuthenticated:false});

    useEffect(() => {
      const fetchdata =async ()=>{
       const res = await axios.get("/api/auth/isUserLoggedIn");
        if(res.data.loggedIn){
          // console.log("trying ot set state to true!");
          setState({isAuthenticated:true});
        }
      }
      fetchdata();
    }, [])
    // console.log("the state is: "+ state.isAuthenticated);
    if(state.isAuthenticated){
       return (
        <Route {...rest} render={() => children }/>
       ) 
    }
    else{
      return (<LoginPage  />)
    }
}

export default PrivateRoute;
