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

let ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        events: {
            'onStateChange': function(event) {
                // event.data === 1 indicates the video is PLAYING
                if (event.data === 1) {
                    startDelayedButton();
                }
            }
        }
    });
}

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
    
    // Custom Video Overlay Logic
    const vslOverlay = document.getElementById('vsl-overlay');
    if (vslOverlay) {
        vslOverlay.addEventListener('click', function() {
            // Check if YouTube player is ready
            if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
                ytPlayer.playVideo();
                this.style.display = 'none';
            } else {
                // Wait for it if clicked too fast
                let waitForYT = setInterval(() => {
                    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
                        ytPlayer.playVideo();
                        vslOverlay.style.display = 'none';
                        clearInterval(waitForYT);
                    }
                }, 200);
            }
        });
    }
});
