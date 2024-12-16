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
// Get form and preview elements
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeExperince");
const resumeSkills = document.getElementById("resumeSkills");
const downloadPdfButton = document.getElementById("download-pdf");
const editBtn = document.getElementById("editBtn");
const backBtn = document.getElementById("backBtn");
const resumeContent = document.getElementById("resumeContent");
const shareLinkBtn = document.getElementById("shareLinkBtn");
// Handle form submission
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    // Collect form values
    const name1 = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education")
        .value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills").value;
    const photoInput = document.getElementById("photo");
    const photofile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = "";
    // if(photofile){
    //     photoBase64 = await fileToBase64(photofile)
    //     localStorage.setItem("resumePhoto", photoBase64)
    //     resumePhoto.src = photoBase64;
    // }
    if (photofile) {
        photoBase64 = yield fileToBase64(photofile);
        // Store the photo in localStorage instead of passing it in the URL
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    else {
        resumePhoto.src = "default-placeholder.png"; // Replace with your default image path
    }
    // Hide form and show resume page
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    // Populate the resume preview
    resumeName.textContent = name1;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    // Generate shareable link without the photo
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
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("from")) || "";
    document.getElementById("name").value =
        resumeName.textContent || "";
    document.getElementById("email").value =
        ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace("Email:", "")) || "";
    document.getElementById("phone").value =
        ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace("Phone:", "")) || "";
    document.getElementById("degree").value = degree || "";
    document.getElementById("education").value =
        education || "";
    document.getElementById("workExperience").value =
        resumeWorkExperience.textContent || "";
    document.getElementById("skills").value =
        resumeSkills.textContent || "";
}
// Handle PDF download
downloadPdfButton.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
        alert("Error: html2pdf library is not loaded.");
        return;
    }
    const resumeOptions = {
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    // Generate and download PDF
    html2pdf()
        .from(resumeContent)
        .set(resumeOptions)
        .save()
        .catch((error) => {
        console.error("PDF generation error:", error);
    });
});
// Handle query parameters on page load
window.addEventListener("DOMContentLoaded", () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const degree = params.get("degree") || "";
    const education = params.get("education") || "";
    const workExperience = params.get("workExperience") || "";
    const skills = params.get("skills") || "";
    if (name ||
        email ||
        phone ||
        degree ||
        education ||
        workExperience ||
        skills) {
        // Populate the resume preview if query params are present
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;
        // Retrieve photo from localStorage (if available)
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumePhoto.src = savedPhoto;
        }
        // Hide form and show resume page
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
// CSS for ensuring the image is styled properly
resumePhoto.style.width = "150px"; // Adjust width as per your requirement
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%"; // Circular image
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";