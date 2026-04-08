function showSection(sectionId) {
    // Hide all sections
    const allDetailSections = document.querySelectorAll('.settings-detail');
    const settingsMain = document.getElementById('settingsMain');

    allDetailSections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    settingsMain.style.display = 'none';

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => targetSection.classList.add('active'), 10);
    }
}

// Handle Form Submission
document.getElementById('docProfileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const saveBtn = e.target.querySelector('.save-btn');

    // Visual feedback
    const originalText = saveBtn.innerText;
    saveBtn.innerText = 'Updating...';
    saveBtn.style.opacity = '0.7';
    saveBtn.disabled = true;

    setTimeout(() => {
        saveBtn.innerText = 'Profile Updated!';
        saveBtn.style.backgroundColor = '#4CAF50';
        saveBtn.style.opacity = '1';

        setTimeout(() => {
            saveBtn.innerText = originalText;
            saveBtn.style.backgroundColor = '';
            saveBtn.disabled = false;
            showSection('settingsMain');
        }, 1500);
    }, 1000);
});
