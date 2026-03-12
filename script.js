const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

let allJobs = []; // Global variable to store the fetched data
let allCareers = []; 
const search = document.getElementById("career-search");
const nextButton = document.getElementById("nxt-career");
let selectedCareer = "";
let selectedSalary = 0;


async function getCareers() {
    const url = "https://eecu-data-server.vercel.app/data";
    try {
        const response = await fetch(url);
        allCareers = await response.json();
        renderList(allCareers); //displays the full list on boot (while the search bar is empty)
        // We usually keep the list hidden until the user starts typing
    } catch (error) {
        console.error("Error fetching careers data:", error);
    }
}

function renderList(careersToDisplay) {
    const list = document.getElementById("search-list");
    list.innerHTML = ""; 


    careersToDisplay.forEach((career) => {
        const li = document.createElement("li");
        
        // Use toLocaleString() for pretty currency formatting
        const formattedSalary = Number(career.Salary).toLocaleString();
        li.innerHTML = `<strong>${career.Occupation}</strong>: $${formattedSalary}`;
        
        li.addEventListener("click", () => {
            document.getElementById("career-search").value = career.Occupation;
            list.innerHTML = ""; 
            
            // Tip: Save the salary to localStorage so 'budget.html' can use it
            localStorage.setItem("selectedSalary", career.Salary);
        });

        list.appendChild(li);
    });
}

document.getElementById("career-search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // If the user clears the search bar, show all careers
    if (!searchTerm) {
        renderList(allCareers);
        return;
    };

    const filtered = allCareers.filter(career => 
        career.Occupation.toLowerCase().includes(searchTerm)
    );

    renderList(filtered);
});

//prevents the user from progressing if there is no career from the list selected
nextButton.addEventListener("click", () => {
    const searchTerm = search.value.toLowerCase();
    const matchedCareer = allCareers.find(career => 
        career.Occupation.toLowerCase() === searchTerm
    );

    if (matchedCareer) {
        selectedCareer = matchedCareer.Occupation;
        selectedSalary = matchedCareer.Salary;
        saveSelectedCareer(); // Save the selected career and salary to localStorage
        window.location.href = "budget.html"; // Navigate to the next page
    } else {
        alert("Please select a valid career from the list.");
    }
});

function saveSelectedCareer() {
    localStorage.setItem("selectedCareer", JSON.stringify(selectedCareer));
    localStorage.setItem("selectedSalary", JSON.stringify(selectedSalary));
    console.log("Saved career:", selectedCareer);
    console.log("Saved salary:", selectedSalary);
};

function loadSelectedCareer() {
    const savedCareer = localStorage.getItem("selectedCareer");
    const savedSalary = localStorage.getItem("selectedSalary");
    if (savedCareer && savedSalary) {
        selectedCareer = JSON.parse(savedCareer);
        selectedSalary = JSON.parse(savedSalary);
        console.log("Loaded career:", selectedCareer);
        console.log("Loaded salary:", selectedSalary);
    }
};


getCareers();

document.addEventListener('DOMContentLoaded', init);