// Kode for å gi mine sliders litt mere funskjonalitet, fungerer med flere sliders.

const sliders = document.querySelectorAll(".slider-container");
sliders.forEach((slider) => {
    console.log("Initializing slider for: ", slider);
    initializeSlider(slider);
});

function initializeSlider(slider_container) {
    const slider_element = slider_container.querySelector(".slider");
    const slider_value_element = slider_container.querySelector(".slider-value");
    const range_min_element = slider_container.querySelector(".slider-min");
    const range_max_element = slider_container.querySelector(".slider-max");

    slider_value_element.innerText = slider_element.value;
    range_min_element.innerText = slider_element.min;
    range_max_element.innerText = slider_element.max;

    slider_element.addEventListener('input', () => {
        slider_value_element.innerText = slider_element.value;
        updateGradient(slider_element);
    });
}

// Oppdaterer bakgrunns fargen til slideren basert på verdien
function updateGradient(slider_element) {
    // Regner ut hvem prosent av max verdien selve verdien er
    let slider_value_percentage = (slider_element.value - slider_element.min) / (slider_element.max - slider_element.min) * 100;
    console.log(slider_value_percentage)
    let color = `linear-gradient(90deg, oklch(0.96 0.06 264) ${slider_value_percentage}%, oklch(0.45 0.06 264) ${slider_value_percentage}%)`
    
    slider_element.style.background = color;
}