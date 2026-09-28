/* =====================================================
   INTERNSHIP DATA
===================================================== */

let internships = [

    {
        id: 1,

        title: "Web Development Intern",

        company: "TechNova Solutions",

        location: "Ahmedabad / Remote",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        duration: "3 Months"
    },


    {
        id: 2,

        title: "Python Django Intern",

        company: "CodeCraft Labs",

        location: "Remote",

        skills: [
            "Python",
            "Django",
            "SQL"
        ],

        duration: "4 Months"
    },


    {
        id: 3,

        title: "Frontend Developer Intern",

        company: "DigitalWorks",

        location: "Ahmedabad",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap"
        ],

        duration: "3 Months"
    },


    {
        id: 4,

        title: "Software Engineering Intern",

        company: "Innovate Systems",

        location: "Hybrid",

        skills: [
            "Python",
            "SQL",
            "Git"
        ],

        duration: "6 Months"
    }

];



/* =====================================================
   STUDENT PROFILE
===================================================== */

let profile =
    JSON.parse(
        localStorage.getItem("profile")
    ) ||

    {

        name: "Student Demo",

        education:
            "B.Tech Computer Engineering",

        careerGoal:
            "Web Development",

        skills:
            "HTML, CSS, JavaScript",

        interests:
            "Web Development, Software",

        projects:
            "Student Skill & Internship Finder"

    };



/* =====================================================
   APPLICATIONS
===================================================== */

let applications =
    JSON.parse(
        localStorage.getItem("applications")
    ) || [];



/* =====================================================
   COMPANY POSTED INTERNSHIPS
===================================================== */

let postedInternships =
    JSON.parse(
        localStorage.getItem("postedInternships")
    ) || [];



/* =====================================================
   CURRENT LOGIN ROLE
===================================================== */

let currentRole =
    localStorage.getItem("currentRole") || "";



/* =====================================================
   LOGIN SWITCH
===================================================== */

function switchLogin(role) {

    const studentLogin =
        document.getElementById("studentLogin");

    const companyLogin =
        document.getElementById("companyLogin");

    const studentTab =
        document.getElementById("studentTab");

    const companyTab =
        document.getElementById("companyTab");


    if (role === "student") {

        studentLogin.style.display = "block";

        companyLogin.style.display = "none";

        studentTab.classList.add("active");

        companyTab.classList.remove("active");

    }


    else {

        studentLogin.style.display = "none";

        companyLogin.style.display = "block";

        studentTab.classList.remove("active");

        companyTab.classList.add("active");

    }

}



/* =====================================================
   STUDENT LOGIN
===================================================== */

function loginStudent() {

    const email =
        document.getElementById("studentEmail").value;

    const password =
        document.getElementById("studentPassword").value;


    if (
        email.trim() === "" ||
        password.trim() === ""
    ) {

        alert(
            "Please enter student email and password."
        );

        return;

    }


    currentRole = "student";

    localStorage.setItem(
        "currentRole",
        "student"
    );


    updateNavigation();


    alert(
        "Student login successful!"
    );


    showPage("dashboard");

}



/* =====================================================
   COMPANY LOGIN
===================================================== */

function loginCompany() {

    const email =
        document.getElementById("companyEmail").value;

    const password =
        document.getElementById("companyPassword").value;


    if (
        email.trim() === "" ||
        password.trim() === ""
    ) {

        alert(
            "Please enter company email and password."
        );

        return;

    }


    currentRole = "company";

    localStorage.setItem(
        "currentRole",
        "company"
    );


    updateNavigation();


    alert(
        "Company login successful!"
    );


    showPage("companyDashboard");

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    currentRole = "";

    localStorage.removeItem(
        "currentRole"
    );


    updateNavigation();


    showPage("login");

}



/* =====================================================
   NAVIGATION
===================================================== */

function updateNavigation() {

    const studentNav =
        document.getElementById("studentNav");

    const companyNav =
        document.getElementById("companyNav");

    const internshipNav =
        document.getElementById("internshipNav");

    const applicationNav =
        document.getElementById("applicationNav");

    const logoutButton =
        document.getElementById("logoutButton");


    studentNav.style.display =
        currentRole === "student"
            ? "inline-block"
            : "none";


    companyNav.style.display =
        currentRole === "company"
            ? "inline-block"
            : "none";


    internshipNav.style.display =
        currentRole === "student"
            ? "inline-block"
            : "none";


    applicationNav.style.display =
        currentRole === "student"
            ? "inline-block"
            : "none";


    logoutButton.style.display =
        currentRole
            ? "inline-block"
            : "none";

}



/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(
            page => {
                page.classList.remove(
                    "active"
                );
            }
        );


    const page =
        document.getElementById(
            pageId
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }


    if (
        pageId === "internships"
    ) {

        renderInternships();

    }


    if (
        pageId === "applications"
    ) {

        renderApplications();

    }


    if (
        pageId === "companyDashboard"
    ) {

        renderCompanyDashboard();

    }


    window.scrollTo(
        0,
        0
    );

}



/* =====================================================
   OPEN DASHBOARD
===================================================== */

function openDashboard() {

    if (
        currentRole === "student"
    ) {

        showPage("dashboard");

    }


    else if (
        currentRole === "company"
    ) {

        showPage(
            "companyDashboard"
        );

    }


    else {

        showPage("login");

    }

}



/* =====================================================
   GET STUDENT SKILLS
===================================================== */

function getStudentSkills() {

    return profile.skills

        .split(",")

        .map(
            skill =>
                skill
                    .trim()
                    .toLowerCase()
        )

        .filter(
            skill => skill !== ""
        );

}



/* =====================================================
   GET ALL INTERNSHIPS
===================================================== */

function getAllInternships() {

    return [
        ...internships,
        ...postedInternships
    ];

}



/* =====================================================
   CALCULATE SKILL MATCH
===================================================== */

function calculateMatch(
    internship
) {

    const studentSkills =
        getStudentSkills();


    const matchedSkills =
        internship.skills.filter(
            skill =>
                studentSkills.includes(
                    skill.toLowerCase()
                )
        );


    if (
        internship.skills.length === 0
    ) {

        return 0;

    }


    return Math.round(

        (
            matchedSkills.length /
            internship.skills.length
        ) * 100

    );

}



/* =====================================================
   RENDER INTERNSHIPS
===================================================== */

function renderInternships() {

    const list =
        document.getElementById(
            "internshipList"
        );


    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const filter =
        document.getElementById(
            "filterSelect"
        ).value;


    let all =
        getAllInternships();


    all =
        all.filter(
            internship => {

                const text =
                    (
                        internship.title +
                        " " +
                        internship.company +
                        " " +
                        internship.skills.join(" ")
                    ).toLowerCase();


                return text.includes(
                    search
                );

            }
        );


    if (
        filter === "matched"
    ) {

        all =
            all.filter(
                internship =>
                    calculateMatch(
                        internship
                    ) >= 50
            );

    }


    if (
        all.length === 0
    ) {

        list.innerHTML = `

            <div class="panel">

                No internships found.

            </div>

        `;

        return;

    }


    list.innerHTML =
        all
            .map(
                internship =>
                    createInternshipCard(
                        internship
                    )
            )
            .join("");

}



/* =====================================================
   CREATE INTERNSHIP CARD
===================================================== */

function createInternshipCard(
    internship
) {

    const match =
        calculateMatch(
            internship
        );


    const matchClass =
        match < 50
            ? "low-match"
            : "";


    return `

        <div class="internship-card">

            <h3>
                ${internship.title}
            </h3>


            <p class="company-name">

                ${internship.company}

                • ${internship.location}

            </p>


            <p>

                <strong>
                    Duration:
                </strong>

                ${internship.duration}

            </p>


            <p>

                <strong>
                    Required Skills:
                </strong>

            </p>


            <div class="tags">

                ${

                    internship.skills

                        .map(
                            skill =>
                                `
                                <span class="tag">
                                    ${skill}
                                </span>
                                `
                        )

                        .join("")

                }

            </div>


            <span
                class="match ${matchClass}">

                ${match}% Skill Match

            </span>


            <br>


            <button
                class="primary-button"
                onclick="applyForInternship(${internship.id})">

                Apply Now

            </button>


            <button
                class="secondary-button"
                onclick="showInternshipDetails(${internship.id})">

                Details

            </button>

        </div>

    `;

}



/* =====================================================
   INTERNSHIP DETAILS
===================================================== */

function showInternshipDetails(
    id
) {

    const internship =
        getAllInternships()
            .find(
                item =>
                    item.id === id
            );


    if (!internship) {

        return;

    }


    const match =
        calculateMatch(
            internship
        );


    alert(

        "Internship Details\n\n" +

        "Title: " +
        internship.title +

        "\nCompany: " +
        internship.company +

        "\nLocation: " +
        internship.location +

        "\nDuration: " +
        internship.duration +

        "\nRequired Skills: " +
        internship.skills.join(", ") +

        "\nSkill Match: " +
        match +
        "%"

    );

}



/* =====================================================
   APPLY FOR INTERNSHIP
===================================================== */

function applyForInternship(
    id
) {

    if (
        currentRole !== "student"
    ) {

        alert(
            "Please login as a student to apply."
        );

        return;

    }


    const internship =
        getAllInternships()
            .find(
                item =>
                    item.id === id
            );


    if (!internship) {

        return;

    }


    const alreadyApplied =
        applications.some(
            application =>
                application.id === id
        );


    if (
        alreadyApplied
    ) {

        alert(
            "You have already applied for this internship."
        );

        return;

    }


    applications.push({

        id:
            internship.id,

        title:
            internship.title,

        company:
            internship.company,

        status:
            "Applied"

    });


    localStorage.setItem(

        "applications",

        JSON.stringify(
            applications
        )

    );


    updateStatistics();


    alert(
        "Application submitted successfully!"
    );

}



/* =====================================================
   RENDER APPLICATIONS
===================================================== */

function renderApplications() {

    const container =
        document.getElementById(
            "applicationList"
        );


    if (
        applications.length === 0
    ) {

        container.innerHTML = `

            <div class="panel">

                No applications yet.

                <br><br>

                Go to Internships and
                apply for an opportunity.

            </div>

        `;

        return;

    }


    container.innerHTML =
        applications

            .map(
                application =>
                    `

                    <div
                        class="application-card">

                        <div>

                            <h3>
                                ${application.title}
                            </h3>

                            <p>
                                ${application.company}
                            </p>

                        </div>


                        <span
                            class="status">

                            ${application.status}

                        </span>

                    </div>

                    `
            )

            .join("");

}



/* =====================================================
   SAVE STUDENT PROFILE
===================================================== */

function saveProfile() {

    profile = {

        name:
            document.getElementById(
                "studentName"
            ).value,

        education:
            document.getElementById(
                "education"
            ).value,

        careerGoal:
            document.getElementById(
                "careerGoal"
            ).value,

        skills:
            document.getElementById(
                "skills"
            ).value,

        interests:
            document.getElementById(
                "interests"
            ).value,

        projects:
            document.getElementById(
                "projects"
            ).value

    };


    localStorage.setItem(

        "profile",

        JSON.stringify(
            profile
        )

    );


    updateStatistics();


    const message =
        document.getElementById(
            "saveMessage"
        );


    message.textContent =
        "Profile saved successfully!";


    setTimeout(
        () => {

            message.textContent =
                "";

        },

        2000
    );

}



/* =====================================================
   POST INTERNSHIP - COMPANY
===================================================== */

function postInternship() {

    if (
        currentRole !== "company"
    ) {

        alert(
            "Please login as a company."
        );

        return;

    }


    const title =
        document.getElementById(
            "jobTitle"
        ).value.trim();


    const company =
        document.getElementById(
            "companyName"
        ).value.trim();


    const skillText =
        document.getElementById(
            "jobSkills"
        ).value.trim();


    const duration =
        document.getElementById(
            "jobDuration"
        ).value.trim();


    const location =
        document.getElementById(
            "jobLocation"
        ).value.trim();


    if (
        title === "" ||
        company === "" ||
        skillText === ""
    ) {

        alert(
            "Please enter internship title, company name and required skills."
        );

        return;

    }


    const skills =
        skillText

            .split(",")

            .map(
                skill =>
                    skill.trim()
            )

            .filter(
                skill =>
                    skill !== ""
            );


    const newInternship = {

        id:
            Date.now(),

        title:
            title,

        company:
            company,

        location:
            location,

        skills:
            skills,

        duration:
            duration

    };


    postedInternships.push(
        newInternship
    );


    localStorage.setItem(

        "postedInternships",

        JSON.stringify(
            postedInternships
        )

    );


    document.getElementById(
        "jobTitle"
    ).value = "";


    document.getElementById(
        "jobSkills"
    ).value = "";


    renderCompanyDashboard();


    alert(
        "Internship posted successfully!"
    );

}



/* =====================================================
   COMPANY DASHBOARD
===================================================== */

function renderCompanyDashboard() {

    const jobCount =
        document.getElementById(
            "jobCount"
        );


    const applicationCount =
        document.getElementById(
            "companyApplicationCount"
        );


    const jobsContainer =
        document.getElementById(
            "companyJobs"
        );


    jobCount.textContent =
        getAllInternships().length;


    applicationCount.textContent =
        applications.length;


    const all =
        getAllInternships();


    jobsContainer.innerHTML =

        all

            .map(
                internship => `

                <div class="job-row">

                    <div>

                        <strong>
                            ${internship.title}
                        </strong>

                        <br>

                        <small>

                            ${internship.company}

                            •

                            ${internship.skills.join(
                                ", "
                            )}

                        </small>

                    </div>


                    <span>

                        ${internship.duration}

                    </span>

                </div>

                `
            )

            .join("");

}



/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStatistics() {

    const studentSkills =
        getStudentSkills();


    document.getElementById(
        "skillCount"
    ).textContent =
        studentSkills.length;


    document.getElementById(
        "applicationCount"
    ).textContent =
        applications.length;


    document.getElementById(
        "companyApplicationCount"
    ).textContent =
        applications.length;

}



/* =====================================================
   LOAD PROFILE
===================================================== */

function loadProfile() {

    document.getElementById(
        "studentName"
    ).value =
        profile.name;


    document.getElementById(
        "education"
    ).value =
        profile.education;


    document.getElementById(
        "careerGoal"
    ).value =
        profile.careerGoal;


    document.getElementById(
        "skills"
    ).value =
        profile.skills;


    document.getElementById(
        "interests"
    ).value =
        profile.interests;


    document.getElementById(
        "projects"
    ).value =
        profile.projects;

}



/* =====================================================
   GET STUDENT SKILLS FOR COUNT
===================================================== */

function getStudentSkills() {

    return profile.skills

        .split(",")

        .map(
            skill =>
                skill.trim()
        )

        .filter(
            skill =>
                skill !== ""
        );

}



/* =====================================================
   INITIAL PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",

    function () {

        loadProfile();

        updateNavigation();

        updateStatistics();


        if (
            currentRole === "student"
        ) {

            showPage(
                "dashboard"
            );

        }

        else if (
            currentRole === "company"
        ) {

            showPage(
                "companyDashboard"
            );

        }

        else {

            showPage(
                "login"
            );

        }

    }

);
