import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as Application from "expo-application";
import styles from "../styles/LoginStyle";
import { getLabel, getCurrentLanguage } from "../languages/LanguageProcessor";
import { TouchableOpacity } from "react-native-gesture-handler";
import { secondaryColor } from "../styles/primaryStyles";
import UserContext from "../contexts/UserContext";
import { login } from "../utils/apiCaller";
import ACTION from "../contexts/action";
import LoadingModal from "../components/modals/LoadingModal";
import OTPVerificationModal from "../components/modals/OTPVerificationModal";
import AlertModal from "../components/modals/AlertModal";
import {
  checkIfEmployeeLogin,
  getRegionDetails,
  sendVerificationOtp,
  verifyMobile,
} from "../utils/nodeApiCaller";
import * as AppJSON from "../app.json";
import { API_MODE } from "@env";
import { LOGO, FSM_ICON } from '../assets/constant/imgConstant';
import { TextInput } from 'react-native-paper';
function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNo, setMobileNo] = useState(null);
  const [password, setPassword] = useState(Constants.deviceId);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpModalVisibility, setOTPModalVisibility] = useState(false);
  const [isLoading, setisLoading] = useState(0);
  const [isError, setisError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { store, dispatch } = useContext(UserContext);
  const [userObject, setuserObject] = useState(null);
  const [regionDetails, setRegionDetails] = useState([]);
  const [customerSelection, setcustomerSelection] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [otpModalProps, setOTPModalProps] = useState(null);
  const [employeeLoginAttempt, setEmployeeLoginAttempt] = useState(false);
  let mobInput = null;
  let newId = Application.androidId;
  let passInput = Constants.deviceId;
  let loginErrorMsg = getLabel("LOGIN_FAILED");
  const appVersion = AppJSON.expo.version;
  const appMode = API_MODE === "PROD" ? "" : "Q";

  useEffect(() => {
    return () => { };
  }, [otpModalVisibility, otpModalProps]);

  useEffect(() => {
    if (isLoading === 2) {
      setisLoading(0);
    }
    return () => { };
  }, [isLoading, isVerified, otpModalVisibility, otpModalProps]);
  //    console.log(d);

  const setLoginContext = async () => {
    setisLoading(1);
    checkIfEmployeeLogin(
      mobileNo,
      (error) => {
        console.log("error", error);
      },
      async (data) => {
        console.log("Inside Employee Login Check Start");
        console.log("Data", data);
        if (data && data.is_verified) {
          setEmployeeLoginAttempt(true);
          var uuid = Date.now() + mobileNo;
          const otpprops = {
            uuid: uuid,
            mobile: mobileNo,
            employeeLoginAttempt: true,
          };
          await sendVerificationOtp(uuid, mobileNo);
          setisLoading(0);
          setOTPModalVisibility(true);
          setOTPModalProps(otpprops);
        } else {
          verifyMobile(
            mobileNo,
            (error) => {
              console.log("error", error);
            },
            async (data) => {
              console.log("Inside Normal User Login Check Start");
              if ("" + data.E_STATUS[0] === "1") {
                var uuid = Date.now() + mobileNo;
                setEmployeeLoginAttempt(false);
                const otpprops = {
                  uuid: uuid,
                  mobile: mobileNo,
                };
                await sendVerificationOtp(uuid, mobileNo);
                setisLoading(0);
                setOTPModalVisibility(true);
                setOTPModalProps(otpprops);
              } else {
                setisError(true);
                setErrorMessage(
                  "Invalid Mobile Number, Please Provide a Valid Mobile Number!"
                );
                setisLoading(0);
              }
              console.log("Inside Normal Login Check End");
            }
          );
        }
        console.log("Inside Employee Login Check End");
      }
    );
  };
  const handleModalSuccess = () => {
    setOTPModalVisibility();
    login(
      mobileNo,
      newId,
      setisLoading,
      setuserObject,
      (error) => {
        setisError(true);
        setErrorMessage(error.code);
        setisLoading(0);
      },
      async ({ data: u, headers }) => {
        console.log(
          "User Login u.customerAddressEntities",
          u.customerAddressEntities
        );
        try {

          dispatch({
            type: ACTION.ACCEPT_UUID,
            payload: { acceptUUID: headers["accept-uuid"] || null },
          });
          dispatch({
            type: ACTION.SAVE_LOGGEDIN_USER_TYPE,
            payload: { user_type: "USER" },
          });
          setCustomerAddresses(u.customerAddressEntities);
          getRegionDetails(
            u.customerAddressEntities,
            setRegionDetails,
            setisLoading,
            (error) => {
              setisError(true);
              setErrorMessage(error.code);
              setisLoading(0);
            },
            setLoggedIn
          );
        } catch (error) {
          console.error("error after otp verify", error);
        }
      },
      setLoggedIn
    );
    console.log("moboleInput", mobInput);
    if (mobInput) {
      mobInput.clear();
    }
    //passInput.clear();
    setMobileNo(null);
    setPassword(Constants.deviceId);
    return true;
  };

  const handleModalSuccessOnEmployeeLogin = (mobileNo) => {
    var uuid = Date.now() + mobileNo;
    const u = {
      customerAddressEntities: [
        {
          addressLine1: "DHOLPUR ROAD",
          addressLine2: "FIROZABAD",
          addressType: null,
          bldngNo: null,
          countryCode: null,
          customerNumber: "0000917069",
          id: null,
          name: "PARAS GLASS WARE PVT. LTD.",
          email: "parasglassware@gmail.com",
          pinCode: "283203",
          regionCode: "Uttar Pradesh",
          streetName: null,
          is_employee: true,
        },
      ],
    };

    try {
      setOTPModalVisibility(false);
      navigation.navigate("PostLoginDrawer");
      dispatch({
        type: ACTION.SAVE_USER,
        payload: {
          user: {
            customerEntities: u.customerAddressEntities,
          },
        },
      });
      dispatch({
        type: ACTION.SAVE_CUSTOMER_ADDRESS,
        payload: u.customerAddressEntities,
      });
      dispatch({
        type: ACTION.ACCEPT_UUID,
        payload: { acceptUUID: uuid || null },
      });
      dispatch({
        type: ACTION.SAVE_LOGGEDIN_USER_TYPE,
        payload: { user_type: "EMPLOYEE" },
      });
      setCustomerAddresses(u.customerAddressEntities);
    } catch (error) {
      console.error("error after otp verify", error);
    }
    if (mobInput) {
      mobInput.clear();
    }
    //passInput.clear();
    setMobileNo(null);
    setPassword(Constants.deviceId);
    return true;
  };

  const handleModalError = () => {
    setisError(true);
    setErrorMessage("Invalid OTP, Please Provide a Valid OTP!");
    console.error("Modal action failed");
    setisLoading(0);
  };

  const closeModal = () => {
    setOTPModalVisibility(false);
    mobInput.clear();
    setMobileNo(null);
  };

  const dismissModal = () => {
    setLoggedIn(false);
    setcustomerSelection(true);
  };
  const dismissModalCustomerSelection = (customer) => {
    setcustomerSelection(false);
    navigation.navigate("PostLoginDrawer");
  };

  const checkValueEntered = () => {
    // console.log(mobileNo);
    if (mobileNo !== null && password !== null) {
      return true;
    } else {
      return false;
    }
  };
  const plantSelectionErrorPopup = (error) => {
    setisError(true);
    setErrorMessage(error.code);
    setLoggedIn(false);
  };
  if (mobileNo !== null) {
    checkValueEntered();
  }
  const setNumber = (val) => {
    // console.log(val);
    setMobileNo(val);
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <LoadingModal visible={isLoading === 0 ? false : true} />
      <OTPVerificationModal
        visible={otpModalVisibility ? true : false}
        mData={otpModalProps}
        employeeLoginAttempt={employeeLoginAttempt}
        employeeSuccessCallback={handleModalSuccessOnEmployeeLogin}
        successCallback={handleModalSuccess}
        errorCallback={handleModalError}
        closeModal={closeModal}
      />
      <AlertModal
        visible={isError}
        message={errorMessage}
        dismiss={() => {
          setisLoading(0);
          setisError(false);
        }}
      />
      <View style={styles.loginCompanyView}>
        <Image
          style={styles.loginCompanyLogo}
          resizeMode="contain"
          source={LOGO}
        />
      </View>
      <View style={[styles.loginCompanyView, { flex: 8 }]}>
        <View style={styles.viewStyle}>
          <Image
            style={styles.gainWellCustomLogo}
            resizeMode="contain"
            source={FSM_ICON}
          />
          <Text style={styles.loginTagLineTitleText}>
            {getLabel("LOGIN_PAGE_TAG_LINE")}
          </Text>
          {/* <TextInput
            placeholder={getLabel("ENTER_MOB_NO")}
            placeholderTextColor={secondaryColor}
            style={styles.loginTextBox}
            selectionColor={'black'}
            maxLength={10}
            onChangeText={(val) => setNumber(val)}
            keyboardType="number-pad"
            ref={(input) => {
              mobInput = input;
            }}
          /> */}
          <View style={{ height: 60, width: '80%', }}>
            <TextInput
              // label={localize.deliveryInformation.fullName}
              // value={this.state.full_name}
              maxLength={10}
              //activeOutlineColor='#36384C'
              style={styles.loginTextBox}
              mode="outlined"
              selectionColor="black"
              theme={{
                colors: { primary: '#d9d9d9', underlineColor: '#d9d9d9', },
              }}
              placeholder={getLabel("ENTER_MOB_NO")}
              onChangeText={(val) => setNumber(val)}
              keyboardType="number-pad"
              ref={(input) => {
                mobInput = input;
              }}
              left={
                <TextInput.Icon style={{
                  marginTop: 10,
                }}
                  name="cellphone"
                  color={'#000000'}
                  size={25}
                  onPress={() => {
                  }}
                />
              }
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              disabled={!checkValueEntered()}
              onPress={() => {
                setLoginContext();
              }}
              style={
                checkValueEntered() ? styles.loginBtn : styles.loginBtnDisabled
              }
            >
              <Text style={styles.buttonText}>{getLabel("LOGIN_BUTTON")}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginVertical: 20 }}>
            <Text style={styles.gotoTextStyle}>{getLabel("GOTO_LINE")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.loginVersionView}>
        <Text style={styles.loginVersionText}>
          Version : {appVersion} {appMode}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
