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
  async #convertToJson(res) {
    let result = res.json();
    if (res.ok) {
      return result;
    } else {
      throw { message: "Bad Response", status: res.status, statusText: result };
    };
  }
  async getData(methodType = "GET", URLextension = "", queryParams = "", header = {}) {
    const options = {
      method: methodType,
      headers: header
    };
    const finalURL = this.url + URLextension + queryParams;
    let response = await fetch(finalURL, options)
    let data = await this.#convertToJson(response);

    // console.log("response", response);
    // console.log("data", data);
    return data;
    // response.then(res => res.json())
    //   .then(res => console.log("response", res))
    //   .then(data => {return data})
    //   .catch(err => console.error(err.message));
    // const data = await this.#convertToJson(response);

    // return data.Result

  };
}

export async function getSha1Hash(message) {
  // Encode string as UTF-8 Uint8Array
  const msgBuffer = new TextEncoder().encode(message);                    

  // Hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);

  // Convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));              

  // Convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}