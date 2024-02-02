import React from 'react'
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { getLabel } from '../../languages/LanguageProcessor';
import { fonts } from '../../styles/FontStyles';
import * as p from '../../styles/primaryStyles';

const BackPopupModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.message}>{props.message}</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.modalSelectBtn} onPress={() => { props.exit() }}>
                            <Text style={styles.modalSelectBtnTxt}>{getLabel('LOGOUT')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalSelectBtn} onPress={() => { props.dismiss() }}>
                            <Text style={styles.modalSelectBtnTxt}>{getLabel('CANCEL')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}




const styles = StyleSheet.create({
    list: {
        width: "100%",
        height: 200,
    },
    selectModalHeader: {
        fontSize: fonts.primaryHeadingFontSize,
        marginBottom: 5,
        padding: 5,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'

    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 350,
        padding: 35,
        alignItems: "center",
        shadowColor: p.secondaryColor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    deliveryContainer: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 2,
        padding: 5,
        width: '100%',

    },
    storeContainer: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 2,
        padding: 5,
        marginTop: 10,
        width: '100%',

    },
    modalSelectBtn: {
        width: '40%',
        height: 40,
        alignItems: 'center',
        backgroundColor: p.logoColor,
        padding: 5,
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
        shadowColor: p.secondaryColor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5


    },
    modalSelectBtnTxt: {
        color: p.secondaryColor,
        fontSize: fonts.modalButtonFontSize,
        fontFamily: 'InterMedium',
    },
    modalSelectBtnDisabled: {
        width: '60%',
        height: 40,
        alignItems: 'center',
        backgroundColor: p.disabledColorBack,
        padding: 5,
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
        shadowColor: p.secondaryColor,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5


    },
    modalSelectBtnTxtDisabled: {
        color: p.primaryColor,
        fontSize: fonts.modalButtonFontSize
    },
    message: {
        color: p.secondaryColor,
        fontSize: fonts.customerAppText,
        fontFamily: 'InterBold',
        textAlign: 'center',
        marginBottom: 10
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

});


export default BackPopupModal
