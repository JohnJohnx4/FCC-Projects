const wikiURL =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";

let searched = false;
let prevStr;

const searchResults = items => {
  if (!items) {
    console.log("no items");
    let resContainer = document.getElementById("wikiResultsRoot");
    while (resContainer.hasChildNodes()) {
      resContainer.removeChild(resContainer.firstChild);
    }
    var pageContainer = document.createElement("div");
    pageContainer.appendChild(document.createTextNode("No Results Found"));
    resContainer.appendChild(pageContainer);
    return;
  }
  let resContainer = document.getElementById("wikiResultsRoot");

  while (resContainer.hasChildNodes()) {
    resContainer.removeChild(resContainer.firstChild);
  }
  // for each item in array
  items.forEach(page => {
    if (document.getElementById(page.pageid)) {
      console.log("id found");
      return;
    }
    console.log("Page contains: ", page);
    // make container for all of page result
    var pageContainer = document.createElement("div");
    // give it an id
    pageContainer.id = page.pageid;
    // make divs for the title, extract and pagelink
    var pageTitle = document.createElement("div");
    var pageExtract = document.createElement("div");
    var pageLinkContainer = document.createElement("div");
    var pageLink = document.createElement("a");
    // give each a class
    pageContainer.className = "search__container"
    pageTitle.className = "search__title"
    pageExtract.className = "search__extract"
    pageLink.className = "search__link__button"
    pageLinkContainer.className = "search__link"
    // give each an id
    pageTitle.id = "title" + page.pageid;
    pageExtract.id = "extract" + page.pageid;
    pageLinkContainer.id = "link" + page.pageid;
    // diplay the data
    pageTitle.appendChild(document.createTextNode(page.title));
    pageExtract.appendChild(document.createTextNode(page.extract));
    pageLink.href = "https://en.wikipedia.org/?curid=" + page.pageid;
    pageLink.appendChild(document.createTextNode("Visit Wiki"));
    pageLinkContainer.appendChild(pageLink);
    // append all the children to the parent container
    pageContainer.appendChild(pageTitle);
    pageContainer.appendChild(pageExtract);
    pageContainer.appendChild(pageLinkContainer);
    // append to the root
    resContainer.appendChild(pageContainer);
  });
  // render out div
  // in div, render out results
};

const handleSearchSubmit = () => {
  let searchString = document.getElementById("wikiSearchField").value;
  if (!searchString) return console.log("Must type in search term");
  if (prevStr === searchString && searched === true)
    return console.log("query not changed");
  const url =
    wikiURL +
    searchString
      .trim()
      .split(" ")
      .join("+");
  console.log("Url will be", url);
  axios
    .get(url)
    .then(res => {
      if (!res.data.query) return searchResults(null);
      console.log("get success", res.data.query.pages);
      let results = Object.values(res.data.query.pages);
      console.log("Results array: ", results);
      searchResults(results);
    })
    .catch(err => {
      console.log(err);
    });
  prevStr = searchString;
  searched = true;
};

document.getElementById("wikiSearchButton").addEventListener("click", e => {
  e.preventDefault();
  handleSearchSubmit();
  console.log("Button Clicked!");
});
