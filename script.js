let currentStep = "1";
const totalStepsNumbers = 10; // For visual progress bar approximation

// Store answers
const userAnswers = {};

function updateProgressBar(stepId) {
    // We only update progress bar numerically if it's a number step
    let progress = 0;
    
    if (stepId === 'exit') {
        progress = 100;
    } else if (stepId === 'recovery-1') {
        progress = 85; 
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
            
            // Special logic for analyzing step
            if (currentStep === "9") {
                runFakeAnalysis();
            }
        }
    }, 400); // Wait for CSS transition timing
}

function selectOption(btn, stepId, nextStepId) {
    // Prevent multiple clicks causing jumpy behavior
    if (btn.classList.contains('selected')) return;

    // Remove selected class from all options in this step
    const container = btn.parentElement;
    const options = container.querySelectorAll('.btn-option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none'; // Disable other options
    });
    
    // Add selected class to clicked option and play soft scale animation
    btn.classList.add('selected');
    
    // Store answer text (excluding SVG content)
    userAnswers[`step${stepId}`] = btn.textContent.trim();
    
    // AUTO ADVANCE DELAY
    setTimeout(() => {
        nextStep(nextStepId);
    }, 600);
}

function runFakeAnalysis() {
    // Simulate analyzing answers for 3 seconds
    setTimeout(() => {
        // Automatically go to the final payment/checkout step
        nextStep('10');
    }, 3000);
}

function finishQuiz() {
    console.log("Respostas coletadas:", userAnswers);
    // Redirecionamento para o checkout Stripe
    window.location.href = "https://donate.stripe.com/fZueVcfnyfXdbTT1fJ1VK0h";
}
