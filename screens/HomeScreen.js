import React, { Fragment, useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, BackHandler, Alert, FlatList } from "react-native";
import ACTION from "../contexts/action";
import { AntDesign } from "@expo/vector-icons";
import { logoColor } from "../styles/primaryStyles";
import { LinearGradient } from 'expo-linear-gradient';
import BackPopupModal from "../components/modals/BackPopupModal";
import { getLabel, getCurrentLanguage } from "../languages/LanguageProcessor";
import UserContext from "../contexts/UserContext";
import { CALL_ICON, BUSINESS_ICON, QUOTATION_ICON, PARTS_ICON, OFFERS_ICON } from '../assets/constant/imgConstant';
import ServiceListItem from "../components/ServiceListItem";

const HomeScreen = ({ navigation, route }) => {
  const { store, dispatch } = useContext(UserContext);
  const [backPopup, setbackPopup] = useState(false);
  var userInfo = store && store?.user && store?.user?.customerEntities[0]
  let serviceListArray = [
    {
      "serviceName": "Calls",
      "serviceIcon": CALL_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "Business Activity",
      "serviceIcon": BUSINESS_ICON,
      "serviceStatus": "Inactive"
    },
    {
      "serviceName": "Orders",
      "serviceIcon": CALL_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "Quotations",
      "serviceIcon": QUOTATION_ICON,
      "serviceStatus": "Inactive"
    },
    {
      "serviceName": "Machine History",
      "serviceIcon": PARTS_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "Parts Price & Availability",
      "serviceIcon": CALL_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "CAT Inspect Form",
      "serviceIcon": CALL_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "Customer Outstanding",
      "serviceIcon": BUSINESS_ICON,
      "serviceStatus": "Inactive"
    },
    {
      "serviceName": "Track CSE",
      "serviceIcon": CALL_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "Offers",
      "serviceIcon": OFFERS_ICON,
      "serviceStatus": "Active"
    },
    {
      "serviceName": "CAT Inspection App",
      "serviceIcon": BUSINESS_ICON,
      "serviceStatus": "Active"
    }
  ]

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      setbackPopup(true);
      return true;
    } else {
      return false;
    }
  };

  const removeBackHandler = () => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    dispatch({
      type: ACTION.SAVE_POSTLOGIN_NAV,
      payload: navigation,
    });
    return removeBackHandler;
  }, []);


  return (
    <Fragment>
      <BackPopupModal
        visible={backPopup}
        message={getLabel("BACK_CONFIRMATION")}
        exit={() => {
          // setbackPopup(false);
          // dispatch({
          //   type: ACTION.SAVE_POSTLOGIN_NAV,
          //   payload: null,
          // });
          // dispatch({ type: ACTION.SAVE_USER, payload: { user: null } });
          BackHandler.exitApp()
        }}
        dismiss={() => {
          setbackPopup(false);
        }}
      />
      <View style={styles.mainViewContainer}>
        <LinearGradient
          colors={['#ffffff', '#ffc50c']}
          style={styles.lgContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.textStyle}>Hi, Service Engineer</Text>
            <View style={styles.viewContainer1}>
              <AntDesign name="mail" size={15} style={styles.iconStyle} />
              <Text style={styles.emailText}>{userInfo?.email}</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={{ marginVertical: 20, }}>
          <FlatList
            data={serviceListArray}
            numColumns={3}
            renderItem={({ item }) => <ServiceListItem props={item} />} />
        </View>
      </View>
    </Fragment>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    width: '100%',
    paddingTop: 10
  },
  mainViewContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    marginHorizontal: 20,
    fontFamily: 'InterBold',
    fontSize: 20
  },
  lgContainer: {
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'column',
    height: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  viewContainer1: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconStyle: {
    color: 'black',
    paddingTop: 5
  },
  emailText: {
    fontFamily: 'InterMedium',
    fontSize: 14,
    marginLeft: 5
  },
});

export default HomeScreen;
