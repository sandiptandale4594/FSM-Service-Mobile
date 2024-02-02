import { StyleSheet } from 'react-native';
import * as p from './primaryStyles';
import { fonts } from './FontStyles';


const styles = StyleSheet.create(
    {
        languageChange: {
            flexDirection: 'row',
            width: '60%',
            marginLeft: '20%',
            alignSelf: 'baseline',
            backgroundColor: p.logoColor,
            flex: 1,
            //height:'20%'
        },
        sidemenu: {
            flex: 4,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: p.logoColor,
            overflow: 'scroll'
        },

        drawerContent: {
            //height:'80%',
            flex: 9,
            backgroundColor: "#1d1d1f",
        },
        drawerViewContainer: {
            marginLeft: 10,
            marginTop: 50,
            marginBottom: 20
        },
        drawerImage: {
            height: 50,
            width: 50,
        },
        textUser: {
            fontFamily: 'InterBold',
            fontSize: 20,
            color: 'white'
        },
        profileView: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        profileIconView: {
            color: '#636363',
            paddingTop: 5
        },
        profileEmailText: {
            fontFamily: 'InterSemiBold',
            fontSize: 12,
            marginLeft: 5,
            color: '#636363'
        },
        settingMainView: {
            flexDirection: 'row',
            marginVertical: 2,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#272728',
            padding: 10
        },
        itemText: {
            fontFamily: 'InterSemiBold',
            fontSize: 16,
            marginLeft: 10,
            color: 'white'
        },
        itemArrow: {
            color: 'white',
            paddingTop: 5,
            marginRight: 10
        },
        editProfileMainView: {
            flexDirection: 'row',
            marginVertical: 2,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#272728',
            padding: 10
        },
        editProfileView: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        editProfileIcon: {
            color: 'white',
            paddingTop: 5
        },
        editProfileText: {
            fontFamily: 'InterSemiBold',
            fontSize: 16,
            marginLeft: 10,
            color: 'white'
        },
        logOutViewContainer: {
            flexDirection: 'row',
            marginTop: 2,
            marginBottom: 10,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#272728',
            paddingVertical: 10,
            paddingLeft: 10,
            borderRadius:10
        },
        logOutView: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        logoutText: {
            fontFamily: 'InterSemiBold',
            fontSize: 16,
            marginLeft: 10,
            color: 'white'
        },
        logoutImageView: {
            height: 30,
            width: 30,
            marginRight: 10
        },
        settingView: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        item: {
            color: '#636363',
            fontSize: fonts.menuIconFontSize,
            marginRight: -22
        },
        itemContainer: {
            backgroundColor: '#1D1D1F',
        },
        labelStyle: {
            color: '#666666',
            fontSize: fonts.primaryFontSize,
            fontFamily: 'InterRegular',
        },
        logoutContainer: {
            padding: 10,
            alignItems: 'center'

        },
        input: {
            borderRadius: 5,
            width: 150,
            fontSize: 16,
            fontFamily: 'InterBold',
            color: "white",
            backgroundColor: '#272728',
        },
        callsMainView: {
            flexDirection: 'row',
            marginTop: 2,
            marginBottom: 10,
            justifyContent: 'space-between',
            marginHorizontal: 10,
            backgroundColor: '#1D1D1F',
            paddingVertical: 10,
            paddingLeft: 10
        },
        callLeftView: { flex: 8, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
        callsRightView: {
            backgroundColor: '#272728', justifyContent: 'center', alignItems: 'center',
            height: 30, width: 30, borderRadius: 30 / 2
        },
    }
);

export default styles;