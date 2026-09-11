const BATCHSIZE = 1; // ! NO more than 10
const MAX_SLIDES = 30; // Max inclusive
var locked = false; // Helps create interval for loading
var size = 7; // Keeps track of how many slides there currently are

// Num argument tells how many images to fetch
function get_cat(num = 7) {
    const url = "https://api.thecatapi.com/v1/images/search" + `?limit=${num}`;
    return async () => (await fetch(url)).json();
}

// Removes excess cat pics
function remove_cats(top) {
    for (let i = 0; i < BATCHSIZE; i++) {
        if (top === false) {
            document.querySelector(".carousel-inner").firstElementChild.remove();
        }
        else {
            document.querySelector(".carousel-inner").lastElementChild.remove();
        }
        size -= BATCHSIZE;
    }
}

// Loads cats into the carousel and checks if there is too much cats 
function load_cats(append) {
    if (locked === false) {
        data = get_cat(BATCHSIZE);
        data().then((imgData) => {
            for (let i = 0; i < BATCHSIZE; i++) {
                let element = document.createElement("div");
                let image = document.createElement("img");
                image.id = "cats-img";
                image.alt = "Cats!";
                image.classList.add("d-block");
                image.classList.add("w-100");
                image.src = `${imgData[i].url}`;
                element.appendChild(image);
                element.classList.add("carousel-item");
                if (append === true) {
                    document
                        .querySelector(".carousel-inner")
                        .appendChild(element);
                } else {
                    document.querySelector(".carousel-inner").prepend(element);
                }
            }
        });
        locked = true;
        size += BATCHSIZE;
        if (size > MAX_SLIDES) {
            remove_cats(!append);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Init
    let data = get_cat();
    let img = document.querySelectorAll("#cats-img");
    data().then((imgData) => {
        for (let i = 0; i < 7; i++) {
            img[i].src = imgData[i].url;
        }
    });

    // Get more cats when button pressed
    let rightButton = document.querySelector(".get-cat-btn#next");
    if (rightButton != null) {
        rightButton.addEventListener("click", () => load_cats(true));
    }
    let leftButton = document.querySelector(".get-cat-btn#previous");
    if (leftButton != null) {
        leftButton.addEventListener("click", () => load_cats(false));
    }

    // Keyboard presses
    document.addEventListener("keydown", function (event) {
        if (locked === false) {
            if (["ArrowLeft", "a"].includes(event.key)) {
                document.querySelector("#previous").click();
            } else if (["ArrowRight", "d"].includes(event.key)) {
                document.querySelector("#next").click();
            }
        }
    });

    // Added interval
    document
        .querySelector(".carousel")
        .addEventListener("slid.bs.carousel", () => {
            locked = false;
        });
});
