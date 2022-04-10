import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './Components/navbar/navbar'
import Home from "./Pages/Home";
import About from "./Pages/About";
import NoteState from "./Context/Notes/NoteState";
import UserState from "./Context/Auth/UserState";
import SignIn from "./Pages/SignIn";


function App() {
  return (
    <>
    <NoteState>
    <UserState>
    <Router>
      <Navbar/>
      <div style={{ minHeight: "70px"}}></div>
      <Switch>
        <Route exact path="/" >
          <Home/>
        </Route>
        <Route exact path="/about" >
          <About/>
        </Route>
        <Route exact path="/signin" >
          <SignIn/>
        </Route>
      </Switch>
      {/* <iframe title="doc" src="https://docs.google.com/document/d/e/2PACX-1vT-Ckj_mSm_fXrThLiSn8Rg5XPTcregZai3Wqe0Cl9veB62sscO-H-_0P8HY0OzxJFcVTbVrFbOI_45/pub?embedded=true" style={{height: '500px', width: '1000px', border: '0px solid'}} ></iframe> */}
    </Router>
    </UserState>
    </NoteState>
    </>
  );
}

export default App;
