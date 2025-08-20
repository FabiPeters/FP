document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        const targetClass = event.target.id.replace('toggle_', '');
        const targetElements = document.getElementsByClassName(targetClass);
        if (event.target.checked) {
            for (const el of targetElements) {
                el.classList.add("highlight");
            }
        } else {
            for (const el of targetElements) {
                el.classList.remove("highlight");
            }
        }

    });
});