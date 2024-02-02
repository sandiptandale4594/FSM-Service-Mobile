import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState, useContext } from "react";
import HomeStack from "./HomeStack";
import SideMenu from "./SideMenu";
import UserContext from "../contexts/UserContext";
import ACTION from "../contexts/action";

const Drawer = createDrawerNavigator();
const NavigationDrawer = ({ navigation }) => {
  const { store, dispatch } = useContext(UserContext);
  useEffect(() => {
    dispatch({
      type: ACTION.SAVE_LOGIN_NAV,
      payload: navigation,
    });
  }, [dispatch]);
  return (
    <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="shopping-section" component={HomeStack} />
    </Drawer.Navigator>
  );
};
export default NavigationDrawer;
