async function get_links_categorie(link, selecteur, attribute, locationOrigin = "") {
    function parseDOM(text, type = "text/html") {
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
    elements.forEach((element) => {
        tabResp.push(locationOrigin + element.getAttribute(attribute));
    });
    return tabResp;
}

let location = "https://global.kurtgeiger.com/new/bags"
let selecteur = 'a[href*="/women/accessories"] +div [data-hookid="globalHeaderSubMenuLinkList"] a:not([id*="all"])' // Secteur de categorie
let attributeSelecteur = "href"
locationOrigin = location.origin
let links = await get_links_categorie(location,selecteur , attributeSelecteur,locationOrigin)

