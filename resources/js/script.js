document.addEventListener("DOMContentLoaded", () => {
    let typeText = document.getElementById('typing-text').innerHTML;
    document.getElementById('typing-text').innerHTML = "";  

    function bigTypingAnimation() {
        document.getElementById('typing-text').classList.add("noanimation");
        let text = document.getElementById('big-typing').innerHTML;
        document.getElementById('big-typing').innerHTML = "";
        let index = 0;
        const bigInterval = setInterval(function(){
            if(index === text.length){
                clearInterval(bigInterval);
                document.getElementById('big-typing').classList.add("noanimation");
                setTimeout(typingAnimation, 0);
                return;
            }
            document.getElementById('big-typing').innerHTML += text.charAt(index);
            index++;
        }, 20);
    }

    function typingAnimation() {
        document.getElementById('typing-text').classList.remove("noanimation");
        let index = 0;
        const interval = setInterval(function(){
            if(index === typeText.length){
                clearInterval(interval);
                return;
            }
            if (typeText.charAt(index) === '<') {
                index += 3;
                document.getElementById('typing-text').innerHTML += "<br>"
            } else {
                document.getElementById('typing-text').innerHTML += typeText.charAt(index);
            }
            index++;
            // Trigger animation or transition for slide-in elements
            document.querySelectorAll('.slide-in-element').forEach((element) => {
                element.classList.add('slide-in');
      });
        }, 15);
    }
    bigTypingAnimation();


    function fadeInCheck() {
        var fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('fade-in-element');
            }
        });
    }

    window.addEventListener('scroll', fadeInCheck);
    fadeInCheck(); // Trigger the check when the page loads

    // Loader
    const loader = document.getElementById("loader-overlay");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("split");
            setTimeout(() => {
                loader.classList.add("hide");
                setTimeout(() => loader.remove(), 600);
            }, 700);
        }, 120); // Loader visible for 120ms
    }
});

function isTouchDevice() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

if (!isTouchDevice()) {
    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        cursor.style.top = x;
        cursor.style.left = y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

    // Grow on hover for clickable elements
    const growSelectors = [
        'button', 'a', '.arrow-wrapper', '.social-panel'
    ];
    growSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            circles.forEach(circle => {
                el.addEventListener('mouseenter', () => circle.classList.add('grow'));
                el.addEventListener('mouseleave', () => circle.classList.remove('grow'));
            });
        });
    });
} else {
    if (cursor) cursor.style.display = 'none';
}
