import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getLabel } from "../../languages/LanguageProcessor";
import { fonts } from "../../styles/FontStyles";
import * as p from "../../styles/primaryStyles";

const AlertModal = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.message}>
            {getLabel(props.message) === undefined
              ? props.message
              : getLabel(props.message)}
          </Text>
          <TouchableOpacity
            style={styles.modalSelectBtn}
            onPress={() => {
              props.dismiss();
            }}
          >
            <Text style={styles.modalSelectBtnTxt}>{getLabel("EXIT")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0,0,0,0.4)",
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
    borderWidth: 0,
    borderRadius: 2,
    padding: 5,
    width: "100%",
  },
  storeContainer: {
    borderStyle: "dashed",
    borderWidth: 0,
    borderRadius: 2,
    padding: 5,
    marginTop: 10,
    width: "100%",
  },
  modalSelectBtn: {
    width: "60%",
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
    elevation: 5,
  },
  modalSelectBtnTxt: {
    color: p.primaryColor,
    fontSize: 20,
  },
  modalSelectBtnDisabled: {
    width: "60%",
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
    elevation: 5,
  },
  modalSelectBtnTxtDisabled: {
    color: p.primaryColor,
    fontSize: 20,
  },
  message: {
    color: p.secondaryColor,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AlertModal;
