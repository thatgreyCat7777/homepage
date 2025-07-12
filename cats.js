function get_cat() {
    let img = document.querySelector('#cats-img');
    const url = "https://api.thecatapi.com/v1/images/search";
    let data = async () => (await fetch(url)).json();
    data().then((imgData) => {
        img.src = imgData[0].url;
    });
}
document.addEventListener('DOMContentLoaded', function() {
    get_cat();
    let button = document.querySelector("#get-cat-btn");
    if (button != null) {
        button.addEventListener("click", function() {
            get_cat();
        });
    }

});
