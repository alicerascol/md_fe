import { toast } from "react-toastify";
import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return (dispatch) => {
    if (payload.creds.email.length > 0 && payload.creds.password.length > 0) {
      axios
        // .post("http://localhost:8080/faculties", payload.creds)
        .post(
          "http://backend.westeurope.azurecontainer.io:8080/faculties",
          payload.creds
        )
        .then((response) => {
          toast.success("You've been registered successfully");
          payload.history.push("/login");
        })
        .catch(() => {
          dispatch(registerError("Something was wrong. Try again"));
        });
    } else {
      dispatch(registerError("Something was wrong. Try again"));
    }
  };
}
