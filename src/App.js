import "./App.css";
// import react from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NewtonsCradle from "./components/pages/NewtonsCradle";
import Trajectory from "./components/pages/Trajectory";
import DoublePendulum from "./components/pages/DoublePendulum";
import Friction from "./components/pages/Friction";
import AirResistance from "./components/pages/AirResistance";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/trajectory" component={Trajectory} />
        <Route path="/newtonscradle" component={NewtonsCradle} />
        <Route path="/doublependulum" component={DoublePendulum} />
        <Route path="/friction" component={Friction} />
        <Route path="/airresistance" component={AirResistance} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
