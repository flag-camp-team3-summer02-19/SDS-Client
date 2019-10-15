export const ShipStatus = { InProgress: 0, Finished : 1};
export const ShipMethod = {Mobile : 3, Drone : 4};

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
    {OrderId:'cdefghi3456',
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
export const MapApiKey = 'Google Map API';