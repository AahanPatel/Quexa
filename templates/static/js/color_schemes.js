document.addEventListener("DOMContentLoaded", () => {

    var root = document.documentElement;


    function setTheme(theme) {
        if (theme == "main") {
            root.style.setProperty('--primary-5', '#051421');
            root.style.setProperty('--primary-4', '#06242f');
            root.style.setProperty('--primary-3', '#4c7272');
            root.style.setProperty('--primary-2', '#86b9b0');
            root.style.setProperty('--primary-1', '#cfd7d7');
            root.style.setProperty('--secondary-3', '#c45f30');
            root.style.setProperty('--secondary-2', '#cc9148');
            root.style.setProperty('--secondary-1', '#d4aa62');
        }
        else if (theme == "pink") {
            root.style.setProperty('--primary-5', '#0d0a33');
            root.style.setProperty('--primary-4', '#4c2f6f');
            root.style.setProperty('--primary-3', '#52489e');
            root.style.setProperty('--primary-2', '#c266a7');
            root.style.setProperty('--primary-1', '#e8c8e8');
            root.style.setProperty('--secondary-3', '#65bdc2');
            root.style.setProperty('--secondary-2', '#3c7c8f');
            root.style.setProperty('--secondary-1', '#235070'); 
            root.style.setProperty('--darkest-color', '#0f0f0f');
            root.style.setProperty('--darkest-color-rgba', '15, 15, 15');
        }
        else if (theme == "pink") {
            root.style.setProperty('--primary-5', '#0d0a33');
            root.style.setProperty('--primary-4', '#4c2f6f');
            root.style.setProperty('--primary-3', '#52489e');
            root.style.setProperty('--primary-2', '#c266a7');
            root.style.setProperty('--primary-1', '#e8c8e8');
            root.style.setProperty('--secondary-3', '#65bdc2');
            root.style.setProperty('--secondary-2', '#3c7c8f');
            root.style.setProperty('--secondary-1', '#235070'); 
            root.style.setProperty('--darkest-color', '#0f0f0f');
            root.style.setProperty('--darkest-color-rgba', '15, 15, 15');
        }
        else if (theme == "night cafe") {
            root.style.setProperty('--primary-5', '#232220');
            root.style.setProperty('--primary-4', '#4e4c4f');
            root.style.setProperty('--primary-3', '#9f8d8d');
            root.style.setProperty('--primary-2', '#d9ae8e');
            root.style.setProperty('--primary-1', '#ffddba');
            root.style.setProperty('--secondary-3', '#5b4a29');
            root.style.setProperty('--secondary-2', '#8b5b29');
            root.style.setProperty('--secondary-1', '#d9cbae');
            root.style.setProperty('--darkest-color', '#121212');
            root.style.setProperty('--darkest-color-rgba', '18, 18, 18');
        }

        localStorage.setItem("theme", theme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "main"; // Default to 'main' if not set
        setTheme(savedTheme);
    }

    loadTheme();

    document.getElementById("main-theme-button")?.addEventListener("click", () => setTheme("main"));
    document.getElementById("pink-theme-button")?.addEventListener("click", () => setTheme("pink"));
    document.getElementById("night-cafe-theme-button")?.addEventListener("click", () => setTheme("night cafe"));
})