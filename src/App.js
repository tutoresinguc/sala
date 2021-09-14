import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import HorariosSala from './views/sala';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import AppHeader from './views/header';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/sala">
          <HorariosSala />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
