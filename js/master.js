let landingpagejs = document.querySelector(".landing-page");

let imags = ["i1.jfif","i2.jfif","i3.jfif","i4.jfif","i5.jfif","i6.jfif","i7.jfif","i8.jfif","i9.jfif","i10.jfif","i11.jfif"];

let backgroundoption = true;
let tmpbackground;

function randomimags(){
    if(backgroundoption === true) {
        if (tmpbackground) {
            clearInterval(tmpbackground);
        }
        tmpbackground = setInterval(function () {
            let rendomnbr = Math.floor(Math.random() * imags.length);
            let selectedImage = `imas/${imags[rendomnbr]}`;
            landingpagejs.style.backgroundImage = `url("${selectedImage}")`;
            localStorage.setItem("current_background", selectedImage);
        }, 3000);
    }
}

let backgroundlocalitem = localStorage.getItem("background_option");

if (backgroundlocalitem !== null) {
    backgroundoption = backgroundlocalitem === "true";
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });
    if(backgroundlocalitem === 'true') {
        document.querySelector(".yes").classList.add("active");
    } else {
        document.querySelector(".no").classList.add("active");
    }
}

let savedBackground = localStorage.getItem("current_background");

if (savedBackground) {
    landingpagejs.style.backgroundImage = `url("${savedBackground}")`;
    if (backgroundoption) {
        randomimags();
    }
} else if (backgroundoption) {
    randomimags();
}

document.querySelector(".fa-gear").onclick = function(){
    const box = document.querySelector(".setting-box");
    if(box.style.left === "0px") {
        box.style.left = "-170px";
    } else {
        box.style.left = "0px";
    }
};

if(localStorage.getItem("color") !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color"));

    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        if(element.dataset.color === localStorage.getItem("color")) {
            element.classList.add("active");
        }
    });
}

const colorsli = document.querySelectorAll(".color-list li");

colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem("color", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

const spanbackele = document.querySelectorAll(".random-background span");

spanbackele.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        if(e.target.dataset.background === 'yes') {
            backgroundoption = true;
            randomimags();
            localStorage.setItem("background_option", true);
        } else {
            backgroundoption = false;
            clearInterval(tmpbackground);
            localStorage.setItem("background_option", false);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.header-arae .links li a');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            links.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
});

let ourskills = document.querySelector(".skills");

function updateSkills() {
    if (!ourskills) return;
    
    let skillsofsettop = ourskills.offsetTop;
    let windowheight = window.innerHeight;
    let windowcroll = window.scrollY;

    if (windowcroll + windowheight >= skillsofsettop + 100) {
        let allskills = document.querySelectorAll(".skills .skills-box span");
        allskills.forEach(element => {
            if (element.dataset.progress) {
                element.style.width = element.dataset.progress;
            }
        });
    }
}

window.onscroll = updateSkills;
window.addEventListener('load', updateSkills);
window.addEventListener('resize', updateSkills);
updateSkills();

let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'pupo-box';
        document.body.appendChild(overlay);
        
        let popuimgbox = document.createElement("div");
        popuimgbox.className = 'popuimgbox';
        
        let popuimg = document.createElement("img");
        popuimg.src = img.src;
        popuimgbox.appendChild(popuimg);
        
        let closbuttom = document.createElement("span");
        let closbuttomtext = document.createTextNode("X");
        closbuttom.appendChild(closbuttomtext);
        closbuttom.className = 'closbuttom';
        popuimgbox.appendChild(closbuttom);
        
        document.body.appendChild(popuimgbox);
    });
});

document.addEventListener('click', (e) => {
    if(e.target.className == 'closbuttom' || e.target.className == 'pupo-box') {
        let popup = document.querySelector(".pupo-box");
        let popupimg = document.querySelector(".popuimgbox");
        if(popup) popup.remove();
        if(popupimg) popupimg.remove();
    }
});

// Improved timeline animation for responsive design
let leftElements = document.querySelectorAll(".timeline .left");
let rightElements = document.querySelectorAll(".timeline .right");
let timelineObserver;

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        rect.top <= (windowHeight * 0.85) &&
        rect.bottom >= 0
    );
}

function updateTimeline() {
    leftElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('in-view');
        }
    });

    rightElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('in-view');
        }
    });
}

// Use Intersection Observer for better performance (if supported)
if ('IntersectionObserver' in window) {
    timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all timeline elements
    leftElements.forEach(el => timelineObserver.observe(el));
    rightElements.forEach(el => timelineObserver.observe(el));
} else {
    // Fallback for older browsers
    window.addEventListener("scroll", updateTimeline);
    window.addEventListener("resize", updateTimeline);
    updateTimeline();
}

window.addEventListener("load", updateTimeline);
updateTimeline();

document.querySelector(".reset-option").onclick = function(){
    localStorage.clear();
    window.location.reload();
};