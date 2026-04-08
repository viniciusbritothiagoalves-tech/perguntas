let currentStep = "1";
const totalStepsNumbers = 14;

// Store answers
const userAnswers = {};

function updateProgressBar(stepId) {
    let progress = 0;
    
    if (stepId === 'exit') {
        progress = 100;
    } else if (stepId === 'recovery-1') {
        progress = 92;
    } else {
        const num = parseInt(stepId);
        if (!isNaN(num)) {
            progress = (num / totalStepsNumbers) * 100;
        }
    }
    
    if(progress > 0) {
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }
}

function nextStep(step) {
    // Hide current step
    const currentEl = document.getElementById(`step-${currentStep}`);
    if(currentEl) currentEl.classList.remove('active');
    
    // Update step counter
    currentStep = step.toString();
    
    // Update progress bar
    updateProgressBar(currentStep);
    
    // Wait for fade out, then show next step
    setTimeout(() => {
        const nextEl = document.getElementById(`step-${currentStep}`);
        if(nextEl) {
            nextEl.classList.add('active');
        }
    }, 400); // Wait for CSS transition timing
}

function selectOption(btn, stepId, nextStepId) {
    // Prevent multiple clicks
    if (btn.classList.contains('selected')) return;

    // Remove selected class from all options
    const container = btn.parentElement;
    const options = container.querySelectorAll('.btn-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none';
    });
    
    // Add selected class
    btn.classList.add('selected');
    
    // Store answer
    userAnswers[`step${stepId}`] = btn.textContent.trim();
    
    // Smooth transition
    setTimeout(() => {
        nextStep(nextStepId);
    }, 600);
}

function finishQuiz() {
    console.log("Respostas coletadas:", userAnswers);
    // Redirecionamento 
    window.location.href = "https://donate.stripe.com/fZueVcfnyfXdbTT1fJ1VK0h";
}
