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
    const list = document.getElementById("career-search");
    // list.innerHTML = ""; 

    careersToDisplay.forEach((career) => {
        const option = document.createElement("option");
        
        // Use toLocaleString() for pretty currency formatting
        const formattedSalary = Number(career.Salary).toLocaleString();
        option.innerHTML = `<strong>${career.Occupation}</strong>: $${formattedSalary}`;
        option.value = Number(career.Salary);

        option.addEventListener("click", () => {
            document.getElementById("career-search").value = career.Occupation;
            list.innerHTML = ""; 
            
            // Tip: Save the salary to localStorage so 'budget.html' can use it
            localStorage.setItem("selectedSalary", career.Salary);
        });

        list.appendChild(option);
    });
}
// //looks like we have some duplicate code here. We can remove the budgetCareers function and just use getCareers to fetch and display the data. The renderList function can be used for both the initial display and the search filtering. Let's clean that up:
// async function getCareers() {
//     const url = "https://eecu-data-server.vercel.app/data";
//     try {
//         const response = await fetch(url);
//         allCareers = await response.json();
//         renderList(allCareers); // Display the full list on boot
//     } catch (error) {
//         console.error("Error fetching careers data:", error);
//     }
// }

// function renderList(careersToDisplay) {
//     const list = document.getElementById("search-list");
//     list.innerHTML = ""; 

//     careersToDisplay.forEach((career) => {
//         const li = document.createElement("li");
        
//         // Use toLocaleString() for pretty currency formatting
//         const formattedSalary = Number(career.Salary).toLocaleString();
//         li.innerHTML = `<strong>${career.Occupation}</strong>: $${formattedSalary}`;
        
//         li.addEventListener("click", () => {
//             document.getElementById("career-search").value = career.Occupation;
//             list.innerHTML = ""; 
            
//             // Save the salary to localStorage so 'budget.html' can use it
//             localStorage.setItem("selectedSalary", career.Salary);
//         });

//         list.appendChild(li);
//     });
// }

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
nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    let salary = Number(search.options[search.selectedIndex].value);
    let careerName = search.options[search.selectedIndex].text

    if (search.value != 0) {
        saveSelectedCareer(salary, careerName); // Save the selected career and salary to localStorage
        window.location.href = "budget.html"; // Navigate to the next page
    } else {
        alert("Please select a valid career from the list.");
    }
});

function saveSelectedCareer(salary, careerName) {
    console.log(salary, careerName);
    localStorage.setItem("selectedCareer", JSON.stringify(careerName));
    localStorage.setItem("selectedSalary", JSON.stringify(salary));
    console.log("Saved career:", careerName);
    console.log("Saved salary:", salary);
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

// document.addEventListener('DOMContentLoaded', init);