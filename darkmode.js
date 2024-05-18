const dark_mode = document.getElementById("darkmode");
dark_mode.addEventListener('click', toggleTheme);

function toggleTheme(event) {
    event.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    document.body.style.backgroundColor = newTheme === 'dark' ? '#121212' : '#fff';

    document.getElementById("timefield").classList.toggle('border-dark');
    document.getElementById("srcTimeZone").classList.toggle('border-dark');
    document.getElementById("desTimeZone").classList.toggle('border-dark');
    if (newTheme == 'light') {
        document.getElementById("submitButton").classList.remove('btn-outline-primary');
        document.getElementById("submitButton").classList.add('btn-primary');
        document.getElementById("header").classList.add("text-light");
        document.getElementById("header").classList.remove("text-dark");
    }
    else {
        document.getElementById("submitButton").classList.remove('btn-primary');
        document.getElementById("submitButton").classList.add('btn-outline-primary');
        document.getElementById("header").classList.remove("text-light");
        document.getElementById("header").classList.add("text-dark");
    }

    //TODO: fix css for dark mode
}
