// Num argument tells how many images to fetch
function get_cat(num = 7) {
    const url = "https://api.thecatapi.com/v1/images/search" + `?limit=${num}`;
    let data = async () => (await fetch(url)).json();
    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    let data = get_cat();
    let img = document.querySelectorAll("#cats-img");
    data().then((imgData) => {
        for (let i = 0; i < 7; i++) {
            img[i].src = imgData[i].url;
        }
    });
    let rightButton = document.querySelector(".get-cat-btn#next")
    if (rightButton != null) {
        rightButton.addEventListener("click", function () {
            data = get_cat(2);
            data().then((imgData) => {
                for (let i = 0; i < 2; i++) {
                    let element = document.createElement("div");
                    let image = document.createElement("img");
                    image.id = "cats-img";
                    image.alt = "Cats!";
                    image.classList.add("d-block");
                    image.classList.add("w-100");
                    image.src = `${imgData[i].url}`;
                    element.appendChild(image);
                    element.classList.add("carousel-item");
                    document.querySelector(".carousel-inner").appendChild(element);
                }
            });
        });
    }
    let leftButton = document.querySelector(".get-cat-btn#previous")
    if (leftButton != null) {
        leftButton.addEventListener("click", function () {
            data = get_cat(2);
            data().then((imgData) => {
                for (let i = 0; i < 2; i++) {
                    let element = document.createElement("div");
                    let image = document.createElement("img");
                    image.id = "cats-img";
                    image.alt = "Cats!";
                    image.classList.add("d-block");
                    image.classList.add("w-100");
                    image.src = `${imgData[i].url}`;
                    element.appendChild(image);
                    element.classList.add("carousel-item");
                    document.querySelector(".carousel-inner").prepend(element);
                }
            });
        });
    }
});
