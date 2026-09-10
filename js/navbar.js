// Function to get current theme
// * Returns true if dark, and false if light 
function getCurrentTheme() {
    // Check if user previously saved a preference on this website
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme == "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
// Function to apply styles to match current theme
function applyTheme(dark) {
    // * Dark is true when the current theme is dark
    if (dark) {
        document.querySelector(".navbar").classList.remove("bg-white");
        document.querySelector(".navbar").classList.remove("navbar-light");
        document.querySelector(".navbar").classList.add("bg-black");
        document.querySelector(".navbar").classList.add("navbar-dark");
        document.documentElement.style.removeProperty("color-scheme");
        document.documentElement.style.setProperty("color-scheme", "dark");
        document.querySelector(".input").checked = true;
    } else {
        document.querySelector(".navbar").classList.remove("bg-black");
        document.querySelector(".navbar").classList.remove("navbar-dark");
        document.querySelector(".navbar").classList.add("bg-white");
        document.querySelector(".navbar").classList.add("navbar-light");
        document.documentElement.style.removeProperty("color-scheme");
        document.documentElement.style.setProperty("color-scheme", "light");
    }
    localStorage.setItem("theme", dark); 
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

            applyTheme(getCurrentTheme());
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .addEventListener("change", (e) => {
                    applyTheme(!getCurrentTheme()); // ! Not sure using false works
                    
                });
            const themeButton = document.querySelector(".switch");
            themeButton.addEventListener("click", function () {
                if (localStorage.getItem("theme")) {
                    applyTheme(!getCurrentTheme());
                }
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
