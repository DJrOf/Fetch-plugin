const jsdom = require("jsdom");

function run() {
  const request = {
    method: "GET",
    url: Host.inputString(),
  };
  // Check if the input is a URL
  if (Host.inputString().startsWith("http")) {
    return scrapeContent(request);
  } else {
    // Plain text, return directly
    return Host.inputString();
  }
}

function scrapeContent(url) {
  const { JSDOM } = jsdom;
  const texts = [];

  return new Promise((resolve, reject) => {
    JSDOM.fromURL(url, { runScripts: false })
      .then((dom) => {
        const document = dom.window.document;

        // Find text within article and paragraph tags
        document.querySelectorAll("article").forEach((tag) => {
          texts.push(...tag.textContent.split(/\s+/));
          tag.remove();
        });

        document.querySelectorAll("p").forEach((tag) => {
          texts.push(...tag.textContent.split(/\s+/));
          tag.remove();
        });

        resolve(texts.join(" "));
      })
      .catch((err) => reject(err));
  });
}

module.exports = { run };