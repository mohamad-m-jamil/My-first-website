let landingpagejs = document.querySelector(".landing-page");

let imags = ["i1.jfif","i2.jfif","i3.jfif","i4.jfif","i5.jfif","i6.jfif","i7.jfif","i8.jfif","i9.jfif","i10.jfif","i11.jfif"];

let backgroundoption = true;
let tmpbackground;
function randomimags(){
    if(backgroundoption === true)
        {
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
    })
    if(backgroundlocalitem === 'true')
    {
        document.querySelector(".yes").classList.add("active");
    }
    else
    {
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
    if(box.style.left === "0px")
        box.style.left = "-170px";
    else if(box.style.left < "0px")
        box.style.left = "0px";
};

if(localStorage.getItem("color") !== null)
{
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color"));

    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");
        if(element.dataset.color === localStorage.getItem("color"))
        {
            element.classList.add("active");
        }
    });
}
const colorsli = document.querySelectorAll(".color-list li");

colorsli.forEach(li => {
    li.addEventListener("click", (e) =>{
        console.log(e.target.dataset.color);
        
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
    span.addEventListener("click", (e) =>{
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        if(e.target.dataset.background === 'yes')
        {
            backgroundoption = true;
            randomimags();
            localStorage.setItem("background_option", true);
        }
        else
        {
            backgroundoption = false;
            clearInterval(tmpbackground);
            localStorage.setItem("background_option", false);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Get all links inside the header area
    const links = document.querySelectorAll('.header-arae .links li a');
    
    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Remove 'active' class from all links
            links.forEach(link => link.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            event.target.classList.add('active');
        });
    });
});


let ourskills = document.querySelector(".skills");

function updateSkills() {
    let skillsofsettop = ourskills.offsetTop;
    let windowheight = window.innerHeight;
    let windowcroll = window.scrollY;

    if (windowcroll + windowheight >= skillsofsettop) {
        let allskills = document.querySelectorAll(".skills .skills-box span");
        allskills.forEach(element => {
            element.style.width = element.dataset.progress;
        });

        
    }
}

window.onscroll = updateSkills;

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
        document.body.appendChild(popuimgbox);
        let closbuttom = document.createElement("span");
        let closbuttomtext = document.createTextNode("X");
        closbuttom.appendChild(closbuttomtext);
        popuimgbox.appendChild(closbuttom);
        closbuttom.className = 'closbuttom';
    })
});

document.addEventListener('click', (e) =>{
    if(e.target.className == 'closbuttom')
    {
        document.querySelector(".pupo-box").remove();
        document.querySelector(".popuimgbox").remove();
    }
})

let leftElements = document.querySelectorAll(".timeline .left");
let rightElements = document.querySelectorAll(".timeline .right");

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect(); // Get the element's position relative to the viewport
    return (
        rect.top <= window.innerHeight && // Top edge is visible
        rect.bottom >= 0 // Bottom edge is visible
    );
}

function updateTimeline() {
    // Handle `.left` elements
    leftElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.marginLeft = "0px"; // Slide left into view
        }
    });

    // Handle `.right` elements
    rightElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.marginRight = "0px"; // Slide right into view
        }
    });
}

// Attach the function to the scroll event
window.addEventListener("scroll", updateTimeline);

// Call the function once to check on page load
updateTimeline();



document.querySelector(".reset-option").onclick = function(){
    localStorage.clear();
    window.location.reload();
}