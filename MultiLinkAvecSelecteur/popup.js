async function get_links_categorie(link, selecteur, attribute, locationOrigin = '') {
    function parseDOM(text, type = 'text/html') {
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, type);
        return doc;
    }

    async function get_resp(link) {
        let response = await fetch(link);
        if (response.ok) return await response.text();
        else throw new Error(`Failed to fetch: ${response.status}`);
    }

    let responseText = await get_resp(link);
    let doc = parseDOM(responseText);
    let elements = doc.querySelectorAll(`${selecteur}`);
    let tabResp = [];
    elements.forEach(element => {
        tabResp.push(locationOrigin + element.getAttribute(attribute));
    });
    return tabResp;
}

// Ajouter l'événement 'click' au bouton
document.getElementById('btn_go').addEventListener('click', async () => {
    let link = document.getElementById('site-link').value.trim();
    let locationOrigin = document.getElementById('origin-link').value.trim();
    let selecteur = document.getElementById('site-selecteur-categorie').value.trim();
    let resultDiv = document.getElementById('result');

    if (!link || !selecteur) {
        resultDiv.hidden = false;
        resultDiv.textContent = 'Please provide both the link and the selector.';
        return;
    }
    if (!locationOrigin)
        locationOrigin=""
    try {
        let links = await get_links_categorie(link, selecteur, 'href', locationOrigin);

        resultDiv.hidden = false;
        resultDiv.textContent = links.length ? 'Extracted links: \n' + links.join('<!LIST!>') : 'No links found with the provided selector.';
    } catch (error) {
        resultDiv.hidden = false;
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
