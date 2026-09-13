// Prevents autofocus from iframe elements
(function () {
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    let locked = true;
    const unlock = () => {
        locked = false;
    };

    ["wheel", "touchstart", "keydown", "mousedown"].forEach((ev) =>
        window.addEventListener(ev, unlock, { once: true, passive: true }),
    );

    window.addEventListener(
        "scroll",
        () => {
            if (locked) window.scrollTo(0, 0);
        },
        { passive: true },
    );

    window.addEventListener("load", () => {
        window.scrollTo(0, 0);
        setTimeout(unlock, 2000);
    });
})();
