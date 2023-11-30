function calculateBytes() {
  var num = document.getElementById("numberBox").value;
  var counter = 0;
  var str = "";
  while (num >= 1) {
    if (num % 2 == 1) {
      str += "1";
      counter++;
    } else {
      str += "0";
    }

    num = parseInt(num / 2);
  }
  var byteParagraph = document.getElementById("bytes");
  var nrOfOnesParagraph = document.getElementById("counter");

  byteParagraph.textContent = `Formatul in biti a numarului ${
    document.getElementById("numberBox").value
  } este: ${str.split("").reverse().join("")}.`;

  nrOfOnesParagraph.textContent = `Numarul de valori 1 in forma binara: ${counter}.`;
}
