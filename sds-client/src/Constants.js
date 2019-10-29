/* TODO: this Constant.js is for development purpose only,
*   we need to remove it after we finished the project. */

/*
* TODO: we don't want to expose the backend's endpoints to our clients.
*  Otherwise we need to consider whether our web server is secure, since
*  it can receive request from malicious users to change our database.
*
*  one solution: our server can use API KEY to authenticate us
*/

export const LOGIN_ENDPOINT = "http://localhost:1234/api/idm/login";
export const REGISTER_ENDPOINT = "http://localhost:1234/api/idm/register";
export const PACKAGEINFO_ENDPOINT = "https://google.com";
export const SELECTMETHOD_ENDPOINT = "https://google.com";

export const DEMO_GET_OK_ENDPOINT = "https://9e919392-f843-47c2-b9b5-58d14014c11a.mock.pstmn.io/userData";

export const ShipStatus = { OrderPlaced:0, InProgress: 1, Finished : 2};
export const ShipStatusMap = {0: "Order Placed", 1: "In Progress", 2: "Delivered"};
export const ShipMethod = {Mobile : 1, Drone : -1, Both : 0};
export const ShipMethodMap = {0: 'Drone', 1: 'Both', 2: 'Auto Mobile'};

export const FakeData = [
    {OrderId:'abcdefg1234',
        OrderNote: 'gift for dad',
        Status: ShipStatus.InProgress,
        CurrentLoc: '37.720015,-122.458905',
        FromAddress: '1398 Valencia St San Francisco, California(CA), 94110',
        ToAddress: '33 Shields St San Francisco, California(CA), 94132',
        ShipMethod: ShipMethod.Mobile,
        PackageInfo: '3x5x4, 2lbs',
    },
    {OrderId:'bcdefgh2345',
        OrderNote: 'gift for mom',
        Status: ShipStatus.Finished,
        CurrentLoc: '37.715342,-122.463503',
        FromAddress: '524 Gates St San Francisco, California(CA), 94110',
        ToAddress: '254 Bright St San Francisco, California(CA), 94132',
        ShipMethod: ShipMethod.Drone,
        PackageInfo: '4x3x5, 3lbs',
    },
    {OrderId:'cdefghi3456',
        OrderNote: 'gift for child',
        Status: ShipStatus.Finished,
        CurrentLoc: '37.761364,-122.503817',
        FromAddress: '450 Duboce Ave San Francisco, California(CA), 94117',
        ToAddress: '1354 44th Ave San Francisco, California(CA), 94122',
        ShipMethod: ShipMethod.Drone,
        PackageInfo: '4x5x5, 4lbs',
    },
    {OrderId:'defghij4567',
        OrderNote: 'gift for wife',
        Status: ShipStatus.InProgress,
        CurrentLoc: '37.797358,-122.441170',
        FromAddress: '2701 Green St San Francisco, California(CA), 94123',
        ToAddress: '1845 25th St San Francisco, California(CA), 94107',
        ShipMethod: ShipMethod.Mobile,
        PackageInfo: '6x5x5, 5lbs',
    }
];

//The sample structure of order:
// OrderId: String,
// OrderNote: String, // this is searchable
// Status: Constants.Status_InProgress // Constants.Status_Finished
// CurrentLoc: '37.750836,-122.423280' // a string with 'latitude,longitude' without empty space
// FromAddress: addressObj //use string here for simplicity
// ToAddress: addressObj
// ShipMethod: Constants.ShipMethod_Mobile, //ShipMethod_Drone
// PackageInfo: packageObj //use string here for simplicity

export const MapThumbnail_prefix = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap&markers=size:mid%7Ccolor:red%7C";
export const MapThumbnail_suffix = '&key=';
export const MapApiKey = "Google Map Api";
export const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${MapApiKey}&v=3.exp&libraries=geometry,drawing,places`;
// 'Google Map Api'
