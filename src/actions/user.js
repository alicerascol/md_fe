import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("faculty_id");
    localStorage.removeItem("faculty_name");
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(receiveLogin());

    if (creds.email.length > 0 && creds.password.length > 0) {
      const user = {
        username: creds.email,
        password: creds.password,
      };
      axios
        .post("http://localhost:8080/faculties/login", user)
        .then((response) => {
          localStorage.setItem("faculty_id", response.data.id);
          localStorage.setItem("faculty_name", response.data.name);
          localStorage.setItem("authenticated", true);
          creds.history.push("/app");
        })
        .catch(() => {
          dispatch(loginError("Something was wrong. Try again"));
        });
    } else {
      dispatch(loginError("Something was wrong. Try again"));
    }
  };
}
