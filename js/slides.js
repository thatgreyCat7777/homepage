function playVideo() {
    var video = document.querySelector(".carousel-item-end video");
    console.log(video);
    if (video) {
        video.currentTime = 0; 
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
    // TODO - Make play video work when pressing arrow keys to navigate slides
    for (var i = 0, len = buttons.length; i < len; i++) {
        buttons[i].addEventListener("click", function () {
            interval = resetInterval(interval);
            playVideo();
        });
    }
    document.addEventListener("keydown", function (event) {
        if ([37, 65].includes(event.key)) {
            document.querySelector("#previous").click();
            playVideo();
        } else if ([39, 68].includes(event.key)) {
            document.querySelector("#next").click();
            playVideo();
        }
    });
};
// var viewportWidth = window.innerWidth;
// var viewportHeight = window.innerHeight;
// console.log(viewportWidth);
// console.log(viewportHeight);
