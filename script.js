document.addEventListener('DOMContentLoaded', () => {
    const ledIndicator = document.getElementById('led-indicator');
    const statusText = document.getElementById('status-text');
    const onBtn = document.getElementById('on-btn');
    const offBtn = document.getElementById('off-btn');

    // Function to turn LED ON
    const turnOn = () => {
        ledIndicator.classList.add('active');
        statusText.textContent = 'System Online';

        // Haptic feedback if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    };

    // Function to turn LED OFF
    const turnOff = () => {
        ledIndicator.classList.remove('active');
        statusText.textContent = 'System Offline';

        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    };

    // Event Listeners
    onBtn.addEventListener('click', turnOn);
    offBtn.addEventListener('click', turnOff);

    // Initial state
    turnOff();
});
