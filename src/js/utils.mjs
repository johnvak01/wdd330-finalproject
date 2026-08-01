export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export function renderWithTemplate(template, parentElement, data, callback){
    parentElement.innerHTML = template;
    if (callback) {  
      callback(data);
    }
  }

export async function loadHeaderFooter() {
    const headerElement = document.querySelector("header");
    const headerTemplate = await loadTemplate("../partials/header.html");

    const footerElement = document.querySelector("footer");
    const footerTemplate = await loadTemplate("../partials/footer.html");


    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
} 