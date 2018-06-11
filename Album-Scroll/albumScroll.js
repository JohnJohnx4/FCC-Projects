const scrollable = document.getElementById("scrollable");
const items = document.getElementById("items");

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
