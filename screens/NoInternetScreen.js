import React from 'react'
import { SafeAreaView, Text, Image, } from 'react-native'
import styles from '../styles/LoginStyle';
import { LOGO, GV_ICON } from '../assets/constant/imgConstant';
function NoInternetScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.loginContainer}>
            <Image
                style={styles.companyLogo}
                resizeMode='contain'
                source={LOGO}
            />
            <Image
                style={styles.gvIcon}
                resizeMode='contain'
                source={GV_ICON}
            />
            <Text>No internet connection</Text>
            <Text>Please check your internet connection and try again.</Text>
        </SafeAreaView>
    )
}

export default NoInternetScreen
