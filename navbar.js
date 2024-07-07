// Checks which page the user is in and activates the correct page based off it
document.addEventListener("DOMContentLoaded", function() {
    var nav = document.querySelectorAll("#nav li a");
    for (let i = 0; i < nav.length; i++) {
        if (document.URL.includes(nav[i].getAttribute("href"))) {
            nav[i].classList.add("active");
        } else {
            nav[i].classList.remove("active");
        }
        nav[i].addEventListener('click', function() {
            for (var j = 0; j < nav.length; j++) {
                nav[j].classList.remove("active");
            }
            this.classList.add("active");
        });
    }
});
