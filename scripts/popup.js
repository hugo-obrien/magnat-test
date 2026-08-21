document.addEventListener('DOMContentLoaded', function() {
    const popups = {};

    function initPopup(popupId) {
        const overlay = document.getElementById(popupId);
        if (!overlay) return;

        const popup = overlay.querySelector('.popup');
        const closeBtn = overlay.querySelector('.popup__close');

        popups[popupId] = {
            overlay: overlay,
            popup: popup,
            closeBtn: closeBtn
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closePopup(popupId);
            });
        }

        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup(popupId);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activePopup = document.querySelector('.popup-overlay.active');
                if (activePopup) {
                    closePopup(activePopup.id);
                }
            }
        });
    }

    function openPopup(popupId) {
        document.querySelectorAll('.popup-overlay.active').forEach(p => {
            p.classList.remove('active');
        });

        const popupData = popups[popupId];
        if (!popupData) return;

        popupData.overlay.classList.add('active');

        if (popupId === 'application-popup') {
            openApplicationPopup(popupData);
        }
    }

    function closePopup(popupId) {
        const popupData = popups[popupId];
        if (!popupData) return;

        popupData.overlay.classList.remove('active');
        document.body.style.overflow = '';

        if (popupId === 'application-popup') {
            closeApplicationPopup(popupData);
        }
    }

    document.querySelectorAll('.popup-overlay')
        .forEach(overlay => {
            initPopup(overlay.id);
        });

    document.querySelectorAll('[data-popup]')
        .forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const popupId = btn.dataset.popup;
                openPopup(popupId);
            })
        })

    const applyPopup = document.getElementById('application-popup');
    if (applyPopup) {
        const form = applyPopup.querySelector('#popupForm');
        const email = applyPopup.querySelector('#popupEmail');
        const success = applyPopup.querySelector('#popupSuccess');

        if (form && email && success) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const emailValue = email.value.trim();

                if (!emailValue) {
                    email.classList.add('error');
                    email.placeholder = 'Введите email';
                    return;
                }

                if (!isValidEmail(emailValue)) {
                    email.classList.add('error');
                    email.value = '';
                    email.placeholder = 'Введите корректный email';
                    return;
                }

                email.classList.remove('error');

                form.classList.add('success');
                success.classList.add('active');

                setTimeout(function() {
                    closePopup('application-popup');
                }, 3000);
            });

            email.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    this.placeholder = 'Введите ваш email';
                }
            });
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function openApplicationPopup(popupData) {
        const form = popupData.overlay.querySelector('#popupForm');
        const email = popupData.overlay.querySelector('#popupEmail');
        const success = popupData.overlay.querySelector('#popupSuccess');
        if (form && email && success) {
            resetApplyForm(form, email, success);
            setTimeout(() => email.focus(), 300);
        }
    }

    function closeApplicationPopup(popupData) {
        const form = popupData.overlay.querySelector('#popupForm');
        const email = popupData.overlay.querySelector('#popupEmail');
        const success = popupData.overlay.querySelector('#popupSuccess');
        if (form && email && success) {
            setTimeout(() => resetApplyForm(form, email, success), 400);
        }
    }

    function resetApplyForm(form, email, success) {
        form.classList.remove('success');
        email.classList.remove('error');
        email.value = '';
        success.classList.remove('active');
    }
});