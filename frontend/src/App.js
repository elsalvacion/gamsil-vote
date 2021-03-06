import { HashRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import AdminPanelSceen from "./screens/AdminPanelSceen";
import CandidateScreen from "./screens/CandidateScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreateCandidateScreen from "./screens/CreateCandidateScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import EditCandidateScreen from "./screens/EditCandidateScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import EditUserScreen from "./screens/EditUserScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NotVerifiedScreen from "./screens/NotVerifiedScreen";
import StartOStopVoteScreen from "./screens/StartOStopVoteScreen";
import UserScreen from "./screens/UserScreen";
import VerifyUserScreen from "./screens/VerifyUserScreen";
import VotedScreen from "./screens/VotedScreen";
import VotingNotOpenScreen from "./screens/VotingNotOpenScreen";

const App = () => {
  return (
    <HashRouter>
      <Nav />
      <Switch>
        <div className="pt-3 min-h-screen  bg-gradient-to-b  from-blue-900 via-white to-green-900">
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/not-verified" component={NotVerifiedScreen} />
          <Route exact path="/verify/:id" component={VerifyUserScreen} />

          <Route exact path="/adminpanel" component={AdminPanelSceen} />
          <Route exact path="/category" component={CategoryScreen} />
          <Route exact path="/candidate" component={CandidateScreen} />
          <Route
            exact
            path="/create-candidate"
            component={CreateCandidateScreen}
          />
          <Route
            exact
            path="/edit-candidate/:id"
            component={EditCandidateScreen}
          />
          <Route
            exact
            path="/start-or-stop-vote"
            component={StartOStopVoteScreen}
          />
          <Route exact path="/voted" component={VotedScreen} />
          <Route
            exact
            path="/voting-not-opened"
            component={VotingNotOpenScreen}
          />
          <Route exact path="/user" component={UserScreen} />
          <Route exact path="/edit-user/:id" component={EditUserScreen} />
          <Route exact path="/create-user" component={CreateUserScreen} />
          <Route
            exact
            path="/create-category"
            component={CreateCategoryScreen}
          />
          <Route
            exact
            path="/edit-category/:id"
            component={EditCategoryScreen}
          />
        </div>
      </Switch>
    </HashRouter>
  );
};

export default App;
