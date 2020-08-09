class Ajax {
    /**
     * Initiate connection to server for some JSON file downloading
     * @param {string} URL link to resource JSON file
     * @param {function} callback function to be called after succesful Ajax
     */
    constructor(URL, callback) {
        this.URL = URL;
        this.callback = callback;
    }
}

export { Ajax };