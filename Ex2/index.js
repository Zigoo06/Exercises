const selectA = document.getElementById("selectA");
const selectB = document.getElementById("selectB");
const selectC = document.getElementById("selectC");
selectA.addEventListener("change", filterLists);
selectB.addEventListener("change", filterLists);
selectC.addEventListener("change", filterLists);
var optionsA;
var optionsB;
var optionsC;
const defaultSelection = "Toate";

var rows = getListFromFile("./data.txt");
filterLists();

function getListFromFile(file) {
  //try to replace with fetch
  var allText = null;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  var arrayOfRows = splitTextIntoArrays(allText);
  return arrayOfRows;
}

function splitTextIntoArrays(text) {
  var lines = text.split("\r\n");

  var arrayOfRows = [];
  lines.forEach((element) => {
    var items = element.split(",");
    arrayOfRows.push(items);
  });

  return arrayOfRows;
}

function filterLists() {
  var newList;
  if (selectA.value != defaultSelection) {
    newList = rows.filter((list) => {
      return selectA.value === "" || list[0] === selectA.value;
    });
  }
  if (selectB.value != defaultSelection) {
    newList = rows.filter((list) => {
      return selectB.value === "" || list[1] === selectB.value;
    });
  }
  if (selectC.value != defaultSelection) {
    newList = rows.filter((list) => {
      return selectC.value === "" || list[2] === selectC.value;
    });
  }
  updateSelects(newList);
  generateLists(newList);
}

function generateLists(arrayOfData) {
  const list = document.getElementById("data-list");
  list.innerHTML = "";
  arrayOfData.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    list.appendChild(li);
  });
}

function updateSelects(elements) {
  optionsA = [...new Set(elements.map((list) => list[0]))];
  optionsB = [...new Set(elements.map((list) => list[1]))];
  optionsC = [...new Set(elements.map((list) => list[2]))];
  uptadeSelectOptions("selectA", optionsA);
  uptadeSelectOptions("selectB", optionsB);
  uptadeSelectOptions("selectC", optionsC);
}

function uptadeSelectOptions(id, list) {
  var select = document.getElementById(id);
  select.innerHTML = "";
  if (list.length >= 2) {
    const option = document.createElement("option");
    option.value = defaultSelection;
    option.textContent = defaultSelection;
    select.appendChild(option);
  }

  list.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    select.appendChild(option);
  });

  select.selectedIndex = "0";
}

function resetFilters() {
  selectA.value = defaultSelection;
  selectB.value = defaultSelection;
  selectC.value = defaultSelection;
  filterLists();
}
