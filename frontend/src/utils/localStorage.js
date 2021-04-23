import axios from "axios";

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      console.log('state',serializedState);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  };

  // FUNCIÓN PARA GUARDAR EL TOKEN EN EL LOCALSTORAGE
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("AUTH_TOKEN_KEY", token);
}

// FUNCIÓN PARA RECUPERAR EL TOKEN DESDE EL LOCALSTORAGE
export function getAuthToken() {
  let state = JSON.parse(localStorage.getItem('state'))
  let token = state.user.user.token;
  console.log('token',token)
  return token
}