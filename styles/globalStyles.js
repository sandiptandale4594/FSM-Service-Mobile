import {StyleSheet} from 'react-native';
import * as p from './primaryStyles';
import {fonts} from './FontStyles';

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      backgroundColor: p.whiteBack,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight:'100%'
    },
    text:{
      fontFamily:'InterRegular',
      fontSize: fonts.menuIconFontSize
    },
    navMenu:{
      padding:10, 
      color: p.secondaryColor
    }, 
    productListContainer:{
      width:'100%',
      overflow:'scroll',
      flex:3, 
      minHeight:'100%'
    },
    listContainer:{
      width:'100%',
      flexDirection:'column', 
      overflow: 'scroll',
      marginTop:10, 
      height:'100%', 
      paddingBottom:80,
      zIndex:999
    },
    offerSlide:{
      flex:1,
      height:'100%',
      position:'absolute'
    },
    navHeader:{
      backgroundColor:p.primaryColor,
      color:p.secondaryColor,
      shadowColor: p.secondaryColor,
      shadowOffset: {
        width: 20,
        height: 5,
      },
      shadowOpacity: 0.60,
      shadowRadius: 4.65,

      elevation: 6,
    },
    navHeaderTitle:{
      color:p.secondaryColor
    }, 
    pageScrollView:{
      height:'100%',
     
    }, 
    productContainerView:{
      minHeight:400,
      paddingBottom:20,
    },
    chatIcon:{
      color:p.whiteBack,
      alignSelf:'center'
    },
    chatView:{
      position: 'absolute',
      bottom:0,
      left:0,
      padding:10,
      backgroundColor:p.secondaryColor,
      borderRadius:30, 
      width:60,
      height:60, 
      shadowColor: p.secondaryColor,
      shadowOffset: {
        width: 20,
        height: 10,
      },
      shadowOpacity: 0.60,
      shadowRadius: 4.65,
     

    },
    chatText:{
      color:'white',
      textAlign:'center',
      alignSelf:'center'
    },
    box: {
      position: 'absolute',
      bottom:0,
      right:0,
      padding:10,
      backgroundColor:p.secondaryColor,
      borderRadius:30, 
      width:60,
      height:60, 
      shadowColor: p.secondaryColor,
      shadowOffset: {
        width: 20,
        height: 10,
      },
      shadowOpacity: 0.60,
      shadowRadius: 4.65,
     zIndex:2
    }

  });
  export default styles;