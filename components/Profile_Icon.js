import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/ProfileStyles';
import { PROFILE_IMG } from '../assets/constant/imgConstant';
export default function Cart(props) {
    return (
        <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileTouchable}>
                <Image resizeMode="contain"
                    source={PROFILE_IMG}
                    style={styles.profileIcon} />
            </TouchableOpacity>
        </View>
    );
}
