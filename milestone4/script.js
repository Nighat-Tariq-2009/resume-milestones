"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperince = document.getElementById("resumeExperince");
const resumeSkills = document.getElementById("resumeSkills");
const downloadPdfButton = document.getElementById("download-pdf");
const editBtn = document.getElementById("editBtn");
const backBtn = document.getElementById("backBtn");
const resumeContent = document.getElementById("resumeContent");
const shareLinkBtn = document.getElementById("shareLinkBtn");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name1 = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education").value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills").value;
    const photoInput = document.getElementById("photo");
    const photofile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = '';
    if (photofile) {
        photoBase64 = yield fileToBase64(photofile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    else {
        resumePhoto.src = "default-placeholder.png"; // Replace with your default image path
    }
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    resumeName.textContent = name1;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperince.textContent = workExperience;
    resumeSkills.textContent = skills;
    // share link
    const querParams = new URLSearchParams({
        name: name1,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        workexperience: workExperience,
        skills: skills,
    });
    const uniqueUrl = `${window.location.origin}? ${querParams.toString()}`;
    shareLinkBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert("the link is copied");
    });
    window.history.replaceState(null, "", `${querParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
// edited button
editBtn.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("from")) || '';
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace('Email:', '')) || '';
    document.getElementById("phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace('Phone:', '')) || '';
    document.getElementById("degree").value = degree || '';
    document.getElementById("education").value = education || '';
    document.getElementById("workExperience").value = resumeWorkExperince.textContent || '';
    document.getElementById("skills").value = resumeSkills.textContent || '';
}
