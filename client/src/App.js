import "./App.css";
import Navbar from "./components/Navbar";
import HeroCards from "./components/HeroCards";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ViewStocks from "./components/ViewStocks";
import StocksTable from "./components/StocksTable";
import { useState } from "react";

function App() {
  const [savedStocks, setSavedStocks] = useState([]);

  return (
    <Router>
      <div>
        <Navbar />
        <HeroCards />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <StocksTable
              savedStocks={savedStocks}
              setSavedStocks={setSavedStocks}
            />
          </Route>
          <Route path="/view">
            <ViewStocks
              savedStocks={savedStocks}
              setSavedStocks={setSavedStocks}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
