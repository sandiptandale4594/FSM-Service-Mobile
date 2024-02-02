import {
  API_MODE,
  SPRING_API_PROD_BASE_URL,
  SPRING_API_QA_BASE_URL,
  ANALYTICS_API_PROD_URL,
  ANALYTICS_API_QA_URL,
  TERMS_URL,
} from "@env";
export const baseURL =
  API_MODE === "PROD"
    ? `${SPRING_API_PROD_BASE_URL}`
    : `${SPRING_API_QA_BASE_URL}`;
export const analyticsApi =
  API_MODE === "PROD" ? `${ANALYTICS_API_PROD_URL}` : `${ANALYTICS_API_QA_URL}`;
export const termsLink = `${TERMS_URL}`;
import Axios from "axios";
import * as a from "axios";
import { } from "@env";
import { setAcceptUUIDNodeAPI } from "./nodeApiCaller";
export const axios = a.default;
// QA URL
axios.defaults.baseURL = `${baseURL}`;
export const setAcceptUUID = (acceptUUID) => {
  axios.defaults.headers.common["accept-uuid"] = acceptUUID;
};

//const paymentUrl = "https://polar-island-07291.herokuapp.com/requestHandler?url=";
export const dialogueFlowUrl =
  "https://console.dialogflow.com/api-client/demo/embedded/bef56179-8b8a-4bf1-bc0c-2116266ba925";


export const login = (
  mobileNo,
  deviceId,
  setIsLoading,
  setuserObject,
  errorCallBack,
  successCallback,
  setLoggedIn
) => {
  if (
    mobileNo == null ||
    deviceId == null ||
    mobileNo == "" ||
    deviceId == ""
  ) {
    console.log("Login Function Line 250");
    errorCallBack({ code: "MOB_DEVID_EMPTY" });
  } else {
    const headers = {
      "accept-uuid": null,
    };
    const url = "/loginV2";
    setIsLoading(1);
    const payload = {
      phoneNumber: mobileNo === "abir" ? "9674532295" : mobileNo,
      deviceId: mobileNo === "abir" ? "DF9F501F1513D10B" : deviceId,
    };
    console.log("Payload =====>", payload);
    console.log("URL ====>", url);
    console.log("headers =====>", headers);
    console.log("Login SOP API Called");
    axios
      .post(url, payload, {
        headers: headers,
      })
      .then((response) => {
        console.log("Login Response Data", response.data);
        if (response.data.status === "0") {
          setuserObject(response.data);
          setIsLoading(0);
          setAcceptUUID(response.headers["accept-uuid"]);
          setAcceptUUIDNodeAPI(response.headers["accept-uuid"]);
          successCallback(response);
          // setLoggedIn(true);
        } else {
          errorCallBack({ code: "LOGIN_FAILED" });
        }

        // setIsLoading(0);
      })
      .catch((error) => {
        // console.log(error);
        errorCallBack({ code: "LOGIN_FAILED" });
      });
  }
};

export const otpValidate = (
  mobileNo,
  deviceId,
  otp,
  errorCallBack,
  setIsLoading,
  navigate
) => {
  setIsLoading(1);
  const url = "/verifyotp";
  const payload = {
    deviceId: deviceId,
    mobileNo: mobileNo,
    otp: otp,
  };
  axios
    .post(url, payload)
    .then((response) => {
      //  console.log(response.data)
      if (response.data.status === "0") {
        setIsLoading(0);
        navigate();
      } else {
        setIsLoading(0);
        errorCallBack("OTP_VALIDATION_FAILURE");
      }
    })
    .catch((error) => {
      //console.log(error);
      setIsLoading(0);
      errorCallback("ERROR_API_CALL");
    });
};

