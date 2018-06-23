function touchMiddleWare(inertia = 0.8) {

  const touch = {
    touching: false
  };
  
  scrollable.addEventListener("touchstart", () => {
    touch.touching = true;
  })
  
  scrollable.addEventListener("touchend", () => {
    touch.touching = false;
  })

  const abs = {
    x: 0
  };
  
  const delta = {
    x: null
  };

  return function onUpdate(callback) {
    let prevEvent;
    let requestID;

    function stop() {
      cancelAnimationFrame(requestID);
      requestID = null;
    }
    
    function queue() {
      requestID = requestAnimationFrame(update);
    }
    
    function update() {
      delta.x *= inertia;
      notify();
      queue();
    }
    
    function notify() {
      abs.x += delta.x;
      callback({ abs, delta });
    }
    
    return function eventHandler(event) {
      event.preventDefault();
      console.log(touch.touching);
      if (prevEvent && touch.touching === true) {
        console.log("prevevent", prevEvent.changedTouches[0].clientX);
          delta.x = event.changedTouches[0].clientX - prevEvent.changedTouches[0].clientX;
        stop();
        notify();
      }
      if (touch.touching === false && requestID === null) queue();
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
