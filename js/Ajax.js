/**
 * Function for data requesting from project server
 * @param {string} dataURL JSON file name to be requested from server's data folder
 */
function ajax(dataURL) {
    const URL = 'https://front-end-by-rimantas.github.io/16-grupe-personal/data/' + dataURL;

    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", URL);
        xhttp.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhttp.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });
            }
        };
        xhttp.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };
        xhttp.send();
    });
}

export { ajax };