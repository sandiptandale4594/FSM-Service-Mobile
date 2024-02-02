import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { isEmpty } from "lodash";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import PostLoginDrawer from "./PostLoginDrawer";
import ACTION from "../contexts/action";
import UserContext from "../contexts/UserContext";
import LoadingModal from "../components/modals/LoadingModal";
import { setAcceptUUID } from "../utils/apiCaller";
import { setAcceptUUIDNodeAPI } from "../utils/nodeApiCaller";
import { SelectDelivaryModal } from "../components/modals/SelectDelivaryModal";

const Stack = createStackNavigator();

function LoginStack() {
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});

  useEffect(() => {
    SecureStore.getItemAsync("state")
      .then((state) => {
        if (state) {
          const parsedState = JSON.parse(state);
          console.log("parsedStateparsedStateparsedState", JSON.stringify(parsedState))
          if (parsedState?.user) {
            setState(parsedState);
          }
          if (parsedState?.acceptUUID) {
            setAcceptUUID(parsedState.acceptUUID);
            setAcceptUUIDNodeAPI(parsedState.acceptUUID);
          }
          dispatch({
            type: ACTION.INIT,
            payload: { state: parsedState },
          });
        }
      })
      .catch(() => { })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, setLoading, setState]);

  const isAuth = Boolean(state?.user);
  if (loading) return <LoadingModal visible={true} />;

  console.log("isAuthisAuthisAuth", JSON.stringify(isAuth))

  return (
    <Stack.Navigator initialRouteName={isAuth ? "PostLoginDrawer" : "Splash"}>
      <Stack.Screen
        name="Splash"
        options={{ headerShown: false }}
        component={SplashScreen}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="PostLoginDrawer"
        options={{
          headerShown: false,
        }}
        component={PostLoginDrawer}
      />
    </Stack.Navigator>
  );
}

export default LoginStack;
