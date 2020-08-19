function renderSocials(data) {
    // TODO: initial input validation
    let HTML = '';
    const size = data.length;
    for (let i = 0; i < size; i++) {
        const network = data[i];
        // TODO: data item validation
        HTML += `<a href="${network.link}" class="fa fa-${network.icon}" target="_blank"></a>`;
    }
    // TODO: draft output validation
    return HTML;
}

export { renderSocials };