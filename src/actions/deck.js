import {
  SET_MESSAGE,
  CREATE_DECK_SUCCESS,
  CREATE_DECK_FAIL,
  GET_ALL_DECKS_SUCCESS,
  GET_DECK_SUCCESS,
  GET_ALL_DECKS_FAIL,
  PATCH_DECK_SUCCESS,
  PATCH_DECK_FAIL,
  DELETE_DECK_SUCCESS,
  DELETE_DECK_FAIL,
  GET_DECK_FROM_LIST,
  LOADING_COMPLETED,
  LOADING_STARTED,
  SET_ACTIVE_DECK,
} from "./types";

import DeckService from "../services/deck.service";

export const getAll = () => (dispatch) => {
  return DeckService.getAll().then(
    (response) => {
      dispatch({
        type: GET_ALL_DECKS_SUCCESS,
        payload: { decks: response.data },
      });
    },
    (error) => {
      dispatch({
        type: GET_ALL_DECKS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        message: error.message,
      });
    },
  );
};

export const getById = (id) => (dispatch) => {
  return DeckService.getById(id).then((response) => {
    dispatch({
      type: GET_DECK_SUCCESS,
      payload: { deck: response.data },
    });
  });
};

export const createDeck = (deck) => (dispatch) => {
  return DeckService.createDeck(deck).then(
    (response) => {
      dispatch({
        type: CREATE_DECK_SUCCESS,
        payload: { deck: response.data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CREATE_DECK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );
};

export const patchDeck = (deck) => (dispatch) => {
  return DeckService.patchDeck(deck).then(
    (response) => {
      dispatch({
        type: PATCH_DECK_SUCCESS,
        payload: { deck: response.data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PATCH_DECK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );
};

export const deleteDeck = (deck) => (dispatch) => {
  return DeckService.deleteDeck(deck).then(
    (response) => {
      dispatch({
        type: DELETE_DECK_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_DECK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );
};

export const getAllByUserId = (id) => (dispatch) => {
  dispatch({
    type: LOADING_STARTED,
  });
  return DeckService.getAllByUserId(id).then(
    (response) => {
      dispatch({
        type: GET_ALL_DECKS_SUCCESS,
        payload: { decks: response.data },
      });

      dispatch({
        type: LOADING_COMPLETED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_DECK_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    },
  );
};

export const resetActiveDeck = () => (dispatch) => {
  dispatch({
    type: DELETE_DECK_SUCCESS,
  });
};

export const setActiveDeck = (deck) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_DECK,
    payload: { deck },
  });
};

export const getDeckFromListById = (id) => (dispatch) => {
  dispatch({
    type: GET_DECK_FROM_LIST,
    payload: { id },
  });
};
