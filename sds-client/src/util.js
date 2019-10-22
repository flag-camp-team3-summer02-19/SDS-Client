/**
 * AJAX helper
 *
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param data - request payload data
 * @param successCallback - Successful callback function
 * @param errorCallback - Error callback function
 * @param isImage - True if this ajax call is used to fetch image file from server
 */
export function ajax(method, url, data, successCallback, errorCallback, isImage) {
    var xhr = new XMLHttpRequest();
    if (isImage) {
        xhr.responseType = 'arraybuffer';
    }
    xhr.open(method, url, true);

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

