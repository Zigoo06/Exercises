const selectA = document.getElementById("selectA");
const selectB = document.getElementById("selectB");
const selectC = document.getElementById("selectC");
selectA.addEventListener("change", filterLists);
selectB.addEventListener("change", filterLists);
selectC.addEventListener("change", filterLists);
var optionsA;
var optionsB;
var optionsC;
const defaultSelect = "Toate";

var textFromFile = readFromFile("./data.txt");
rows = readElements(textFromFile);
filterLists();

function readFromFile(file) {
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

  return allText;
}

function readElements(text) {
  var lines = text.split("\r\n");

  var arrayOfRows = [];
  lines.forEach((element) => {
    var items = element.split(",");
    arrayOfRows.push(items);
  });

  return arrayOfRows;
}

function generateList(arrayOfData) {
  const list = document.getElementById("data-list");
  list.innerHTML = "";
  arrayOfData.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    list.appendChild(li);
  });
}

function uptadeOptions(id, list) {
  var select = document.getElementById(id);
  select.innerHTML = "";
  if (list.length >= 2) {
    const option = document.createElement("option");
    option.value = defaultSelect;
    option.textContent = defaultSelect;
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

function updateSelects(elements) {
  optionsA = [...new Set(elements.map((list) => list[0]))];
  optionsB = [...new Set(elements.map((list) => list[1]))];
  optionsC = [...new Set(elements.map((list) => list[2]))];
  uptadeOptions("selectA", optionsA);
  uptadeOptions("selectB", optionsB);
  uptadeOptions("selectC", optionsC);
}

function filterLists() {
  var newList;
  if (selectA.value != defaultSelect) {
    newList = rows.filter((list) => {
      return selectA.value === "" || list[0] === selectA.value;
    });
  }
  if (selectB.value != defaultSelect) {
    newList = rows.filter((list) => {
      return selectB.value === "" || list[1] === selectB.value;
    });
  }
  if (selectC.value != defaultSelect) {
    newList = rows.filter((list) => {
      return selectC.value === "" || list[2] === selectC.value;
    });
  }
  updateSelects(newList);
  generateList(newList);
}

function resetFilters() {
  selectA.value = defaultSelect;
  selectB.value = defaultSelect;
  selectC.value = defaultSelect;
  filterLists();
}
