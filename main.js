document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters
    const counters = document.querySelectorAll('.counter');
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const currentText = counter.innerText.replace('$', '').replace(',', '');
            const count = parseFloat(currentText) || 0;
            const increment = target / 30; // Faster animation

            if (count < target) {
                const newValue = Math.min(target, count + increment);
                counter.innerText = (counter.innerText.includes('$') ? '$' : '') + 
                    (target % 1 === 0 ? Math.round(newValue).toLocaleString() : newValue.toFixed(2));
                setTimeout(animateCounters, 20);
            }
        });
    };

    animateCounters();

    // Mobile Sidebar Toggle (Simplified)
    window.toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('mobile-active');
    };
});