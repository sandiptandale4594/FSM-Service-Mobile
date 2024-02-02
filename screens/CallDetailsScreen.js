import React, { Fragment, useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { fonts } from '../styles/FontStyles';
import { AntDesign, Feather } from "@expo/vector-icons";
import { Checkbox, } from "react-native-paper";
import * as p from "../styles/primaryStyles";

const CallDetailsScreen = ({ navigation, route }) => {
    const { data } = route && route.params && route.params;
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.viewStyle} />
            <View style={styles.subViewStyle}>
                <View style={styles.subViewStyle1}>
                    <View style={styles.statusView}>
                        <Text style={styles.statusText}>{data?.complaintStatus}</Text>
                    </View>
                    <View style={styles.complaintView}>
                        <Text style={styles.complaintIdText}>Complaint Id: </Text>
                        <Text style={styles.complaintIdPropsText}>{data?.complaintId}</Text>
                    </View>
                    <View style={styles.calendarView}>
                        <AntDesign name="calendar" size={20} />
                        <Text style={styles.dateText}>{data?.complaintDate}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Customer Name</Text>
                        <Text style={styles.titleText1}>{data?.customerName}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Contact Name</Text>
                        <Text style={styles.titleText1}>{data?.contactName}</Text>
                    </View>
                    <View style={styles.itemView2}>
                        <View>
                            <Text style={styles.titleText}>Contact Mobile</Text>
                            <Text style={styles.titleText1}>{data?.contactMobile}</Text>
                        </View>
                        <TouchableOpacity style={styles.searchItemView}>
                            <Feather name="phone-call" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Model</Text>
                        <Text style={styles.titleText1}>{data?.model}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Description</Text>
                        <Text style={styles.titleText1}>{data?.description}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Equip Status</Text>
                        <Text style={styles.titleText1}>{data?.equipStatus}</Text>
                    </View>
                    <View style={styles.itemView2}>
                        <View>
                            <Text style={styles.titleText}>Equip Serial No.</Text>
                            <Text style={styles.titleText1}>{data?.equipSerialNo}</Text>
                        </View>
                        <TouchableOpacity style={styles.searchItemView}>
                            <AntDesign name="search1" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Call Status</Text>
                        <Text style={styles.titleText1}>{data?.callStatus}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Equip Loc Name</Text>
                        <Text style={styles.titleText1}>{data?.equipLocName}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Equip Loc District</Text>
                        <Text style={styles.titleText1}>{data?.equipLocDistrict}</Text>
                    </View>
                    <View style={styles.itemView2}>
                        <View>
                            <Text style={styles.titleText}>Work Order</Text>
                            <Text style={styles.titleText1}>{data?.workOrder}</Text>
                        </View>
                        <TouchableOpacity style={styles.searchItemView}>
                            <AntDesign name="search1" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.titleText}>Parts Required</Text>
                        <Checkbox
                            color={p.secondaryColor}
                            status={'unchecked'}
                        // status={termsAccepted ? "checked" : "unchecked"}
                        // onPress={() => setTermsAccepted(!termsAccepted)}
                        />
                    </View>
                    <View style={styles.managerMobileView} >
                        <Text style={styles.titleText}>Manager Mobile</Text>
                    </View>
                </ScrollView>
            </View >
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: "100%",
    },
    contentContainer: {
        marginBottom: 40
    },
    scrollViewStyle: {
        paddingBottom: 20,
        overflow: "scroll",
    },
    statusView: {
        backgroundColor: '#88B144',
        height: 50,
        borderRadius: 3,
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        padding: 5
    },
    statusText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'InterBold',
    },
    complaintView: {
        height: 50,
        flex: 6,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 2,
        padding: 5
    },
    complaintIdText: {
        color: 'black',
        fontSize: 14
    },
    complaintIdPropsText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'InterSemiBold',
    },
    calendarView: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 3.5,
        padding: 5
    },
    dateText: {
        fontFamily: 'InterBold',
        color: 'black',
        marginLeft: 5
    },
    viewStyle: {
        backgroundColor: p.logoColor,
        height: 120,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    searchItemView: {
        backgroundColor: p.logoColor,
        margin: 10,
        marginBottom: 0,
        padding: 10,
        borderRadius: 5
    },
    managerMobileView: {
        margin: 10,
        paddingBottom: 20,
    },
    subViewStyle: {
        marginTop: -100,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        marginBottom: 10
    },
    itemView: {
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        margin: 10,
        paddingBottom: 20,
    },
    subViewStyle1: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: '#d9d9d9'
    },
    itemView2: {
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        margin: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: fonts.primaryFontSize,
        fontFamily: 'InterMedium',
        color: 'gray'
    },
    titleText1: {
        fontFamily: 'InterBold',
        fontSize: fonts.mediumFontSize,
        color: 'black'
    },
})

export default CallDetailsScreen;
