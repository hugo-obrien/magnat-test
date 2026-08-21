document.addEventListener('DOMContentLoaded', function() {

    const start = new Date('2026-08-18T00:00:00').getTime()
    const deadline = new Date('2026-09-21T23:59:59').getTime();

    const countdownElement = document.querySelector('.hero__countdown');
    const progressBar = document.querySelector('.progress__bar');

    function updateTimer() {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance < 0) {
            countdownElement.textContent = 'Дедлайн прошел';
            if (progressBar) {
                progressBar.style.width = '100%';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formattedDays = String(days).padStart(2, '0');
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        countdownElement.textContent = `Осталось ${formattedDays} дней ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

        if (progressBar) {
            const totalDuration = deadline - start;
            const elapsed = now - start;
            const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
            progressBar.style.width = `${progress}%`;
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});