const dark_mode = document.getElementById("dark-mode");
const submitButton = document.getElementById("submitButton");

dark_mode.addEventListener('click', toggleTheme);

function toggleTheme(event) {
    event.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    document.body.style.backgroundColor = newTheme === 'dark' ? '#121212' : '#fff';


    document.getElementById("timefield").classList.toggle('border-dark');

    document.getElementById("srcTimeZoneArea").classList.toggle('border-dark');
    document.getElementById("srcTimeZoneLocation").classList.toggle('border-dark');

    document.getElementById("desTimeZoneArea").classList.toggle('border-dark');
    document.getElementById("desTimeZoneLocation").classList.toggle('border-dark');

    if (newTheme == 'light') {
        document.getElementById("submitButton").classList.remove('btn-outline-primary');
        document.getElementById("submitButton").classList.add('btn-primary');

        document.getElementById("l1").classList.remove("text-light");
        document.getElementById("l1").classList.add("text-dark");

        document.getElementById("l2").classList.remove("text-light");
        document.getElementById("l2").classList.add("text-dark");
    }
    else {
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-outline-primary');
        
        document.getElementById("l1").classList.add("text-light");
        document.getElementById("l1").classList.remove("text-dark");

        document.getElementById("l2").classList.add("text-light");
        document.getElementById("l2").classList.remove("text-dark");
    }

}
