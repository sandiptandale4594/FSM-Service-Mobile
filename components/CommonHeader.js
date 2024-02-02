import React, { useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { HEADER_IMAGE } from '../assets/constant/imgConstant';
export default function CommonHeaderTitle({ title }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'InterBold',
    }
})