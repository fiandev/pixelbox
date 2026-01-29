// Mobile responsiveness verification
console.log("Pixel Studio loaded with mobile-responsive layout");

// Check viewport and report device type
function checkDeviceType() {
    const width = window.innerWidth;
    if (width < 640) {
        console.log(`Mobile device detected (width: ${width}px)`);
    } else if (width >= 640 && width < 768) {
        console.log(`Small tablet detected (width: ${width}px)`);
    } else if (width >= 768 && width < 1024) {
        console.log(`Tablet detected (width: ${width}px)`);
    } else {
        console.log(`Desktop detected (width: ${width}px)`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const pixelArtEditor = new PixelArtEditor();

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
});

// Add resize listener for responsive updates
window.addEventListener('resize', function() {
    // Throttle resize events to prevent performance issues
    clearTimeout(window.responsiveResizeTimer);
    window.responsiveResizeTimer = setTimeout(function() {
        if (typeof pixelArtEditor !== 'undefined' && pixelArtEditor.updateCanvasDisplaySize) {
            pixelArtEditor.updateCanvasDisplaySize();
        }
    }, 100);
});

// Toggle sidebar on mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

// Close sidebar when clicking on overlay
document.getElementById('overlay').addEventListener('click', toggleSidebar);

// Initialize menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-sidebar');

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', toggleSidebar);
  }
});