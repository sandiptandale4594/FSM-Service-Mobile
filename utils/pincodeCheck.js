var ax = require('axios').default;

export const axios = ax.create({baseURL:'https://api.postalpincode.in'})
export const pincodeCheck=async (pinCode,setRegion,setDistrict,setErrorCode)=>{
    let url = '/pincode/'+pinCode
    const response = await axios.get(url);
    let responsePayload=response.data;
  //  console.log('response:'+JSON.stringify(responsePayload))
    if(responsePayload.length>0 &&  responsePayload[0].Status==='Success' && responsePayload[0].PostOffice.length>0){
        setRegion(responsePayload[0].PostOffice[0].State);
        setDistrict(responsePayload[0].PostOffice[0].District)
        setErrorCode(null);
    }else{
        setErrorCode('PINCODE_ERROR');
    }
}