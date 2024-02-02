import React, { useContext, useEffect, } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CallsListScreen from "../screens/CallsListScreen";
import Profile_Icon from "../components/Profile_Icon";
import NavButton from "./NavButton";
import * as p from "../styles/primaryStyles";
import UserContext from "../contexts/UserContext";
import HeaderTitle from "../components/HeaderTitle";
import CommonHeaderTitle from "../components/CommonHeader";
import CallDetailsScreen from "../screens/CallDetailsScreen";
import BackButton from "./BackButton";

const Stack = createStackNavigator();
export default function HomeStack() {
  const { store, dispatch } = useContext(UserContext);
  var token =
    store.cart_token &&
      store.cart_token != undefined &&
      store.cart_token != null
      ? store.cart_token
      : null;

  useEffect(() => {
    if (token) {
    }
    return () => { };
  }, [token]);

  return (
    <Stack.Navigator
      initialRouteName={token ? "HomeScreen" : "HomeScreen"}
      screenOptions={({ navigation, route }) => {
        return {
          headerRight: () => <Profile_Icon nav={navigation} />,
          headerLeft: () => <NavButton nav={navigation} />,
          headerStyle: styles.navHeader,
          headerTitleStyle: styles.navHeaderTitle,
        };
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation, route }) => {
          return {
            headerRight: () => <Profile_Icon nav={navigation} />,
            headerTitle: () => <HeaderTitle nav={navigation} />,
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
          };
        }}
      />
      <Stack.Screen
        name="CallsListScreen"
        component={CallsListScreen}
        options={({ navigation, route }) => {
          return {
            headerRight: () => <Profile_Icon nav={navigation} />,
            headerTitle: () => <CommonHeaderTitle title="Calls" />,
            headerLeft: () => <BackButton nav={navigation} />,
            headerStyle: {
              backgroundColor: p.logoColor,
            },
          };
        }}
      />
      <Stack.Screen
        name="CallDetailsScreen"
        component={CallDetailsScreen}
        options={({ navigation, route }) => {
          return {
            //headerRight: () => <Profile_Icon nav={navigation} />,
            headerRight: null,
            headerTitle: () => <CommonHeaderTitle title="Call Details" />,
            headerLeft: () => <BackButton nav={navigation} />,
            headerStyle: {
              backgroundColor: p.logoColor,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    backgroundColor: p.logoColor,
    // color: p.secondaryColor,
    shadowColor: p.secondaryColor,
    shadowOffset: {
      width: 20,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
    elevation: 6,
    height: 100,
  },
  navHeaderTitle: {
    color: p.secondaryColor,
  },
});
