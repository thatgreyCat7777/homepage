function autoClickButton() {
            var nextButton = document.querySelector("#next");
            var myInterval = setInterval(function () {
                nextButton.click();
            }, 5000);
            return myInterval;
        }

        function resetInterval(interval) {
            clearInterval(interval);
            return autoClickButton();
        }
        window.onload = function () {
            var interval = autoClickButton();
            var sliders = document.querySelectorAll("#sliders button");
            var buttons = document.querySelectorAll("#carouselExampleCaptions button");
            for (var i = 0, len = sliders.length; i < len; i++) {
                sliders[i].addEventListener('click', function () {
                    interval = resetInterval(interval);
                });
            }
            for (var i = 0, len = buttons.length; i < len; i++) {
                buttons[i].addEventListener('click', function () {
                    interval = resetInterval(interval);
                });
            }
            document.addEventListener('keydown', function (event) {
                if ([37, 65].includes(event.key)) {
                    document.querySelector('#previous').click();
                } else if ([39, 68].includes(event.key)) {
                    document.querySelector('#next').click();
                }
            });
        }
        // var viewportWidth = window.innerWidth;
        // var viewportHeight = window.innerHeight;
        // console.log(viewportWidth);
        // console.log(viewportHeight);