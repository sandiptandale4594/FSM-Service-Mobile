import React from 'react'
import { View, Modal, Image, StyleSheet } from 'react-native';
import { LOADING_SPINNER } from '../../assets/constant/imgConstant';
const LoadingModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={LOADING_SPINNER} />
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
    },
});


export default LoadingModal
