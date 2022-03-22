import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import AdminPanelSceen from "./screens/AdminPanelSceen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/adminpanel" component={AdminPanelSceen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
