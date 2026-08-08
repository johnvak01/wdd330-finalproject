export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
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



export class ExternalService {
  constructor(url) {
    this.url = url;
  }
  #convertToJson(res) {
    let result = res.json();
    console.log(result);
    if (res.ok) {
      return result;
    } else {
      throw { message: "Bad Response", status: res.status, statusText: result };
    };
  }
  async getData(URLextension = "", queryParams = "") {
    const response = await fetch(`${this.url + extension + queryParams}`);
    const data = await this.#convertToJson(response);

    return data.Result
  }
  
}