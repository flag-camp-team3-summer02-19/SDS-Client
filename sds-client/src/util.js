/**
 * AJAX helper
 *
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param data - request payload data
 * @param successCallback - Successful callback function
 * @param errorCallback - Error callback function
 */
export function ajax(method, url, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            successCallback(xhr.responseText);
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