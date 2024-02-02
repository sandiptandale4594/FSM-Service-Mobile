import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
} from "react-native";
import styles from "../styles/LoginStyle";
import { getLabel } from "../languages/LanguageProcessor";
import { LinearGradient } from 'expo-linear-gradient';
import * as AppJSON from "../app.json";
import { API_MODE } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { LOGO, SPLASH_LOGO, SPLASH_VANIJYA_LOGO } from '../assets/constant/imgConstant';
function SplashScreen({ navigation }) {
    const appVersion = AppJSON.expo.version;
    const appMode = API_MODE === "PROD" ? "" : "Q";

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 3000)
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient
                colors={['#ffffff', '#ffc50c']}
                style={styles.splashContainer}>
                <View style={styles.splashViewLogo}>
                    <Image
                        style={styles.splashCompanyLogo}
                        resizeMode="stretch"
                        source={LOGO}
                    />
                    <Text style={styles.textStyle}>
                        {getLabel("LOGIN_PAGE_TAG_LINE")}
                    </Text>
                </View>
                <View style={[styles.splashViewLogo, { justifyContent: 'flex-start', }]}>
                    <Image
                        style={styles.splashGainwellIcon}
                        resizeMode='contain'
                        source={SPLASH_VANIJYA_LOGO}
                    />
                    <Image
                        style={styles.splashgvIcon}
                        resizeMode='contain'
                        source={SPLASH_LOGO}
                    />
                </View>
                <View style={styles.splashVersionView}>
                    <Text style={styles.textStyle}>
                        Version : {appVersion} {appMode}
                    </Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

export default SplashScreen;
