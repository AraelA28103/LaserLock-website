
document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "static/images/family1.jpg",
        "static/images/family2.jpg",
        "static/images/family3.jpg",
        "static/images/family4.jpg"
    ];

    let currentIndex = 0;
    const imgElement = document.getElementById("slider-img");
    const dotsContainer = document.querySelector(".dots");

    // Crear puntitos dinámicamente
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateImage();
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateImage() {
        imgElement.src = images[currentIndex];
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    let interval = setInterval(nextImage, 4000);

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextImage, 4000);
    }
});
