import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  primaryColor,
  secondaryColor,
  whiteBack,
  disabledColorBack,
  logoColor,
} from "../../styles/primaryStyles";
import { verifyMobileOTP } from "../../utils/nodeApiCaller";
import { getLabel, getCurrentLanguage } from "../../languages/LanguageProcessor";

export default function OTPVerificationModal(props) {
  const [otp, setOTP] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOTPVerification = () => {
    // Implement your OTP verification logic here
    verifyMobileOTP(
      props.mData.mobile,
      otp,
      props.mData.uuid,
      (error) => {
        console.log("error", error);
      },
      async (data) => {
        console.log("datadatadatadata", data);
        if (data.status === "success") {
          setOTP("");
          setIsModalVisible(false);
          console.log("props.employeeLoginAttempt", props.employeeLoginAttempt);
          if (props.employeeLoginAttempt) {
            props.employeeSuccessCallback(props.mData.mobile);
          } else {
            props.successCallback();
          }
        } else {
          setOTP("");
          props.errorCallback();
        }
      }
    );
  };

  const resetModalVisible = () => {
    setIsModalVisible(false);
    props.closeModal();
  };

  useEffect(() => {
    if (otp?.length < 6) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [otp]);

  useEffect(() => {
    if (props?.visible) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
    }
  }, [props]);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              textAlign={'center'}
              placeholder="Enter OTP"
              onChangeText={(text) => setOTP(text)}
              value={otp}
              keyboardType="numeric"
              maxLength={6}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                disabled={isButtonDisabled}
                onPress={() => handleOTPVerification()}
                style={
                  !isButtonDisabled
                    ? styles.verifyBtn
                    : styles.verifyBtnDisabled
                }
              >
                <Text style={styles.verifyButtonText}>
                  {getLabel("VERIFY_BUTTON")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => resetModalVisible()}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelButtonText}>
                  {getLabel("CANCEL")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    height: 250,
  },
  input: {
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#d9d9d9",
    borderRadius: 5,
    padding: 10,
    width: 300,
    fontSize: 20,
    fontFamily: 'InterBold',
    color: secondaryColor
  },
  verifyBtn: {
    height: 40,
    width: '50%',
    color: primaryColor,
    textAlign: "center",
    padding: 5,
    backgroundColor: logoColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: logoColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyBtnDisabled: {
    height: 40,
    width: '50%',
    color: secondaryColor,
    textAlign: "center",
    padding: 5,
    backgroundColor: logoColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: logoColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyButtonText: {
    color: secondaryColor,
    textTransform: 'uppercase',
    fontFamily: 'InterBold',
    fontSize: 16
  },
  cancelBtn: {
    height: 40,
    color: primaryColor,
    textAlign: "center",
    padding: 5,
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButtonText: {
    color: secondaryColor,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontFamily: 'InterBold',
    fontSize: 16
  },
});
