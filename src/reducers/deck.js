import {
  CREATE_DECK_SUCCESS,
  CREATE_DECK_FAIL,
  GET_DECK_SUCCESS,
  GET_DECK_FAIL,
  GET_ALL_DECKS_SUCCESS,
  GET_ALL_DECKS_FAIL,
  PATCH_DECK_SUCCESS,
  PATCH_DECK_FAIL,
  DELETE_DECK_SUCCESS,
  DELETE_DECK_FAIL,
  GET_DECK_FROM_LIST,
  LOADING_STARTED,
  LOADING_COMPLETED,
  SET_ACTIVE_DECK,
} from "../actions/types";

const initialState = {
  loading: false,
  decks: [],
  activeDeck: {
    deckName: "",
    tags: [],
    mainDeck: [],
    extraDeck: [],
    sideDeck: [],
  },
};

const deckReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOADING_COMPLETED:
      return {
        ...state,
        loading: false,
      };
    case CREATE_DECK_SUCCESS:
    case GET_DECK_SUCCESS:
    case PATCH_DECK_SUCCESS:
      return {
        ...state,
        activeDeck: payload.deck,
      };
    case CREATE_DECK_FAIL:
    case GET_DECK_FAIL:
    case PATCH_DECK_FAIL:
    case DELETE_DECK_SUCCESS:
      return {
        ...state,
        activeDeck: {
          deckName: "",
          tags: [],
          mainDeck: [],
          extraDeck: [],
          sideDeck: [],
        },
      };
    case GET_ALL_DECKS_SUCCESS:
      return {
        ...state,
        decks: payload.decks,
      };
    case GET_ALL_DECKS_FAIL:
      return {
        ...state,
        decks: [],
      };
    case DELETE_DECK_FAIL:
      return {
        ...state,
      };
    case GET_DECK_FROM_LIST:
      return {
        ...state,
        activeDeck: { ...state.decks.find((d) => d._id === payload.id) },
      };
    case SET_ACTIVE_DECK:
      return {
        ...state,
        activeDeck: payload.deck,
      };
    default:
      return state;
  }
};

export default deckReducer;
