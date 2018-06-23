window.addEventListener("keydown", checkKeyPress, false);

let keyCombo = "";
let comboing = false;
let konamicode = "3838404037393739666513";
function checkKeyPress(key) {
  keyCombo += key.keyCode.toString();
  console.log(keyCombo);
  if (keyCombo === konamicode) {
    alert("You did it!");
    window.location.href = "https://en.wikipedia.org/wiki/Konami_Code";
  }
  if (comboing === false) {
    comboing = true;
    this.setTimeout(() => {
      keyCombo = "";
      console.log("timed out", keyCombo);
      comboing = false;
    }, 2500);
  }
}
