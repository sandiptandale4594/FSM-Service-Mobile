import React, { Fragment, useEffect, useState, useContext, useRef } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import CallsListItem from "../components/CallsListItem";
import * as p from "../styles/primaryStyles";
import { TextInput } from 'react-native-paper';
const CallsListScreen = ({ navigation, route }) => {
    //const { store, dispatch } = useContext(UserContext);

    let callsListArray = [
        {
            "customerName": "IISCO Burnpur (IM)",
            "contactName": "Mr.K.C.Mohanty",
            "contactMobile": "9051264522",
            "model": "973C-LDX00500",
            "description": "General Health Checkup",
            "motherCall": "0500570721",
            "status": "Resolved Feedback Awaited - Running",
            "complaintStatus": "RF",
            "complaintId": "12000746(S)",
            "complaintDate": "8 Jan 2024",
            "remarks": "",
            "equipStatus": "Running",
            "equipSerialNo": "LDX00504",
            "callStatus": "Allocated",
            "equipLocName": "--",
            "equipLocDistrict": "Asansol",
            "workOrder": "0100522606"
        },
        {
            "customerName": "IISCO Burnpur (IM)",
            "contactName": "Mr.K.C.Mohanty",
            "contactMobile": "9051264522",
            "model": "973C-LDX00500",
            "description": "General Health Checkup",
            "motherCall": "0500570721",
            "status": "Allocated - Running",
            "complaintStatus": "A",
            "complaintId": "500571771(S)",
            "complaintDate": "6 Jan 2024",
            "remarks": "",
            "equipStatus": "Running",
            "equipSerialNo": "LDX00504",
            "callStatus": "Allocated",
            "equipLocName": "--",
            "equipLocDistrict": "Asansol",
            "workOrder": "0100522606"
        },
        {
            "customerName": "IISCO Burnpur (IM)",
            "contactName": "Mr.N.Prasad",
            "contactMobile": "9051264522",
            "model": "973C-LDX00500",
            "description": "General Health Checkup",
            "motherCall": "0500570721",
            "status": "Allocated - Running",
            "complaintStatus": "A",
            "complaintId": "500571762(S)",
            "complaintDate": "5 Jan 2024",
            "remarks": "WA,WA",
            "equipStatus": "Running",
            "equipSerialNo": "LDX00504",
            "callStatus": "Allocated",
            "equipLocName": "--",
            "equipLocDistrict": "Asansol",
            "workOrder": "0100522606"
        },
        {
            "customerName": "Khan Trading Co.(RM)",
            "contactName": "Shubhashree",
            "contactMobile": "9832177172",
            "model": "2021D2.0GPNC-L3Z00929",
            "description": "Pump Leakage",
            "motherCall": "0500570721",
            "status": "Corrected Action Awaited - Running",
            "complaintStatus": "CA",
            "complaintId": "500571641(S)",
            "complaintDate": "7 Aug 2023",
            "remarks": "PS,PS",
            "equipStatus": "Running",
            "equipSerialNo": "LDX00504",
            "callStatus": "Allocated",
            "equipLocName": "--",
            "equipLocDistrict": "Asansol",
            "workOrder": "0100522606"
        }
    ]
    const flatList = useRef();

    const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.searchViewContainer}>
                    <TextInput
                        // label={localize.deliveryInformation.fullName}
                        // value={this.state.full_name}
                        maxLength={10}
                        //activeOutlineColor='#36384C'
                        //style={styles.loginTextBox}
                        style={styles.callListTextInput}
                        mode="outlined"
                        selectionColor="black"
                        theme={{
                            colors: { primary: '#d9d9d9', underlineColor: '#d9d9d9', },
                        }}
                        placeholder={'Search'}
                        //onChangeText={(val) => setNumber(val)}
                        keyboardType="number-pad"
                        ref={(input) => {
                            mobInput = input;
                        }}
                        left={
                            <TextInput.Icon style={{
                                paddingTop: 10,
                            }}
                                name="magnify"
                                color={'#000000'}
                                size={20}
                                onPress={() => {
                                }}
                            />
                        }
                    />

                    <View style={styles.filterRefreshView}>
                        <TouchableOpacity style={styles.touchIcon}>
                            <AntDesign name="filter" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchIcon}>
                            <MaterialIcons name="refresh" size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    ref={flatList}
                    data={callsListArray}
                    renderItem={({ item }) => <CallsListItem props={item} />}
                    contentContainerStyle={{ paddingBottom: 125 }}
                />
            </View>
            <TouchableOpacity onPress={moveToTop}
                style={styles.moveToTopTouchable} >
                <AntDesign name="up" size={20} color={p.logoColor} />
                <Text style={styles.backToTopText}>Back To Top</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%',
        paddingTop: 10
    },
    searchViewContainer: {
        flexDirection: 'row',
        height: 60,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    callListTextInput: {
        width: '70%',
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        fontFamily: 'InterRegular',
        backgroundColor: '#F4F4F4',
        fontSize: 16,
    },
    filterRefreshView: {
        flex: 3,
        flexDirection: 'row',
        height: 55,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchIcon: {
        backgroundColor: p.logoColor,
        height: 50,
        width: 50,
        margin: 2,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        marginHorizontal: 20,
        fontFamily: 'InterBold',
        fontSize: 20
    },
    lgContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        height: 100,
    },
    viewContainer1: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconStyle: {
        color: 'black',
        paddingTop: 5
    },
    emailText: {
        fontFamily: 'InterMedium',
        fontSize: 14,
        marginLeft: 5
    },
    moveToTopTouchable: {
        flex: 1,
        position: 'absolute',
        width: '40%',
        bottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        alignSelf: 'center'
    },
    backToTopText: {
        color: 'black',
        fontFamily: 'InterBold',
        fontSize: 12,
        marginLeft: 10
    }
});

export default CallsListScreen;
