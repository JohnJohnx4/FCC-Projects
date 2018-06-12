const scrollable = document.getElementById("scrollable");
const items = document.getElementById("items");

function makeList() {
  let idNum = 0;
  let set1 = [];
  let set2 = [];
  for( let i = 65; i < 91; i++) {
    let li = document.createElement("li");
    li.setAttribute("id", idNum);
    li.appendChild(document.createTextNode(String.fromCharCode(i)));
    set1.push(li);
    items.appendChild(li);
    idNum++;
  }
  for( let i = 65; i < 91; i++) {
    let li = document.createElement("li");
    li.setAttribute("id", idNum);
    li.appendChild(document.createTextNode(String.fromCharCode(i)));
    set2.push(li);
    items.appendChild(li);
    idNum++;
  }

  

  var elem = document.querySelector('#some-element');
  elem.parentNode.removeChild(elem);  

}

makeList();

function scrollMiddleWare(inertia = 0.8) {
  const delta = {
    x: null,
  };

  const abs = {
    x: 0
  };

  return function onScroll(callback) {
    function notify() {
      abs.x += delta.x;
      callback({ abs, delta });
    }

    let requestID;
    function start() {
      requestID = requestAnimationFrame(update);
    }

    function update() {
      delta.x *= inertia;
      notify();
      start();
    }

    function stop() {
      cancelAnimationFrame(requestID);
      requestID = null;
    }

    let prevEvent;

    return function eventHandler(event) {
      event.preventDefault();
      if (prevEvent && event.buttons === 1) {
        delta.x = event.clientX - prevEvent.clientX;
        stop();
        notify();
      }
      if (event.buttons === 0 && requestID === null) start();
      prevEvent = event;
    };
  };
}

scrollable.addEventListener(
  "mousemove",
  scrollMiddleWare(0.9)(scroll => {
    items.style.left = `${scroll.abs.x}px`;
  })
);
