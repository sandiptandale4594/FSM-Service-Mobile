import React, { useState, useContext, useEffect } from "react";
import {
  DrawerItemList,
  DrawerContent,
  DrawerContentScrollView,
  Section,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, TextInput } from "react-native";
import { getCurrentLanguage, getLabel } from "../languages/LanguageProcessor";
import UserContext from "../contexts/UserContext";
import ACTION from "../contexts/action";
import styles from "../styles/SideMenuStyle";
import { AntDesign } from "@expo/vector-icons";
import { getRegionDetails } from "../utils/nodeApiCaller";
import { GV_ICON, PROFILE_IMG } from "../assets/constant/imgConstant";
export default function SideMenu(props) {
  const { store, dispatch } = useContext(UserContext);
  var userInfo = store && store?.user && store?.user?.customerEntities[0]
  const [customerSelection, setcustomerSelection] = useState(false);
  const [selectDeliveryModal, setSelectDeliveryModal] = useState(false);
  const [regionDetails, setRegionDetails] = useState([]);
  const plantSelectionErrorPopup = (error) => {
    setSelectDeliveryModal(false);
  };
  useEffect(() => {
    if (selectDeliveryModal) {
      getRegionDetails(
        store?.user,
        setRegionDetails,
        (i) => { },
        () => { },
        setSelectDeliveryModal
      );
    }
    return () => { };
  }, [selectDeliveryModal]);

  return (
    <View style={styles.sidemenu}>
      <View style={styles.drawerContent}>
        <DrawerContentScrollView>
          <View style={styles.drawerViewContainer}>
            <Image source={PROFILE_IMG} resizeMode={'stretch'} style={styles.drawerImage} />
            <Text style={styles.textUser}>Hi, Service Engineer</Text>
            <View style={styles.profileView}>
              <AntDesign name="mail" size={15} style={styles.profileIconView} />
              <Text style={styles.profileEmailText}>{userInfo?.email}</Text>
            </View>
          </View>
          <View style={styles.logOutViewContainer}>
            <AntDesign name="search1" size={20} style={styles.editProfileIcon} />
            <View style={{ width: '90%' }}>
              <TextInput
                style={styles.input}
                textAlign={'left'}
                placeholder="Search"
                cursorColor={'gray'}
                placeholderTextColor={'gray'}
                selectionColor={'gray'}
                maxLength={12}
              // onChangeText={(text) => setOTP(text)}
              // value={otp}
              />
            </View>
          </View>

          <View style={styles.callsMainView}>
            <View style={styles.callLeftView}>
              <AntDesign name="shoppingcart" size={20} style={[styles.editProfileIcon, { color: '#636363' }]} />
              <Text style={[styles.labelStyle, { marginLeft: 10 }]}>{getLabel("CALLS")}</Text>
            </View>
            <View style={styles.callsRightView}>
              <Text style={styles.labelStyle}>3</Text>
            </View>
          </View>
          <DrawerItem
            label={getLabel("BUSINESS_ACTIVITY")}
            labelStyle={styles.labelStyle}
            name="shopping-section"
            icon={(color, size) => {
              return <AntDesign name="shoppingcart" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              props.navigation.navigate("HomeScreen");
            }}
          />
          <DrawerItem
            label={getLabel("ORDERS")}
            labelStyle={styles.labelStyle}
            name="order-history"
            icon={(color, size) => {
              return <AntDesign name="shoppingcart" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              //props.navigation.navigate("OrderHistory", { refresh: false });
            }}
          />
          <DrawerItem
            label={getLabel("QUOTATIONS")}
            labelStyle={styles.labelStyle}
            name="shopping-section"
            icon={(color, size) => {
              return <AntDesign name="shoppingcart" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              props.navigation.navigate("HomeScreen");
            }}
          />
          <DrawerItem
            label={getLabel("MACHINE_HISTORY")}
            labelStyle={styles.labelStyle}
            name="contact-us"
            icon={(color, size) => {
              return <AntDesign name="contacts" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              //props.navigation.navigate("ContactUs");
            }}
          />
          <DrawerItem
            label={getLabel("PART_PRICE")}
            labelStyle={styles.labelStyle}
            name="contact-us"
            icon={(color, size) => {
              return <AntDesign name="contacts" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              //props.navigation.navigate("ContactUs");
            }}
          />
          <DrawerItem
            label={getLabel("CAT_INSPECT_FORM")}
            labelStyle={styles.labelStyle}
            name="contact-us"
            icon={(color, size) => {
              return <AntDesign name="contacts" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              //props.navigation.navigate("ContactUs");
            }}
          />
          <DrawerItem
            label={getLabel("CUSTOMER_OUTSTANDING")}
            labelStyle={styles.labelStyle}
            name="contact-us"
            icon={(color, size) => {
              return <AntDesign name="contacts" style={styles.item} />;
            }}
            style={styles.itemContainer}
            onPress={() => {
              //props.navigation.navigate("ContactUs");
            }}
          />
        </DrawerContentScrollView>

        <View style={styles.settingMainView}>
          <View style={styles.settingView}>
            <AntDesign name="setting" size={20} style={styles.editProfileIcon} />
            <Text style={styles.itemText}>Settings</Text>
          </View>
          <AntDesign name="arrowright" size={20} style={styles.itemArrow} />
        </View>

        <View style={styles.editProfileMainView}>
          <View style={styles.editProfileView}>
            <AntDesign name="profile" size={20} style={styles.editProfileIcon} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </View>
          <AntDesign name="arrowright" size={20} style={[styles.editProfileIcon, { marginRight: 10 }]} />
        </View>

        <View style={styles.logOutViewContainer}>
          <View style={styles.logOutView}>
            <AntDesign name="logout" size={20} style={styles.editProfileIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Image source={GV_ICON} resizeMode={'stretch'} style={styles.logoutImageView} />
        </View>
      </View>

    </View>
  );
}
