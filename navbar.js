document.addEventListener("DOMContentLoaded", function () {
    // Loads navbar into page
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#navbar-placeholder").innerHTML = data;
        })
        // Checks which page the user is in and activates the correct page based off it
        .then((data) => {
            var nav = document.querySelectorAll("#nav li a");
            for (let i = 0; i < nav.length; i++) {
                if (document.location.pathname.endsWith('/'))
                {
                    nav[i].classList.add("active");
                    break;
                }
                if (document.location.pathname.includes(nav[i].getAttribute("href"))) {
                    nav[i].classList.add("active");
                } else {
                    nav[i].classList.remove("active");
                }
                nav[i].addEventListener("click", function () {
                    for (var j = 0; j < nav.length; j++) {
                        nav[j].classList.remove("active");
                    }
                    this.classList.add("active");
                });
                
            }
            
            console.log(document.location.pathname);
        });
});
