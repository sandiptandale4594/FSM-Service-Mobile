import ACTION from "./action";
import * as SecureStore from "expo-secure-store";

export const userContextReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ACCEPT_UUID: {
      const { acceptUUID } = action.payload;
      SecureStore.setItemAsync(
        "state",
        JSON.stringify({
          ...state,
          acceptUUID,
        })
      );
      return { ...state, acceptUUID };
    }

    case ACTION.INIT:
      return { ...state, ...action.payload.state };


    case ACTION.LANGUAGE_CHANGE: {
      const { language } = action.payload;
      SecureStore.setItemAsync(
        "state",
        JSON.stringify({
          ...state,
          language,
        })
      );
      return { ...state, language };
    }

    // Init Cart
    case ACTION.INIT_CART: {
      const { materialNumber, modelInCart } = action.payload;
      const cart = [{ materialNumber, quantity: 1 }];
      SecureStore.setItemAsync(
        "state",
        JSON.stringify({
          ...state,
          cart,
          modelInCart,
        })
      );
      return { ...state, cart, modelInCart };
    }

    case ACTION.SAVE_USER: {
      const { user } = action.payload;
      SecureStore.setItemAsync(
        "state",
        JSON.stringify({
          ...state,
          user,
        })
      );
      return { ...state, user };
    }

    case ACTION.SAVE_LOGIN_NAV:
      return {
        ...state,
        loginNav: action.payload,
      };
      break;
    case ACTION.SAVE_POSTLOGIN_NAV:
      return {
        ...state,
        postLoginNav: action.payload,
      };
      break;
  }
  // console.warn("Time : "+ new Date()+"action=>"+JSON.stringify(action))
};

export const initialState = {
  language: "en",
  acceptUUID: null,
  user: null,
  loginNav: null,
  postLoginNav: null,
};
