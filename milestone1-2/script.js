"use strict";
const toggleBtn = document.getElementById("toggle-skills");
const skills = document.getElementById("skills");
toggleBtn.addEventListener("click", () => {
    if (skills.style.display === 'none') {
        skills.style.display = 'block';
    }
    else {
        skills.style.display = 'none';
    }
});
