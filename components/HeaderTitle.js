import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { HEADER_IMAGE } from '../assets/constant/imgConstant';
export default function HeaderTitle(props) {
    return (
        <View style={styles.headerContainer}>
            <Image source={HEADER_IMAGE} resizeMode="cover"
                style={styles.headerImage} />
        </View>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 40,
        borderRadius: 5,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerImage: {
        height: '100%',
        padding: 0,
        marginBottom: 0,
        borderRadius: 5,
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    }
})