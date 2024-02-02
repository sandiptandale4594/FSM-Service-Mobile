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
import { Ionicons } from "@expo/vector-icons";
const AuthorizedAlertModal = (props) => {
    return (
        <Modal animationType="fade" transparent={true} visible={props.visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Ionicons name="warning" size={60} color={'red'} />
                    <Text style={styles.alertTitle}>
                        Alert Message !!!
                    </Text>
                    <Text style={styles.message}>
                        You are not authorized to access this screen.Please contact the System Administrator
                    </Text>
                    <TouchableOpacity
                        style={styles.modalSelectBtn}
                        onPress={() => {
                            props.dismiss();
                        }}
                    >
                        <Text style={styles.modalSelectBtnTxt}>OK</Text>
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
        backgroundColor: 'white',
        borderRadius: 10,
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
        backgroundColor: p.logoColor,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20,
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
        color: p.secondaryColor,
        fontSize: 20,
        fontFamily: 'InterBold',
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
    alertTitle: {
        color: p.secondaryColor,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'InterBold',
    },
    message: {
        color: p.secondaryColor,
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'InterMedium',
        marginTop:20
    },
});

export default AuthorizedAlertModal;
