import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Axios from "axios";
import styled from "styled-components/native";
import { axios } from "../../utils/nodeApiCaller";
import * as p from "../../styles/primaryStyles";
import { getLabel } from "../../languages/LanguageProcessor";
import UserContext from "../../contexts/UserContext";
import ACTION from "../../contexts/action";
import { fonts } from "../../styles/FontStyles";
import { isEmpty } from "lodash";

export const SelectDelivaryModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState({});
  const { store, dispatch } = useContext(UserContext);
  const [pinCode, setPinCode] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [{ region, district }, setAddress] = useState({
    region: "",
    district: "",
  });

  useEffect(() => {
    getRegions();
  }, [getRegions]);

  const getRegions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/get-regions");
      // console.log("Hew",{data});
      const regions = (data?.payload || []).reduce(
        (a, d) => Object.assign({}, a, { [d.regionDescription]: d.regionCode }),
        {}
      );
      // console.log("Hew",{regions});
      setRegions(regions);
    } catch (e) {
      console.error("Select Delivery Modal", e);
      Alert.prompt("Error!", e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setRegions]);

  const getAddress = useCallback(
    async (pincode) => {
      try {
        setLoading(true);
        const { data } = await Axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        if (!isEmpty(data) && data[0]?.Status === "Success") {
          const postOffice = data[0]?.PostOffice[0];
          setAddress({
            region: postOffice.State,
            district: postOffice?.District,
          });
        }
      } catch (e) {
        console.error("Select Delivery Modal Line 52", e);
        Alert.prompt("Error!", e.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setAddress]
  );

  useEffect(() => {
    setAddress({ region: "", district: "" });
    if (pinCode.length === 6) {
      getAddress(pinCode);
    }
  }, [pinCode, setAddress]);

  const setStoreAddress = (a) => {
    //  console.log('StoreAddress'+JSON.stringify(a));
    dispatch({
      type: ACTION.CHANGE_STORE_ADDRES,
      payload: {
        address: a,
      },
    });
  };
  const setNearestDeliveryHub = (a) => {
    ///console.log('DeliveryAddress'+JSON.stringify(a));
    dispatch({
      type: ACTION.CHANGE_NEAREST_DELIVERY_HUB,
      payload: {
        address: a,
      },
    });
  };
  const handleSubmit = useCallback(async () => {
    const regionCode = regions[region];
    const customerCode = store?.user?.loggedIn;
    if (isEmpty(regionCode)) return setErrorCode("NOT_SERVICEABLE");
    console.log("Address Submitting...");
    try {
      setLoading(true);
      const { data } = await axios.post("/get-nearest-plant", {
        regionCode,
        pinCode,
      });
      if (!isEmpty(data?.payload)) {
        const storeAddress = data?.payload?.NearestPlant,
          deliveryHub = data?.payload?.NearestOrderHub,
          deliveryPincode = pinCode;
        dispatch({
          type: ACTION.UPDATE_HUB,
          storeAddress,
          deliveryHub,
          deliveryPincode,
        });
        props.setState((x) => ({
          ...x,
          storeAddress,
          deliveryHub,
          deliveryPincode,
        }));
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    // getNearestPlantAndDeliveryHub(r[0].regionCode, pinCode, props.errorCallback, setIsDisabled, props.dismissModal, setStoreAddress, setNearestDeliveryHub, () => {
    //     setPinCode("");
    //     setDistrict("");
    //     setRegion("");
    // }, store?.user?.loggedIn)
  }, [
    regions,
    region,
    pinCode,
    store?.user?.loggedIn,
    setErrorCode,
    setLoading,
    dispatch,
    props.setState,
  ]);

  // const checkPincode = (value) => {
  //     if (value.length === 6) {
  //         dispatch({
  //             type: ACTION.CHANGE_PINCODE,
  //             payload: value
  //         });
  //         //setPinCode(value);
  //         pincodeCheck(value, setRegion, setDistrict, setErrorCode);
  //     }
  // }

  const isDisable =
    isEmpty(pinCode) ||
    pinCode?.length !== 6 ||
    isEmpty(region) ||
    isEmpty(district);

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {loading && (
            <LoadingContainer style={StyleSheet.absoluteFill}>
              <ActivityIndicator color={"#000"} />
            </LoadingContainer>
          )}
          <Text style={styles.modalHeadingText}>
            {getLabel("SELECT_PLANT")}
          </Text>
          <View style={styles.formContainer}>
            <View style={dropDownStyle.dropDownView}>
              <TextInput
                placeholder={getLabel("ENTER_PIN")}
                placeholderTextColor={p.secondaryColor}
                style={styles.loginTextBox}
                value={pinCode}
                onChangeText={(value) => {
                  setPinCode(value);
                }}
                keyboardType="number-pad"
                maxLength={6}
              />
              {errorCode ? (
                <Text style={styles.errorMessage}>
                  {getLabel(errorCode) ? getLabel(errorCode) : errorCode}
                </Text>
              ) : null}
            </View>
            <View style={dropDownStyle.dropDownView}>
              <TextInput
                placeholder={getLabel("SELECT_REGION")}
                placeholderTextColor={p.disabledColorBack}
                style={styles.textDisabled}
                value={region}
                editable={false}
              />
            </View>
            <View style={dropDownStyle.dropDownView}>
              <TextInput
                placeholder={getLabel("SELECT_DiSTRICT")}
                placeholderTextColor={p.disabledColorBack}
                style={styles.textDisabled}
                value={district}
                editable={false}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={isDisable}
                style={
                  !isDisable
                    ? styles.modalSelectBtn
                    : styles.modalSelectBtnDisabled
                }
                onPress={handleSubmit}
              >
                <Text style={styles.modalSelectBtnTxt}>
                  {getLabel("SELECT")}
                </Text>
              </TouchableOpacity>
              {props.cancel ? (
                <TouchableOpacity
                  style={styles.modalSelectBtn}
                  onPress={() => {
                    props.cancel();
                  }}
                >
                  <Text style={styles.modalSelectBtnTxt}>
                    {getLabel("CANCEL")}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.65);
  z-index: 1;
`;

const styles = StyleSheet.create({
  errorMessage: {
    color: p.validationError,
    fontSize: fonts.primaryFontSize,
    fontStyle: "italic",
    fontWeight: "bold",
    alignSelf: "center",
    padding: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalHeadingText: {
    textAlign: "center",
    color: p.secondaryColor,
    fontWeight: "bold",
    paddingBottom: 20,
    fontSize: fonts.primaryHeadingFontSize,
  },
  loginTextBox: {
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: p.secondaryColor,
    height: 40,
    padding: 5,
    backgroundColor: p.logoColor,
    color: p.secondaryColor,
    shadowColor: p.secondaryColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  textDisabled: {
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: p.disabledColorBack,
    height: 40,
    padding: 5,
    backgroundColor: p.logoColor,
    color: p.disabledColorBack,
    shadowColor: p.disabledColorBack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  formContainer: {
    width: "100%",
    borderStyle: "dashed",
    borderWidth: 0,
    borderRadius: 10,
    paddingBottom: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  list: {
    width: "100%",
    height: 200,
  },
  selectModalHeader: {
    fontSize: fonts.primaryHeadingFontSize,
    marginBottom: 5,
    padding: 5,
    fontWeight: "bold",
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: p.transparentModalBack,
    borderRadius: 20,
    width: 350,
    padding: 35,
    alignItems: "center",
    shadowColor: p.secondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  deliveryContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    width: "100%",
  },
  storeContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    marginTop: 10,
    width: "100%",
  },
  modalSelectBtn: {
    width: "45%",
    height: 40,
    alignItems: "center",
    backgroundColor: p.secondaryColor,
    padding: 5,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
    shadowColor: p.secondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: "2.5%",
  },
  modalSelectBtnTxt: {
    color: p.logoColor,
    fontSize: fonts.modalButtonFontSize,
  },
  modalSelectBtnDisabled: {
    width: "45%",
    height: 40,
    alignItems: "center",
    backgroundColor: p.disabledColorBack,
    padding: 5,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
    shadowColor: p.secondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: "2.5%",
  },
  modalSelectBtnTxtDisabled: {
    color: p.primaryColor,
    fontSize: fonts.modalButtonFontSize,
  },
});

const dropDownStyle = StyleSheet.create({
  productChoosePicker: {
    height: 40,
    width: "100%",
  },
  dropDownView: {
    width: "80%",
    marginTop: 10,
  },
  dropDownSt: {
    backgroundColor: p.logoColor,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: p.secondaryColor,
  },

  cItemStyle: {
    justifyContent: "center",
    backgroundColor: p.logoColor,
  },
  selectedtLabelStyle: {
    color: p.secondaryColor,
  },
  labelStyle: {
    fontSize: fonts.primaryFontSize,
    textAlign: "left",
    color: p.secondaryColor,
  },
  styleOfDropdown: {
    backgroundColor: p.logoColor,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: p.secondaryColor,
  },
  placeholderStyle: { color: p.secondaryColor, fontWeight: "bold" },
  activeDStyle: { color: p.secondaryColor, fontWeight: "bold" },
});
