import "./App.css";
// Redux
import store from "./redux/store";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { getStudentData } from "./redux/actions/userActions";

// Utils
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

// Pages
import Login from "./pages/Login/Login.js";
import OnBoarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import StudentProfile from "./pages/Profile/StudentProfile";
import ClubProfile from "./pages/Profile/ClubProfile";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";

import ViewClubProfile from "./pages/Profile/viewClubProfile";
import ViewStudentProfile from "./pages/Profile/viewStudentProfile";

axios.defaults.baseURL = "http://localhost:9000/";

localStorage.setItem(
  "AuthToken",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmU5NzA5MzU0Njk1MDA0ODkxNDM0MyIsIm5hbWUiOiJCdXNib3kiLCJlbWFpbCI6ImJ1c2JveTJAZ21haWwuY29tIiwiaWF0IjoxNjE3ODYwMzYxLCJleHAiOjE2MjY1MDAzNjF9.FutgK1EqOjXceZzLe0xODkO8T8ZRy9pu6sV72ADRxEQ",
);
const token = localStorage.getItem("AuthToken");

// Check log in at first
if (token) {
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getStudentData());
}

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/linkedin" component={LinkedInPopUp}></Route>
              <Route exact path="/" component={OnBoarding}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route
                exact
                path="/user/:userid"
                component={StudentProfile}
              ></Route>
              <Route exact path="/club/:clubid" component={ClubProfile}></Route>
              <Route
                exact
                path="/view-club"
                component={ViewClubProfile}
              ></Route>
              <Route
                exact
                path="/view-student"
                component={ViewStudentProfile}
              ></Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
