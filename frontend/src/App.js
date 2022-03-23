import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import AdminPanelSceen from "./screens/AdminPanelSceen";
import CandidateScreen from "./screens/CandidateScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CreateCategoryScreen from "./screens/CreateCategoryScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import EditUserScreen from "./screens/EditUserScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NotVerifiedScreen from "./screens/NotVerifiedScreen";
import StartOStopVoteScreen from "./screens/StartOStopVoteScreen";
import UserScreen from "./screens/UserScreen";
import VerifyUserScreen from "./screens/VerifyUserScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <div className="pt-3 h-screen bg-gradient-to-b  from-blue-900 via-white to-green-900">
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/not-verified" component={NotVerifiedScreen} />
          <Route exact path="/verify/:id" component={VerifyUserScreen} />

          <Route exact path="/adminpanel" component={AdminPanelSceen} />
          <Route exact path="/category" component={CategoryScreen} />
          <Route exact path="/candidate" component={CandidateScreen} />
          <Route
            exact
            path="/start-or-stop-vote"
            component={StartOStopVoteScreen}
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
    </BrowserRouter>
  );
};

export default App;
