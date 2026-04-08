let currentStep = "1";
const totalStepsNumbers = 4;
const DELAY_MS = 210000; // 3 minutes and 30 seconds

let timerStarted = false;

function updateProgressBar(stepId) {
    let progress = 0;
    const num = parseInt(stepId);
    if (!isNaN(num)) {
        progress = (num / totalStepsNumbers) * 100;
    }
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function nextStep(step) {
    // Hide current step
    const currentEl = document.getElementById(`step-${currentStep}`);
    if(currentEl) currentEl.classList.remove('active');
    
    // Update step counter
    currentStep = step.toString();
    
    // Update progress bar
    updateProgressBar(currentStep);
    
    // Smooth Transition
    setTimeout(() => {
        const nextEl = document.getElementById(`step-${currentStep}`);
        if(nextEl) {
            nextEl.classList.add('active');
            
            // Timer will be started by the YouTube play event (onStateChange)
            // No need to init manually here since YouTube API loads globally
        }
    }, 400);
}

function selectOption(btn, stepId, nextStepId) {
    // Prevent multiple clicks
    if (btn.classList.contains('selected')) return;

    // Remove selected class from all options in the container
    const container = btn.parentElement;
    const options = container.querySelectorAll('.btn-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none'; // Lock other buttons
    });
    
    // Add selected class to the clicked one
    btn.classList.add('selected');
    
    // Smooth transition to next step
    setTimeout(() => {
        nextStep(nextStepId);
    }, 600);
}

function startDelayedButton() {
    if (timerStarted) return;
    timerStarted = true;

    setTimeout(() => {
        const delayedBtn = document.getElementById('delayed-button-container');
        if (delayedBtn) {
            delayedBtn.style.display = "block";
            delayedBtn.classList.add('fade-in-delayed');
        }
    }, DELAY_MS);
}

// The timer is started natively below using the focus trick

function finishQuiz() {
    // Redirect securely without intermediary pages
    window.location.href = "https://donate.stripe.com/fZueVcfnyfXdbTT1fJ1VK0h";
}

// Initial state setup on load
document.addEventListener("DOMContentLoaded", () => {
    updateProgressBar(1);
    
    // Ensure the delayed button is hidden on mount
    const delayedBtn = document.getElementById('delayed-button-container');
    if (delayedBtn) {
        delayedBtn.style.display = "none";
    }
// Wait for user to interact with the iframe to start the timer reliably locally/web
    window.addEventListener('blur', () => {
        const activeEl = document.activeElement;
        // If the focused element after clicking is our iframe
        if (currentStep === "4" && activeEl && activeEl.id === 'youtube-player') {
            startDelayedButton();
        }
    });
});
