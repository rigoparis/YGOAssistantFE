import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "deck/";

const getAll = () => {
  return axios.get(API_URL + "getAll");
};

const getById = (id) => {
  return axios.get(API_URL + "getById", { id });
};

const createDeck = (deck) => {
  return axios.post(API_URL + "createDeck", deck);
};

const patchDeck = (deck) => {
  return axios.patch(API_URL + "patchDeck", deck);
};

const deleteDeck = (deck) => {
  return axios.delete(API_URL + "deleteDeck", deck);
};

const getAllByUserId = (userId) => {
  return axios.get(API_URL + "getAllByUserId", { params: { userId } });
};

const DeckService = {
  getAll,
  getById,
  createDeck,
  patchDeck,
  deleteDeck,
  getAllByUserId,
};

export default DeckService;
