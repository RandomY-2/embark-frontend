import {
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  GOING_EVENT,
  SET_ERRORS,
  OWN_EVENTS,
  CANCEL_ATTENDANCE_EVENT,
} from "../types";
import axios from "axios";

const maintenanceErrorCheck = (err) => {
  if (err.message.includes(" 503")) {
    console.log("here");
    alert("ERROR 503: Embark is on maintenance, please check later");
  }
};

const setAuthorizationHeader = (token) => {
  const AuthToken = `Bearer ${token}`;
  localStorage.setItem("AuthToken", AuthToken);
  axios.defaults.headers.common["Authorization"] = AuthToken;
};

// Login A User
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/signin", userData);
    setAuthorizationHeader(res.data.token);
    dispatch(getStudentData());
    history.push("/home");
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    maintenanceErrorCheck(err);
  }
};

// Get all users data
export const getStudentData = () => async (dispatch) => {
  try {
    const res = await axios.get("/student/profile");
    const payload = { ...res.data.student, userType: "student" };
    dispatch({
      type: SET_USER,
      payload,
    });
    // TODO: uncomment once the backend is fixed
    // const eventres = await axios.get("/events/going", {
    //   params: { userType: "student" },
    // });
    // dispatch({
    //   type: GOING_EVENT,
    //   payload: eventres,
    // });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

export const getClubData = () => async (dispatch) => {
  try {
    const res = await axios.get("/club/profile");
    const payload = { ...res.data.club, userType: "club" };
    dispatch({
      type: SET_USER,
      payload,
    });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Sign Up a user
export const signupStudent =
  (newUserData, handleUser, handleStep) => async (dispatch) => {
    try {
      const res = await axios.post("/auth/signup", newUserData);
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getStudentData());
      handleUser(newUserData);
      handleStep(1);
    } catch (err) {
      console.log(err);
      if (err.response.data)
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      maintenanceErrorCheck(err);
    }
  };

export const signupClub =
  (newUserData, handleUser, handleStep) => async (dispatch) => {
    try {
      const res = await axios.post("/auth/signup", newUserData);
      setAuthorizationHeader(res.data.token);
      dispatch(getClubData());
      handleUser(newUserData);
      handleStep(1);
    } catch (err) {
      console.log(err);
      if (err.response.data)
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      maintenanceErrorCheck(err);
    }
  };

// Log out a user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// Upload the Avatar
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    //i changed it here,
    .post("/profile/image?pictureType=cover", formData)
    .then((res) => {
      dispatch(getStudentData());
    })
    .catch((err) => console.error(err));
};

// Edit a specific user's setting
export const editStudentDetails = (userDetails) => async (dispatch) => {
  try {
    const res = await axios.post("/student/profile", userDetails);
    dispatch({ type: "SET_USER", payload: res.data.updatedStudent });
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

// Mark notification read on user's end
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => console.error(err));
};

export const studentGoogleSignUp = (profile, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/newsignup", {
      ...profile,
      userType: "student",
    });
    setAuthorizationHeader(res.data.token);
    history.push("/home");
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

export const studentGoogleSignIn = (profile, history) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/newsignin", {
      ...profile,
      userType: "student",
    });
    setAuthorizationHeader(res.data.token);
    history.push("/home");
  } catch (err) {
    console.error(err);
    maintenanceErrorCheck(err);
  }
};

//Mark going to an event
export const goingToEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.post(`/events/${eventId}/attend`, {
      userType: "student",
    });
    dispatch({ type: GOING_EVENT, payload: res });
  } catch (err) {
    console.error(err);
  }
};

//Cancel attending an event
export const cancelAttendingEvent = (eventId) => async (dispatch) => {
  try {
    await axios.post(`/events/${eventId}/cancel`, {
      userType: "student",
    });
    dispatch({ type: CANCEL_ATTENDANCE_EVENT, payload: eventId });
  } catch (err) {
    console.error(err);
  }
};

//get own Club events
export const getOwnEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(`/events/me`, {
      userType: "club",
    });
    dispatch({ type: OWN_EVENTS, payload: res });
  } catch (err) {
    console.error(err);
  }
};
