// Store the lock states
let unlocked = [false, false, false];

// Define acceptable passwords for each field. 
// Can be customized or we can accept any non-empty input for an easy experience.
// Let's accept any non-empty input for a seamless surprise experience, 
// or define specific values if needed by changing the null values.
const requiredCodes = {
    1: 'from school to noww',
    2: 'one thing will never change',
    3: 'you will always be my person'
};

function handleEnter(e, num) {
    if (e.key === 'Enter') {
        checkPass(num);
    }
}

function checkPass(num) {
    const input = document.getElementById(`pass${num}`);
    const btn = document.getElementById(`btn${num}`);
    const err = document.getElementById(`err${num}`);

    const val = input.value.trim();

    if (val === '') {
        err.innerText = 'Please enter a code!';
        input.style.borderColor = '#ff4d4d';
        setTimeout(() => input.style.borderColor = 'rgba(138, 43, 226, 0.4)', 2000);
        return;
    }

    const row = document.getElementById(`row${num}`);

    // Check code if a specific code is required
    if (requiredCodes[num] !== null && val.toLowerCase() !== requiredCodes[num].toLowerCase()) {
        err.innerText = 'Incorrect code!';
        row.classList.add('error');
        setTimeout(() => row.classList.remove('error'), 2000);
        return;
    }

    // Success
    unlocked[num - 1] = true;

    btn.innerHTML = '<span class="btn-icon">✅</span> Unlocked!';
    btn.classList.add('success');
    row.classList.add('success');

    input.readOnly = true;
    err.innerText = '';

    checkAllUnlocked();
}

function checkAllUnlocked() {
    if (unlocked.every(val => val === true)) {
        // Show the reveal section
        const revealSection = document.getElementById('reveal-section');
        revealSection.classList.remove('hidden');

        // Scroll to the bottom so the button is visible
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    }
}

function openSurprise() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s ease-in-out';

    setTimeout(() => {
        window.location.href = 'surprise.html';
    }, 1500);
}
