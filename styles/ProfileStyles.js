import { StyleSheet } from 'react-native';

const style = StyleSheet.create(
    {
        profileTouchable: {
            padding: 2,
            marginRight: 20,
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center'
        },
        profileIcon: {
            height: 40,
            width: 40
        },
        profileContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
    }
);
export default style;