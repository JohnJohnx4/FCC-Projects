function touchMiddleWare(inertia = 0.8) {
  const delta = {
    x: null,
    y: null
  };

  const abs = {
    x: 0,
    y: 0
  };

  return function onScroll(callback) {
    function notify() {
      abs.x += delta.x;
      abs.y += delta.y;
      callback({ abs, delta });
    }

    let requestID;
    function start() {
      requestID = requestAnimationFrame(update);
    }

    function update() {
      delta.x *= inertia;
      delta.y *= inertia;
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
      if (prevEvent) {
          delta.x = event.changedTouches[0].clientX - prevEvent.changedTouches[0].clientX;
        stop();
        notify();
      }
      if (requestID === null) start();
      prevEvent = event;
    };
  };
}

scrollable.addEventListener(
  "touchmove",
  touchMiddleWare(0.9)(scroll => {
    items.style.left = `${scroll.abs.x}px`;

  })
);
