const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const  resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperince = document.getElementById("resumeExperince") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLParagraphElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const shareLinkBtn = document.getElementById("shareLinkBtn") as HTMLButtonElement;



form.addEventListener("submit",async(event:Event)=>{
    event.preventDefault()


    const name1 = (document.getElementById("name")as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const workExperience = (document.getElementById("workExperience") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;
    const photoInput = (document.getElementById("photo") as HTMLInputElement);

    const photofile = photoInput.files? photoInput.files[0]:null;

    let photoBase64 = '';

    if (photofile) {
        photoBase64 = await fileToBase64(photofile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    } else {
        resumePhoto.src = "default-placeholder.png"; // Replace with your default image path
    }
    



    document.querySelector(".container")?.classList.add("hidden")
    resumePage.classList.remove("hidden");

    resumeName.textContent = name1;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperince.textContent = workExperience;
    resumeSkills.textContent = skills;



    // share link
    const querParams = new URLSearchParams({
        name :name1,
        email:email,
        phone:phone,
        degree:degree,
        education:education,
        workexperience:workExperience,
        skills:skills,

    })
    const uniqueUrl = `${window.location.origin}? ${querParams.toString()}`
    shareLinkBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl)
        alert("the link is copied")

    })
    window.history.replaceState(null, "", `${querParams.toString()}`)
  

})

function fileToBase64(file:File):Promise<string>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();

        reader.onloadend=()=>resolve(
         reader.result as string
        )

        reader.onerror = reject;
        reader.readAsDataURL(file);
        
 
    })
}
// edited button
editBtn.addEventListener("click", ()=>{
    updateFormFromResume();

    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");
})

function updateFormFromResume(){

    const [degree, education] = resumeEducation.textContent?.split("from") || '';
    (document.getElementById("name")as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("email")as HTMLInputElement).value = resumeEmail.textContent?.replace('Email:', '') || '';
    (document.getElementById("phone")as HTMLInputElement).value = resumePhone.textContent?.replace('Phone:', '') || '';
    (document.getElementById("degree")as HTMLInputElement).value = degree || '';
    (document.getElementById("education")as HTMLInputElement).value = education || '';
    (document.getElementById("workExperience")as HTMLInputElement).value = resumeWorkExperince.textContent || '';
    (document.getElementById("skills")as HTMLInputElement).value = resumeSkills.textContent || '';


}

