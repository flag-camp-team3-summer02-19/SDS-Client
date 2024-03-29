/**
 * AJAX helper
 *
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param data - request payload data
 * @param successCallback - Successful callback function
 * @param errorCallback - Error callback function
 * @param isImage - True if this ajax call is used to fetch image file from server
 * @param header - array of extra key value pairs that should put in http request header
 * @param withCredentials - true if we send request to our backend
 */
export function ajax(method, url, data, successCallback, errorCallback, isImage, header, withCredentials=false) {
    var xhr = new XMLHttpRequest();
    if (isImage) {
        xhr.responseType = 'arraybuffer';
    }
    xhr.open(method, url, true);
    xhr.withCredentials = withCredentials;

    xhr.onload = function() {
        if (xhr.status === 200) {
            if(isImage) {
                successCallback(xhr.response);
            } else {successCallback(xhr.responseText);}
        } else {
            errorCallback();
        }
    };

    xhr.onerror = function() {
        console.error("The request couldn't be completed.");
        errorCallback();
    };

    if (header) {
        for (let i = 0; i < header.length; i++) {
            xhr.setRequestHeader(header[i][0], header[i][1]);
        }
    }

    if (data === null) {
        xhr.send();
    } else {
        xhr.setRequestHeader("Content-Type",
            "application/json;charset=utf-8");
        xhr.send(data);
    }
}

//replace the empty space in human readable address with '+'
//The return is used to construct a valid url to fetch static map from google
//https://developers.google.com/maps/documentation/maps-static/intro
export function convertAddressToUrl(address) {
    address = address.replace(/\s+,\s+/gi, ',');
    return address.replace(/\s+/gi, '+')
}

