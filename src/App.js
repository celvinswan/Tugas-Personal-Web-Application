import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
