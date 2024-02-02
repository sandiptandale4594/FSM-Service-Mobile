import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { fonts } from '../styles/FontStyles';
import UserContext from '../contexts/UserContext';
import { getCurrentLanguage } from '../languages/LanguageProcessor';
import ACTION from '../contexts/action';
import { RadioButton } from 'react-native-paper';

function LanguageChangeView({ applyStyle }) {
    const [lang, setlang] = useState((getCurrentLanguage() === 'हिन्दी' ? 'hn' : 'en'));
    const { store, dispatch } = useContext(UserContext);
    useEffect(() => {
        dispatch({
            type: ACTION.LANGUAGE_CHANGE,
            payload: {
                language: lang
            }
        })
    }, [lang]);

    const switchLanguage = (l) => {
        setlang(l)
    }
    return (
        <View style={styles.mainContainer} >
            <View style={styles.viewContainer}>
                <RadioButton
                    value="hn"
                    color={getCurrentLanguage() === 'हिन्दी' ? '#000000' : '#ffffff'}
                    status={getCurrentLanguage() === 'हिन्दी' ? 'checked' : 'unchecked'}
                    onPress={() => switchLanguage('hn')}
                    style={{}}
                />
                <Text style={{ fontSize: fonts.primaryFontSize }}>
                    हिन्दी</Text></View>
            <View style={styles.view1Container}>
                <RadioButton
                    value="en"
                    color={getCurrentLanguage() === 'English' ? '#000000' : '#ffffff'}
                    status={getCurrentLanguage() === 'English' ? 'checked' : 'unchecked'}
                    onPress={() => switchLanguage('en')}
                    style={{}}
                />
                <Text style={{ fontSize: fonts.primaryFontSize }}>
                    English</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        width: "60%",
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainer: {
        flexDirection: "row",
        width: "50%",
        marginLeft: 40,
        alignItems: 'center'
    },
    view1Container: {
        flexDirection: "row",
        width: "50%",
        alignItems: 'center'
    }
})
export default LanguageChangeView
