import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "user/";

const createAccount = (username, email, password) => {
  return axios.post(API_URL + "createUser", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  createAccount,
  login,
  logout,
};

export default AuthService;
