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
});