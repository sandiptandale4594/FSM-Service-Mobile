import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  GestureResponderEvent,
  Alert,
  Platform,
  LayoutChangeEvent,
  ViewStyle,
} from "react-native";
import { useFonts, loadAsync } from "expo-font";
import styles from "./styles/globalStyles";
import LoginStack from "./navigations/LoginStack";
import {
  userContextReducer,
  initialState,
} from "./contexts/UserContextReducer";
import UserContext from "./contexts/UserContext";
import { Entypo } from "@expo/vector-icons";
import ACTION from "./contexts/action";
import {
  PanGestureHandler,
  State as PanGestureState,
  PanGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { analysticsRecord, setAcceptUUID } from "./utils/apiCaller";
import { ModalProvider } from "./contexts/modal";
// import { setAcceptUUID } from './utils/apiCaller'
import * as Application from "expo-application";
import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";
import NoInternetScreen from "./screens/NoInternetScreen";
import { createStackNavigator } from "@react-navigation/stack";
// import { Linking } from "expo-linking";
// import { Linking } from "expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
const Stack = createStackNavigator();

const pixelsToPercent = (loc) => {
  return {
    left: ((loc.x / width) * 100).toFixed(2) + "%",
    top: ((loc.y / height) * 100).toFixed(2) + "%",
  };
};

const addLocations = (loc1, loc2) => {
  return {
    x: loc1.x + loc2.x,
    y: loc1.y + loc2.y,
  };
};
const { width, height } = Dimensions.get("window");

export default function App() {
  const [isInternetAvailable, setIsInternetAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  //  setAcceptUUID(null);
  const [position, setPosition] = useState({
    x: width * 0.8,
    y: height * 0.8,
  });
  const { cond, eq, add, set, Value, event } = Animated;
  const dragX = new Value(0);
  const dragY = new Value(0);
  const offsetX = new Value(0);
  const offsetY = new Value(0);
  const gestureState = new Value(-1);
  const scale = cond(
    eq(gestureState, PanGestureState.ACTIVE),
    new Value(1.2),
    new Value(1)
  );
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        translationY: dragY,
        state: gestureState,
      },
    },
  ]);
  const onHandlerStateChange = (e) => {
    const { state } = e.nativeEvent;
    if (state === PanGestureState.END || state === PanGestureState.CANCELLED) {
      const translate = {
        x: e.nativeEvent.translationX,
        y: e.nativeEvent.translationY,
      };
      const newPosition = addLocations(position, translate);
      /// console.log('The new position is', newPosition)
      setPosition(newPosition);
    }
  };
  const transX = cond(
    eq(gestureState, PanGestureState.ACTIVE),
    add(offsetX, dragX),
    set(offsetX, add(offsetX, dragX))
  );
  const transY = cond(
    eq(gestureState, PanGestureState.ACTIVE),
    add(offsetY, dragY),
    set(offsetY, add(offsetY, dragY))
  );
  const [store, dispatch] = useReducer(userContextReducer, initialState);
  // const [token, setToken] = useState("5d4e89ee-d6ff-4b5c-82ab-e0e3ed7184e0");

  // useEffect(() => {
  //   if (token) {
  //     setToken("9c5dd596-a9aa-4fde-9325-96fc021994a534324");
  //     // setToken("5d4e89ee-d6ff-4b5c-82ab-e0e3ed7184e0");
  //     dispatch({
  //       type: ACTION.SAVE_CART_TOKEN,
  //       payload: {
  //         cart_token: token,
  //       },
  //     });
  //   }
  // }, [token]);

  const eventListener = (event) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
      // Handle error
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Handle update available
      Alert.alert(
        "Updates Available",
        "Please update to continue uninterrupted using of the app.",
        [{ text: "Ok" }]
      );
    }
  };
  Updates.useUpdateEvents(eventListener);

  const [loaded] = useFonts({
    InterBlack: require("./assets/fonts/Inter-Black.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("./assets/fonts/Inter-ExtraBold.ttf"),
    InterExtraLight: require("./assets/fonts/Inter-ExtraLight.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterThin: require("./assets/fonts/Inter-Thin.ttf"),
  });

  useEffect(() => {
    // Add a listener to handle deep links
    Linking.addEventListener("url", handleDeepLink);

    // Remove the listener when the component unmounts
    return () => {
      // Linking.removeEventListener("url", handleDeepLink);
    };
  }, [Linking]);

  // Define the function to handle deep links
  const handleDeepLink = (event) => {
    setLoading(true);
    const { path, queryParams } = Linking.parse(event.url);
    if (path === "redeem-shared-cart-magic-link") {
      if (queryParams?.token) {
        dispatch({
          type: ACTION.SAVE_CART_TOKEN,
          payload: {
            cart_token: queryParams?.token,
          },
        });
      } else {
        dispatch({
          type: ACTION.SAVE_CART_TOKEN,
          payload: {
            cart_token: null,
          },
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          Alert.alert(
            "Updates Available",
            "Please update to continue uninterrupted using of the app.",
            [{ text: "Ok" }]
          );
        }
      } catch (error) { }
    }
    checkForUpdates();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetAvailable(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isInternetAvailable) {
    }
  }, [isInternetAvailable]);

  if (!loaded || loading) {
    return (
      <View style={styles.container}>
        <Text>Loading .....</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ store, dispatch }}>
        <ModalProvider>
          {!isInternetAvailable ? (
            <Stack.Navigator initialRouteName="NoInternet">
              <Stack.Screen
                name="NoInternet"
                options={{ headerShown: false }}
                component={NoInternetScreen}
              />
            </Stack.Navigator>
          ) : (
            <LoginStack />
          )}
        </ModalProvider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
