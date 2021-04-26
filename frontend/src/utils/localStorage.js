// Loading state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Saving state into localStorage
export const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

// Retrieving token from localStorage
export function getAuthToken() {
  let state = JSON.parse(localStorage.getItem('state'))
  let token = state.user.user.token;
  return token
}