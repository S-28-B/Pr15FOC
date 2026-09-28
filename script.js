const data=[
{id:1,title:'Web Development Intern',company:'TechNova Solutions',location:'Ahmedabad / Remote',skills:['HTML','CSS','JavaScript'],duration:'3 Months'},
{id:2,title:'Python Django Intern',company:'CodeCraft Labs',location:'Remote',skills:['Python','Django','SQL'],duration:'4 Months'},
{id:3,title:'Frontend Developer Intern',company:'DigitalWorks',location:'Ahmedabad',skills:['HTML','CSS','JavaScript','Bootstrap'],duration:'3 Months'},
{id:4,title:'Software Engineering Intern',company:'Innovate Systems',location:'Hybrid',skills:['Python','SQL','Git'],duration:'6 Months'}
];
let profile=JSON.parse(localStorage.getItem('profile')||'null')||{name:'Student Demo',education:'B.Tech Computer Engineering',goal:'Web Development',skills:'HTML, CSS, JavaScript',interests:'Web Development, Software',projects:'Student Skill & Internship Finder'};
let applications=JSON.parse(localStorage.getItem('applications')||'[]');

function showPage(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');if(id==='internships')render();if(id==='applications')renderApps();scrollTo(0,0)}
function skills(){return profile.skills.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean)}
function score(i){return Math.round(i.skills.filter(x=>skills().includes(x.toLowerCase())).length/i.skills.length*100)}
function render(){
 let q=document.getElementById('search').value.toLowerCase(), f=document.getElementById('filter').value;
 let arr=data.filter(i=>(i.title+' '+i.company+' '+i.skills.join(' ')).toLowerCase().includes(q));
 if(f==='matched')arr=arr.filter(i=>score(i)>=50);
 document.getElementById('list').innerHTML=arr.length?arr.map(i=>`<article class="internship-card"><h3>${i.title}</h3><p class="company">${i.company} • ${i.location}</p><p><b>Duration:</b> ${i.duration}</p><b>Required Skills:</b><div class="tags">${i.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div><span class="match ${score(i)<50?'low':''}">${score(i)}% Skill Match</span><br><button class="primary" onclick="apply(${i.id})">Apply Now</button> <button class="secondary" onclick="details(${i.id})">Details</button></article>`).join(''):'<div class="panel">No internships found.</div>';
}
function details(id){let i=data.find(x=>x.id===id);alert(`${i.title}\n\nCompany: ${i.company}\nRequired Skills: ${i.skills.join(', ')}\nDuration: ${i.duration}\nBasic Skill Match: ${score(i)}%`)}
function apply(id){let i=data.find(x=>x.id===id);if(applications.some(a=>a.id===id)){alert('Already applied to this internship.');return}applications.push({id:i.id,title:i.title,company:i.company,status:'Applied'});localStorage.setItem('applications',JSON.stringify(applications));update();alert('Application submitted successfully!')}
function renderApps(){let e=document.getElementById('apps');e.innerHTML=applications.length?applications.map(a=>`<div class="application"><div><h3>${a.title}</h3><p>${a.company}</p></div><span class="status">${a.status}</span></div>`).join(''):'<div class="panel">No applications yet. Browse internships and apply.</div>'}
function saveProfile(){profile={name:name.value,education:education.value,goal:goal.value,skills:skillsInput.value,interests:interests.value,projects:projects.value};localStorage.setItem('profile',JSON.stringify(profile));document.getElementById('saved').textContent='Profile saved!';update();setTimeout(()=>saved.textContent='',1800)}
const skillsInput=document.getElementById('skills');
function load(){name.value=profile.name;education.value=profile.education;goal.value=profile.goal;skillsInput.value=profile.skills;interests.value=profile.interests;projects.value=profile.projects;update();render()}
function update(){skillCount.textContent=skills().length;appCount.textContent=applications.length}
document.addEventListener('DOMContentLoaded',load);
