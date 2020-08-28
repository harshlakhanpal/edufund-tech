export const toggleDrawer = () => {
  return { type: "TOGGLE_DRAWER" };
};

export const setLoading = () => {
  return { type: "TOGGLE_LOADING" };
};

export const login = (data) => {
  return { type: "LOGIN", payload: data };
};

export const logout = () => {
  return { type: "LOGOUT" };
};
