var locked = false;
function playVideo() {
    if (locked === false) {
        var video = document.querySelector(".carousel-item-end video");
        console.log(video);
        if (video != null) {
            video.currentTime = 0;
        }
        locked = true;
    }
}
function autoClickButton() {
    var nextButton = document.querySelector("#next");
    var myInterval = setInterval(function () {
        nextButton.click();
    }, 8500);
    playVideo();
    return myInterval;
}

function resetInterval(interval) {
    clearInterval(interval);
    return autoClickButton();
}
window.onload = function () {
    var interval = autoClickButton();
    var sliders = document.querySelectorAll("#sliders button");
    var buttons = document.querySelectorAll("#previous, #next");
    for (var i = 0, len = sliders.length; i < len; i++) {
        sliders[i].addEventListener("click", function () {
            interval = resetInterval(interval);
            playVideo();
        });
    }
    for (var i = 0, len = buttons.length; i < len; i++) {
        buttons[i].addEventListener("click", function () {
            if (locked === false) {
                interval = resetInterval(interval);
                playVideo();
            }
        });
    }
    document.addEventListener("keydown", function (event) {
        if (["ArrowLeft", "a"].includes(event.key)) {
            document.querySelector("#previous").click();
        } else if (["ArrowRight", "d"].includes(event.key)) {
            document.querySelector("#next").click();
        }
    });

    // Added interval
    document
        .querySelector(".carousel")
        .addEventListener("slid.bs.carousel", () => {
            locked = false;
        });
};
// var viewportWidth = window.innerWidth;
// var viewportHeight = window.innerHeight;
// console.log(viewportWidth);
// console.log(viewportHeight);
