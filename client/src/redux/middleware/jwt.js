import { setToken, setUser } from "../AuthSlice";
import { jwtDecode } from "jwt-decode";
export const setUserFromToken = (token) => (dispatch) => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        dispatch(setUser(decodedUser.user)); // Dispatch to set the user in the state
        console.log("decoded user: " + JSON.stringify(decodedUser));
        dispatch(setToken(token))
      } catch (error) {
        console.error("Invalid token", error);
        dispatch(logout()); // Log out if token is invalid
      }
    }
  };