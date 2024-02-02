import { StyleSheet } from 'react-native';
import { secondaryColor, whiteBack, disabledColorBack, logoColor } from './primaryStyles';
import { primaryColor as pcolor } from './primaryStyles';
import { fonts } from './FontStyles';
import { Dimensions } from 'react-native';
const primaryColor = logoColor;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: "100%",
    },
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
    },
    splashViewLogo: {
        flex: 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashCompanyLogo: {
        width: 280,
        height: 60,
        padding: 0,
        marginBottom: 0,
        backgroundColor: pcolor,
    },
    splashVersionView: {
        flex: 2,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#000000',
        fontFamily: 'InterMedium',
        fontSize: fonts.primaryFontSize,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5
    },
    splashgvIcon: {
        alignSelf: 'center',
        width: 170,
        height: 80,
        marginLeft: 0,
        backgroundColor: 'transparent',
    },
    splashGainwellIcon: {
        alignSelf: 'center',
        width: 170,
        height: 40,
        marginLeft: 0,
        backgroundColor: 'transparent',
        marginTop: 20
    },
    // loginContainer: {
    //     flex: 8,
    //     alignItems: 'center',
    //     justifyContent: "center",
    //     flexDirection: 'column',
    //     marginTop: 0,
    //     paddingTop: 20,
    //     backgroundColor: pcolor,
    // },
    loginContainer: {
        backgroundColor: pcolor,
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    // loginTextBox: {
    //     width: 250,
    //     textAlign: "center",
    //     fontFamily: 'InterBold',
    //     borderWidth: 2,
    //     borderStyle: "solid",
    //     borderRadius: 5,
    //     borderColor: "#d9d9d9",
    //     height: 40,
    //     marginTop: 20,
    //     padding: 5,
    //     backgroundColor: 'transparent',
    //     color: secondaryColor,
    //     shadowColor: 'transparent',
    //     shadowOffset: {
    //         width: 0,
    //         height: 4,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 8,
    //     elevation: 6,
    // },
    loginTextBox: {
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        fontWeight: '800',
        fontSize: 22,
        marginTop: 20,
    },
    loginBtn: {
        height: 40,
        width: 130,
        color: primaryColor,
        textAlign: "center",
        padding: 5,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: secondaryColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginBtnDisabled: {
        height: 40,
        width: 130,
        color: primaryColor,
        textAlign: "center",
        padding: 5,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: secondaryColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnContainer: {
        marginTop: 40,
        padding: 5,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: secondaryColor,
        textTransform: 'uppercase',
        fontFamily: 'InterBold',
        fontSize: fonts.primaryHeadingFontSize,
    },
    gotoTextStyle: {
        color: '#000000',
        fontFamily: 'InterBold',
        fontSize: fonts.customerAppText,
        justifyContent: 'center',
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },

    companyLogo: {
        width: 200,
        height: 60,
        padding: 0,
        marginTop: 20,
        marginBottom: 0,
        backgroundColor: pcolor,
        shadowColor: secondaryColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    loginCompanyLogo: {
        width: 200,
        height: 60,
        padding: 0,
    },
    gainWellCustomLogo: {
        alignSelf: 'center',
        width: 125,
        height: 125,
        marginTop: -130,
        backgroundColor: pcolor,

    },
    loginTagLineTitleText: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'InterMedium',
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: 'white',
        height: '65%',
        width: 350,
        borderRadius: 10
    },
    loginVersionView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginCompanyView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginVersionText: {
        color: '#000000',
        fontFamily: 'InterMedium',
        fontSize: fonts.primaryFontSize,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5
    },
    gvIcon: {
        alignSelf: 'center',
        width: 170,
        height: 125,
        marginLeft: 0,
        marginTop: 40,
        marginBottom: 30,
        backgroundColor: pcolor,
        shadowColor: secondaryColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
});
export default styles;