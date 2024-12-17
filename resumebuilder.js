document.addEventListener('DOMContentLoaded', () => {
    const addWorkBtn = document.getElementById('add-work'); 
    const addEducationBtn = document.getElementById('add-education');
    const skillsInput = document.getElementById('skills-input');
    const skillsList = document.getElementById('skills-list');
    const generateResumeBtn = document.getElementById('generate-resume');
    const downloadResumeBtn = document.getElementById('download-resume');
    const previewContent = document.getElementById('preview-content');

    const skills = new Set();

    // Add Work Experience
    addWorkBtn.addEventListener('click', () => {
        const workEntries = document.getElementById('work-entries');
        const newWorkEntry = document.createElement('div');
        newWorkEntry.classList.add('work-entry');
        newWorkEntry.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="job-title" required>
               
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="duration" placeholder="e.g., Jan 2020 - Present">
            </div>
            <div class="form-group">
                <label>Key Responsibilities</label>
                <textarea class="responsibilities" rows="4"></textarea>
            </div>
            <button class="btn btn-remove">Remove</button>
        `;
        
        const removeBtn = newWorkEntry.querySelector('.btn-remove');
        removeBtn.addEventListener('click', () => {
            workEntries.removeChild(newWorkEntry);
        });

        workEntries.appendChild(newWorkEntry);
    });

    // Add Education
    addEducationBtn.addEventListener('click', () => {
        const educationEntries = document.getElementById('education-entries');
        const newEducationEntry = document.createElement('div');
        newEducationEntry.classList.add('education-entry');
        newEducationEntry.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" required>
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" required>
            </div>
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="text" class="graduation-year">
            </div>
            <button class="btn btn-remove">Remove</button>
        `;
        
        const removeBtn = newEducationEntry.querySelector('.btn-remove');
        removeBtn.addEventListener('click', () => {
            educationEntries.removeChild(newEducationEntry);
        });

        educationEntries.appendChild(newEducationEntry);
    });

    // Skills Management
    skillsInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            const skillValue = skillsInput.value.trim().replace(/,/g, '');
            if (skillValue && !skills.has(skillValue)) {
                skills.add(skillValue);
                updateSkillsList();
                skillsInput.value = '';
            }
        }
    });

    function updateSkillsList() {
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.classList.add('skill-tag');
            skillTag.innerHTML = `
                ${skill}
                <span class="remove-skill">&times;</span>
            `;
            
            const removeSkill = skillTag.querySelector('.remove-skill');
            removeSkill.addEventListener('click', () => {
                skills.delete(skill);
                updateSkillsList();
            });

            skillsList.appendChild(skillTag);
        });
    }

    // Generate Resume Preview
    generateResumeBtn.addEventListener('click', () => {
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const linkedin = document.getElementById('linkedin').value;

        let workHTML = '';
        const workEntries = document.querySelectorAll('.work-entry');
        workEntries.forEach(entry => {
            const jobTitle = entry.querySelector('.job-title').value;
            const company = entry.querySelector('.company').value;
            const duration = entry.querySelector('.duration').value;
            const responsibilities = entry.querySelector('.responsibilities').value;

            workHTML += `
                <div class="work-experience-item">
                    <h3>${jobTitle} | ${company}</h3>
                    <p class="duration">${duration}</p>
                    <p class="responsibilities">${responsibilities}</p>
                </div>
            `;
        });

        let educationHTML = '';
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const degree = entry.querySelector('.degree').value;
            const institution = entry.querySelector('.institution').value;
            const graduationYear = entry.querySelector('.graduation-year').value;

            educationHTML += `
                <div class="education-item">
                    <h3>${degree}</h3>
                    <p>${institution} | ${graduationYear}</p>
                </div>
            `;
        });

        const skillsHTML = Array.from(skills)
            .map(skill => `<span class="skill-badge">${skill}</span>`)
            .join(' ');

        previewContent.innerHTML = `
            <div class="resume-header">
                <h1>${fullName}</h1>
                <div class="contact-info">
                    ${email} | ${phone} | ${linkedin}
                </div>
            </div>

            <section>
                <h2>Work Experience</h2>
                ${workHTML}
            </section>

            <section>
                <h2>Education</h2>
                ${educationHTML}
            </section>

            <section>
                <h2>Skills</h2>
                <div class="skills-section">
                    ${skillsHTML}
                </div>
            </section>
        `;
    });

    // Download Resume (basic implementation)
    downloadResumeBtn.addEventListener('click', () => {
        const resumeContent = previewContent.innerHTML;
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    });
});