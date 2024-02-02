import React, { useCallback, useContext, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../styles/FontStyles';
import UserContext from "../contexts/UserContext";
import AuthorizedAlertModal from './modals/AuthorizedAlertModal';
const ServiceItem = ({ props }) => {
    const { store } = useContext(UserContext);
    const [authorizePopup, setAuthorizePopup] = useState(false);
    return (
        <View>
            <AuthorizedAlertModal
                visible={authorizePopup}
                message={"BACK_CONFIRMATION"}
                exit={() => {
                    setAuthorizePopup(false);
                }}
                dismiss={() => {
                    setAuthorizePopup(false);
                }}
            />
            <TouchableOpacity style={[serviceStyle.mainContainer]}
                onPress={() => {
                    if (props?.serviceName !== 'Calls') {
                        setAuthorizePopup(true);
                    } else {
                        store.postLoginNav.navigate("CallsListScreen");
                    }
                }}>
                <View style={serviceStyle.itemView}>
                    <Image resizeMode='contain' source={props.serviceIcon} style={[serviceStyle.itemImage, { tintColor: props.serviceStatus == 'Active' ? 'black' : 'gray' }]} />
                </View>
                <Text numberOfLines={2} style={[serviceStyle.itemText, { color: props.serviceStatus == 'Active' ? 'black' : 'gray' }]}>{props.serviceName}</Text>
            </TouchableOpacity>
        </View>
    )
}
const serviceStyle = StyleSheet.create({
    mainContainer: {
        height: 120,
        width: 120,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

    },
    itemView: {
        backgroundColor: '#ffc50c',
        borderRadius: 70 / 2,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        height: '50%',
        width: '50%',
        tintColor: 'black',
    },
    itemText: {
        fontFamily: 'InterBold',
        fontSize: fonts.serviceText,
        justifyContent: 'center',
        textAlign: "center",
        marginHorizontal: 5
    }
})

export default ServiceItem;
