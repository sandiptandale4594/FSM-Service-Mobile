import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../styles/FontStyles';
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
const CallsListItem = ({ props }) => {
    const { store } = useContext(UserContext);
    return (
        <TouchableOpacity style={callsItemStyle.mainContainer}
            onPress={() => {
                store.postLoginNav.navigate("CallDetailsScreen", { data: props });
            }}>
            <View style={callsItemStyle.subMainContainer}>
                <View style={[{ flex: 1, backgroundColor: '#88B144' }, callsItemStyle.viewContainer]}>
                    <Text style={[callsItemStyle.itemText1, { color: 'white' }]}>{props.complaintStatus}</Text>
                </View>
                <View style={[{ flex: 5.5, backgroundColor: '#2B2B2B' }, callsItemStyle.viewContainer]}>
                    <Text style={[callsItemStyle.itemText1, { color: 'white', fontSize: 12 }]}>Complaint Id : {props.complaintId}</Text>
                </View>
                <View style={callsItemStyle.itemDateMainView}>
                    <AntDesign name="calendar" size={20} />
                    <Text style={[callsItemStyle.itemText, { fontFamily: 'InterBold', color: 'black' }]}>{props.complaintDate}</Text>
                </View>
            </View>
            <View style={callsItemStyle.callsItemView}>
                <View style={callsItemStyle.callItemLeftView}>
                    <Text style={callsItemStyle.itemText}>Customer Name</Text>
                    <Text style={callsItemStyle.itemText}>Contact Name</Text>
                    <Text style={callsItemStyle.itemText}>Contact Mobile</Text>
                    <Text style={callsItemStyle.itemText}>Model</Text>
                    <Text style={callsItemStyle.itemText}>Description</Text>
                    <Text style={callsItemStyle.itemText}>Mother Call</Text>
                    <Text style={callsItemStyle.itemText}>Remarks</Text>
                    <Text numberOfLines={2} style={callsItemStyle.itemText}>Status</Text>
                </View>
                <View style={callsItemStyle.callItemRightView}>
                    <Text style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.customerName}</Text>
                    <Text style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.contactName}</Text>
                    <Text style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.contactMobile}</Text>
                    <Text style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.model}</Text>
                    <Text style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.description}</Text>
                    <Text numberOfLines={2} style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.motherCall}</Text>
                    <Text numberOfLines={2} style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.remarks}</Text>
                    <Text numberOfLines={2} style={[callsItemStyle.itemText, { color: '#000000' }]}>: {props.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const callsItemStyle = StyleSheet.create({
    mainContainer: {
        // height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    callsItemView: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10
    },
    callItemLeftView: {
        flexDirection: 'column',
        flex: 4
    },
    callItemRightView: {
        flexDirection: 'column',
        flex: 6,
        paddingRight: 10
    },
    subMainContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        height: 30,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        padding: 5
    },
    itemDateMainView: {
        flex: 3.5,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5
    },
    itemText1: {
        fontFamily: 'InterMedium',
        fontSize: fonts.primaryFontSize,
    },
    itemText: {
        fontFamily: 'InterMedium',
        fontSize: fonts.primaryFontSize,
        justifyContent: 'flex-start',
        textAlign: "left",
        marginHorizontal: 5,
        color: 'gray'
    }
})

export default CallsListItem;
