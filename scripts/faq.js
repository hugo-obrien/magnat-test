document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const summary = item.querySelector('.faq__question');

        summary.addEventListener('click', function(e) {
            e.preventDefault();

            if (item.hasAttribute('open')) {
                item.removeAttribute('open');
                return;
            }

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.removeAttribute('open');
                }
            });

            item.setAttribute('open', '');
        });
    });
});