// Christmas theme toggle functionality
let christmasThemeEnabled = true;
let snowflakeEffectEnabled = true;

// Update Christmas theme visibility
function updateChristmasTheme(enabled) {
    if (enabled) {
        document.body.classList.add('christmas-enabled');
        snowflakeEffectEnabled = true;
    } else {
        document.body.classList.remove('christmas-enabled');
        snowflakeEffectEnabled = false;
    }
}

// Update toggle status text
function updateToggleStatus(element, enabled) {
    if (element) {
        element.textContent = `Christmas Theme: ${enabled ? 'ON' : 'OFF'}`;
    }
}

// Clone the SVG pattern to fill the navbar width
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Christmas theme from localStorage
    const savedPreference = localStorage.getItem('christmasThemeEnabled');
    if (savedPreference !== null) {
        christmasThemeEnabled = savedPreference === 'true';
    }
    
    // Set initial state
    const toggle = document.getElementById('christmas-theme-toggle');
    const toggleStatus = document.getElementById('toggle-status');
    
    if (toggle) {
        toggle.checked = christmasThemeEnabled;
        updateChristmasTheme(christmasThemeEnabled);
        updateToggleStatus(toggleStatus, christmasThemeEnabled);
        
        // Add event listener for toggle
        toggle.addEventListener('change', function() {
            christmasThemeEnabled = toggle.checked;
            updateChristmasTheme(christmasThemeEnabled);
            updateToggleStatus(toggleStatus, christmasThemeEnabled);
            localStorage.setItem('christmasThemeEnabled', christmasThemeEnabled.toString());
        });
    }
    
    const lightsContainer = document.querySelector('.lights-container');
    const originalSvg = document.querySelector('.lights-svg');
    
    if (!lightsContainer || !originalSvg) return;
    
    // Calculate how many SVGs we need to fill the viewport width
    const svgWidth = 92; // SVG width in pixels
    const viewportWidth = window.innerWidth;
    const numberOfCopies = Math.ceil(viewportWidth / svgWidth) + 3; // +3 to ensure coverage when centered
    
    // Clone the SVG multiple times
    for (let i = 0; i < numberOfCopies; i++) {
        const clonedSvg = originalSvg.cloneNode(true);
        lightsContainer.appendChild(clonedSvg);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const currentCopies = lightsContainer.querySelectorAll('.lights-svg').length;
        const newNumberOfCopies = Math.ceil(window.innerWidth / svgWidth) + 3;
        
        if (newNumberOfCopies > currentCopies) {
            // Add more copies if needed
            for (let i = currentCopies; i < newNumberOfCopies; i++) {
                const clonedSvg = originalSvg.cloneNode(true);
                lightsContainer.appendChild(clonedSvg);
            }
        }
    });

    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });
    }

    // Snowflake effect on Christmas hat click (only when Christmas theme is enabled)
    const logoLink = document.querySelector('.logo-link');
    
    if (logoLink) {
        logoLink.addEventListener('click', function(event) {
            // Only trigger snowflake effect if Christmas theme is enabled
            if (snowflakeEffectEnabled && christmasThemeEnabled) {
                // Prevent default link behaviour
                event.preventDefault();
                triggerSnowflakeEffect();
            }
        });
    }
});

// Create a single snowflake
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random size between 4-8px
    const size = Math.random() * 4 + 4;
    snowflake.style.width = size + 'px';
    snowflake.style.height = size + 'px';
    
    // Random horizontal position
    const leftPosition = Math.random() * 100;
    snowflake.style.left = leftPosition + '%';
    
    // Random animation duration (2-4 seconds)
    const duration = Math.random() * 2 + 2;
    snowflake.style.animationDuration = duration + 's';
    
    // Random delay (0-0.5 seconds)
    const delay = Math.random() * 0.5;
    snowflake.style.animationDelay = delay + 's';
    
    // Random horizontal drift (between -50px and 50px)
    const drift = (Math.random() - 0.5) * 100;
    snowflake.style.setProperty('--drift', drift + 'px');
    
    // Append to body
    document.body.appendChild(snowflake);
    
    // Remove after animation completes
    setTimeout(function() {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, (duration + delay) * 1000);
}

// Trigger snowflake effect with multiple snowflakes
function triggerSnowflakeEffect() {
    // Generate 20-30 snowflakes
    const numberOfSnowflakes = Math.floor(Math.random() * 11) + 20;
    
    for (let i = 0; i < numberOfSnowflakes; i++) {
        // Stagger creation slightly for natural effect
        setTimeout(function() {
            createSnowflake();
        }, i * 50);
    }
}
