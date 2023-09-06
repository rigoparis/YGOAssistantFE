import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

export const getUserDecks = () => {
  return axios.get(API_URL + "decks", { headers: authHeader() });
};