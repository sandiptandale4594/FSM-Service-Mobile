import { API_MODE, NODE_API_PROD_BASE_URL, NODE_API_QA_BASE_URL } from "@env";
export const baseURL =
  API_MODE === "PROD" ? `${NODE_API_PROD_BASE_URL}` : `${NODE_API_QA_BASE_URL}`;
var ax = require("axios").default;
export const axios = ax.create({ baseURL: `${baseURL}` });
export const setAcceptUUIDNodeAPI = (acceptUUID) => {
  axios.defaults.headers.common["accept-uuid"] = acceptUUID;
};

export const getRegionDetails = async (
  user,
  setRegionDetails,
  setisLoading,
  errorCallBack,
  setLoggedIn
) => {
  setisLoading(1);
  url = "/get-regions";
  await axios
    .post(url)
    .then((response) => {
      setisLoading(0);
      if (response.data.success) {
        setRegionDetails(response.data.payload);
        setLoggedIn(true);
      } else {
        errorCallBack({ code: "REGION_FETCH_ERROR" });
      }
    })
    .catch((error) => {
      console.error("Region Error:", error.message);
      console.log("REGION API CALL FAILED", error);
      setisLoading(0);
      errorCallBack({ code: "REGION_FETCH_ERROR" });
    });
};

export const getNearestPlantAndDeliveryHub = (
  regionCode,
  pinCode,
  errorCallBack,
  setIsDisabled,
  dismissModal,
  setStoreAddress,
  setNearestDeliveryHub,
  cleanUp,
  customerCode = null
) => {
  const url = "/get-nearest-plant";
  setIsDisabled(true);
  let payload = {
    regionCode: regionCode,
    pinCode: pinCode,
    customerCode: customerCode,
  };
  console.log("get-nearest-plant==>", JSON.stringify(payload));
  axios
    .post(url, payload)
    .then((response) => {
      console.log(
        "get-nearest-plant Response==>",
        JSON.stringify(response.data)
      );
      setIsDisabled(false);
      if (response.data.success) {
        setStoreAddress(response.data.payload.NearestPlant);
        setNearestDeliveryHub(response.data.payload.NearestOrderHub);
        dismissModal();
        cleanUp();
      } else {
        errorCallBack({ code: "ERROR_NEAREST_PLANT_FETCH" });
      }
    })
    .catch((error) => {
      setIsDisabled(false);
      errorCallBack({ code: "ERROR_NEAREST_PLANT_FETCH" });
    });
};


export const checkIfEmployeeLogin = async (
  mobile_no,
  errorCallback,
  successCallback
) => {
  url = "/check-employee-mobile-number";
  let payload = {
    mobile_no: mobile_no,
  };
  console.log("Employee Mobile Verify API CALLED URL", baseURL);
  axios
    .post(url, payload)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
      console.log("error", error);
    });
};

export const verifyMobile = async (
  mobile_no,
  errorCallback,
  successCallback
) => {
  url = "/verify-mobile-number";
  let payload = {
    mobile: mobile_no,
  };
  console.log("Mobile Verify API CALLED URL", baseURL);
  axios
    .post(url, payload)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
      console.log("error", error);
    });
};

export const sendVerificationOtp = async (uuid, mobileNo) => {
  url = "/send-verification-otp";
  let payload = {
    uuid: uuid,
    mobile_no: mobileNo,
  };
  axios
    .post(url, payload)
    .then((response) => { })
    .catch((error) => {
      console.log(error);
    });
};

export const verifyMobileOTP = async (
  mobile_no,
  otp,
  uuid,
  errorCallback,
  successCallback
) => {
  url = "/verify-otp";
  let payload = {
    mobile_no: mobile_no,
    otp: otp,
    uuid: uuid,
  };
  axios
    .post(url, payload)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
      console.log("error", error);
    });
};
