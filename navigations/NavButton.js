import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MENU_IMG } from '../assets/constant/imgConstant';
export default function NavButton(props) {
    return (
        <TouchableOpacity style={styles.touchContainer}
            onPress={() => { props.nav.openDrawer() }}>
            <Image source={MENU_IMG} resizeMode='contain'
                style={styles.imageContainer} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchContainer: {
        marginLeft: 20,
        height: 60,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: '100%',
        width: '100%',

    }
})
