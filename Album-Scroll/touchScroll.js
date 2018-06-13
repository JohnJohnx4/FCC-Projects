function touchMiddleWare(inertia = 0.8) {
  const touch_delta = {
    x: null,
    y: null
  };

  const touch_abs = {
    x: 0,
    y: 0
  };

  return function onScroll(callback) {
    function notify() {
      touch_abs.x += touch_delta.x;
      callback({ touch_abs, touch_delta });
    }

    let requestID;
    function start() {
      requestID = requestAnimationFrame(update);
    }

    function update() {
      touch_delta.x *= inertia;
      notify();
      start();
    }

    function stop() {
      cancelAnimationFrame(requestID);
      requestID = null;
    }

    let prevEvent;

    return function eventHandler(event) {
      console.log(event);
      event.preventDefault();
      if (prevEvent) {
          touch_delta.x = event.changedTouches[0].clientX - prevEvent.changedTouches[0].clientX;
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
    items.style.left = `${scroll.touch_abs.x}px`;
  })
);
