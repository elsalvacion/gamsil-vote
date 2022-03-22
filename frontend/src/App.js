import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import AdminPanelSceen from "./screens/AdminPanelSceen";
import CandidateScreen from "./screens/CandidateScreen";
import CategoryScreen from "./screens/CategoryScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import StartOStopVoteScreen from "./screens/StartOStopVoteScreen";
import UserScreen from "./screens/UserScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <div className="pt-3 h-screen bg-gradient-to-b  from-blue-400 via-white to-green-400">
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/adminpanel" component={AdminPanelSceen} />
          <Route exact path="/category" component={CategoryScreen} />
          <Route exact path="/candidate" component={CandidateScreen} />
          <Route
            exact
            path="/start-or-stop-vote"
            component={StartOStopVoteScreen}
          />
          <Route exact path="/user" component={UserScreen} />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
