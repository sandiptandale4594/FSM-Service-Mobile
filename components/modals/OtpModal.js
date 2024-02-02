import React,{useState} from 'react'
import { View, Text, Modal, Image, StyleSheet,TouchableOpacity ,TextInput} from 'react-native';
import { getLabel } from '../../languages/LanguageProcessor';
import * as p from '../../styles/primaryStyles';
import {otpValidate} from '../../utils/apiCaller';
import {fonts} from '../../styles/FontStyles'

const OtpModal = (props) => {
    const [otp, setotp] = useState('');
    let otpInput='';
    const validateOtp=()=>{
       const data =props.data;
        otpValidate(data.mobileNo,data.deviceId,
            otp,props.errorCallback,props.setisLoading,
            props.navigate);
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.OtpModalHeader}>{getLabel('OTP_VALIDATE_MODAL')}</Text>
                <TextInput placeholder={getLabel('ENTER_OTP')} placeholderTextColor={p.secondaryColor} style={styles.loginTextBox}
                    onChangeText={(value) => { setotp(value) }} keyboardType='number-pad' ref={input => { otpInput = input }} 
                    />
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.modalSelectBtn} onPress={()=>{props.dismiss()}}>
                            <Text style={styles.modalSelectBtnTxt}>{getLabel('EXIT')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalSelectBtn} onPress={()=>{validateOtp();}}>
                            <Text style={styles.modalSelectBtnTxt}>{getLabel('VALIDATE')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}




const styles = StyleSheet.create({
    OtpModalHeader:{
        padding:10,
        fontSize:fonts.primaryHeadingFontSize,
        fontWeight:'bold'
    },
    loginTextBox: {
        width: 250,
        textAlign: "center",
        borderWidth: 2,
        borderStyle: "solid",
        marginBottom:10,
        borderColor: p.secondaryColor,
        height: 40,
        padding: 5,
        backgroundColor: p.primaryColor,
        color: p.secondaryColor,
        shadowColor: p.secondaryColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,

    },
    buttonContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
        width:'100%'
    },
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
        backgroundColor: p.transparentModalBack,
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
        backgroundColor: p.secondaryColor,
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
        color: p.primaryColor,
        fontSize: fonts.modalButtonFontSize
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
    message:{
        color:p.secondaryColor, 
        fontSize:fonts.primaryFontSize, 
        fontWeight:'bold', 
        textAlign:'center'
    }

});


export default OtpModal
