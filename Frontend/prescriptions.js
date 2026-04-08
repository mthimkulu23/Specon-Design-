function showSection(sectionId) {
    const allDetailSections = document.querySelectorAll('.settings-detail');
    const settingsMain = document.getElementById('settingsMain');

    allDetailSections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    settingsMain.style.display = 'none';

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => targetSection.classList.add('active'), 10);
    }
}

// Print Simulation
document.querySelector('.print-btn')?.addEventListener('click', function () {
    window.print();
});

// Save Simulation
document.querySelector('.save-btn')?.addEventListener('click', function () {
    this.innerText = 'Saving...';
    setTimeout(() => {
        this.innerText = 'Saved to Patient File';
        this.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            this.innerText = 'Save to Record';
            this.style.backgroundColor = '';
            showSection('settingsMain');
        }, 1500);
    }, 1000);
});
