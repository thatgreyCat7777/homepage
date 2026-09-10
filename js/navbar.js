// Function to get current theme
// * Returns true if dark, and false if light
function getCurrentTheme() {
    // Check if user previously saved a preference on this website
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme != null) {
        return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
// Function to apply styles to match current theme
function applyTheme(dark) {
    // * Dark is true when the current theme is dark
    console.log(`meow ${dark}`);
    if (dark === "true" || dark === true) {
        // Remove old theme class
        document.querySelector(".navbar").classList.remove("bg-white");
        document.querySelector(".navbar").classList.remove("navbar-light");
        // Add new theme class
        document.querySelector(".navbar").classList.add("bg-black");
        document.querySelector(".navbar").classList.add("navbar-dark");
        // Set root theme
        document.documentElement.style.removeProperty("color-scheme");
        document.documentElement.style.setProperty("color-scheme", "dark");
        // Set style sheet
        document.querySelector(".navbar-light-dark").href =
            "css/navbar-dark.css";
        if (document.querySelector(".cards-light-dark")) {
            document.querySelector(".cards-light-dark").href =
                "css/cards-dark.css";
        }
        // Set button
        document.querySelector(".input").checked = true;
    } else {
        // Remove old theme class
        document.querySelector(".navbar").classList.remove("bg-black");
        document.querySelector(".navbar").classList.remove("navbar-dark");
        // Add new theme class
        document.querySelector(".navbar").classList.add("bg-white");
        document.querySelector(".navbar").classList.add("navbar-light");
        // Set root theme
        document.documentElement.style.removeProperty("color-scheme");
        document.documentElement.style.setProperty("color-scheme", "light");
        // Set style sheet
        document.querySelector(".navbar-light-dark").href =
        "css/navbar-light.css";
        if (document.querySelector(".cards-light-dark")) {
            document.querySelector(".cards-light-dark").href =
            "css/cards-light.css";
        }
    }
    localStorage.setItem("theme", dark);
    console.log(localStorage.getItem("theme"));
}

document.addEventListener("DOMContentLoaded", function () {
    // Loads navbar into page
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#navbar-placeholder").innerHTML = data;
        })
        // Checks which page the user is in and activates the correct page based off it
        .then((data) => {
            let nav = document.querySelectorAll(".nav-link");
            for (let i = 0; i < nav.length; i++) {
                if (
                    document.location.pathname.charAt(
                        document.location.pathname.length - 1,
                    ) == "/"
                ) {
                    nav[i].classList.add("active");
                    break;
                }
                if (
                    document.location.pathname.includes(
                        nav[i].getAttribute("href"),
                    )
                ) {
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
            // console.log(document.location.pathname);
            // console.log(
            //     document.location.pathname.charAt(
            //         document.location.pathname.length - 1,
            //     ),
            // );
            // localStorage.clear();
            console.log(`hello: ${localStorage.getItem("theme")}`);
            // * Applies theme to page
            applyTheme(getCurrentTheme());
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            media.addEventListener("change", function (event) {
                if (localStorage.getItem("theme") === null) {
                    applyTheme(event.matches);
                }
            });
            const themeButton = document.querySelector(".input");
            themeButton.addEventListener("change", function () {
                applyTheme(document.querySelector(".input").checked);
            });
        });
});

//
// const toggleBtn = document.getElementById("theme-toggle");

// // Function to apply the theme to the HTML element
// function applyTheme(theme) {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);

//     // Optional: Update button text/icon based on the current theme
//     toggleBtn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
// }

// // 1. Initialize theme immediately on page load
// let currentTheme = getInitialTheme();
// applyTheme(currentTheme);

// // 2. Handle manual toggle button click
// toggleBtn.addEventListener("click", () => {
//     currentTheme = currentTheme === "dark" ? "light" : "dark";
//     applyTheme(currentTheme);
// });

// // 3. Optional: Listen for live OS system changes
// // Only updates if the user hasn't set a manual override
// window
//     .matchMedia("(prefers-color-scheme: dark)")
//     .addEventListener("change", (e) => {
//         if (!localStorage.getItem("theme")) {
//             currentTheme = e.matches ? "dark" : "light";
//             applyTheme(currentTheme);
//         }
//     });
