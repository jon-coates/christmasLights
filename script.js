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

// Clone the SVG pattern to fill the navbar width
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Christmas theme from localStorage
    const savedPreference = localStorage.getItem('christmasThemeEnabled');
    if (savedPreference !== null) {
        christmasThemeEnabled = savedPreference === 'true';
    }
    
    // Set initial state for grinch mode toggle (inverse of Christmas theme)
    const grinchModeToggle = document.getElementById('grinch-mode-toggle');
    
    if (grinchModeToggle) {
        // Grinch mode is ON when Christmas theme is OFF
        grinchModeToggle.checked = !christmasThemeEnabled;
        updateChristmasTheme(christmasThemeEnabled);
        
        // Add event listener for grinch mode toggle
        grinchModeToggle.addEventListener('change', function() {
            // Grinch mode ON = Christmas theme OFF
            christmasThemeEnabled = !grinchModeToggle.checked;
            updateChristmasTheme(christmasThemeEnabled);
            localStorage.setItem('christmasThemeEnabled', christmasThemeEnabled.toString());
        });
    }
    
    // User menu toggle
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    
    if (userMenuButton && userMenu) {
        // Function to position the menu
        function positionMenu() {
            if (userMenu.classList.contains('active')) {
                const buttonRect = userMenuButton.getBoundingClientRect();
                userMenu.style.top = (buttonRect.bottom + 8) + 'px';
                
                // Calculate right position to align with button's right edge
                const rightPosition = window.innerWidth - buttonRect.right;
                
                // Ensure menu doesn't go off the right edge (minimum 16px padding)
                if (rightPosition < 16) {
                    userMenu.style.right = '16px';
                } else {
                    userMenu.style.right = rightPosition + 'px';
                }
                userMenu.style.left = 'auto';
            }
        }
        
        userMenuButton.addEventListener('click', function(event) {
            event.stopPropagation();
            const wasActive = userMenu.classList.contains('active');
            userMenu.classList.toggle('active');
            
            if (userMenu.classList.contains('active')) {
                // Menu is now open, position it
                positionMenu();
            }
            // If it was active and now it's not, the toggle closed it (no action needed)
        });
        
        // Reposition on scroll or resize (only when menu is open)
        window.addEventListener('scroll', function() {
            if (userMenu.classList.contains('active')) {
                positionMenu();
            }
        });
        window.addEventListener('resize', function() {
            if (userMenu.classList.contains('active')) {
                positionMenu();
            }
        });
        
        // Close menu when clicking outside (but not when clicking the button itself)
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = userMenu.contains(event.target);
            const isClickOnButton = userMenuButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && userMenu.classList.contains('active')) {
                userMenu.classList.remove('active');
            }
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

    // Snowflake and sleigh effects on Santa hat click (only when Christmas theme is enabled)
    const logoLink = document.querySelector('.logo-link');
    const santaHat = document.querySelector('.santa-hat');
    
    // Click counter for sleigh animation (only shows on 5th click)
    let santaHatClickCount = 0;
    
    // Sleigh zoom and snowflake effect on Santa hat click
    if (santaHat) {
        santaHat.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            // Only trigger effects if Christmas theme is enabled
            if (christmasThemeEnabled) {
                santaHatClickCount++;
                // Only trigger sleigh on 5th click
                if (santaHatClickCount === 5) {
                    triggerSleighZoom();
                    santaHatClickCount = 0; // Reset counter after sleigh appears
                }
                // Always trigger snow on every click
                if (snowflakeEffectEnabled) {
                    triggerSnowflakeEffect();
                }
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

// Trigger sleigh zoom animation
function triggerSleighZoom() {
    // Create sleigh image element
    const sleigh = document.createElement('img');
    sleigh.src = 'assets/slay.png';
    sleigh.className = 'sleigh-zoom';
    sleigh.alt = 'Santa\'s sleigh';
    
    // Set initial size
    sleigh.style.width = '300px';
    sleigh.style.height = 'auto';
    
    // Append to body
    document.body.appendChild(sleigh);
    
    // Remove after animation completes
    setTimeout(function() {
        if (sleigh.parentNode) {
            sleigh.parentNode.removeChild(sleigh);
        }
    }, 3000);
}
