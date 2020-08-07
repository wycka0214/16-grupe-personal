class Services {
    /**
     * Constructor for Services object
     * @param {string} selector CSS-like selector for finding location for new content rendering
     * @param {Array} data list of objects that defines each service
     */
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;
    }

    render() {
        console.log('Rendering services...');
    }
}

export { Services };