import React, { useContext, } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
export default function BackButton(props) {
    const { store, dispatch } = useContext(UserContext);
    return (
        <TouchableOpacity style={styles.touchContainer}
            onPress={() => {
                //store?.loginNav?.goBack();
                props.nav.goBack()
            }}>
            <AntDesign name="arrowleft" size={25} color={'#000000'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchContainer: {
        marginLeft: 20,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
})
