import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PosLogin from './pos/Pos-login';
import PosRegisterDetails from './pos/pos-create-account';
import PosTermsAndConditions from './pos/pos-term-and-conditions';
import PosHome from './pos/posHome';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PosLogin}/>
        <Route path ="/register-pos-details" component={PosRegisterDetails}/>
        <Route path="/pos-terms-and-conditions" component={PosTermsAndConditions}/>
        <Route path="/home" component={PosHome}/>
        <Route path='*' component={PosHome}/>
      </Switch>
    </Router>
  );
}

export default App;
