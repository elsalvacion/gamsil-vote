import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/home" component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
