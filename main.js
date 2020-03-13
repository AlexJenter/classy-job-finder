let head = arr => arr[0];

var getClassesFromPage = async url => {
  return await fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      var labels = doc.querySelectorAll(".label");

      return [...labels]
        .filter(x => x.innerText === "Fächer")[0]
        .nextSiblings()[0].innerText;
    })
    .catch(function(err) {
      console.warn("Something went wrong.", err);
    });
};

let [headerRow, ...rows] = $$("#search_result tr");

rows.map(async (row, i) => {
  var link = row.querySelector("a.nowrap").getAttribute("href");

  var classes = await getClassesFromPage(link);
  var container = row.querySelector("td:nth-child(3)");

  container.innerHTML += "<strong>Fächer</strong><br>";
  classes.split("/").map(str => (container.innerHTML += `${str}<br>`));
});
