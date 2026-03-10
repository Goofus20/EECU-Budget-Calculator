const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

let allJobs = []; // Global variable to store the fetched data

let allCareers = []; 

async function getCareers() {
    const url = "https://eecu-data-server.vercel.app/data";
    try {
        const response = await fetch(url);
        allCareers = await response.json();
        // We usually keep the list hidden until the user starts typing
    } catch (error) {
        console.error("Error fetching careers data:", error);
    }
}

function renderList(careersToDisplay) {
    const list = document.getElementById("search-list");
    list.innerHTML = ""; 

    // Optimization: If no search term or no results, just stop here
    if (careersToDisplay.length === 0) return;

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

    // If the user clears the search bar, clear the list and stop
    if (!searchTerm) {
        document.getElementById("search-list").innerHTML = "";
        return;
    }

    const filtered = allCareers.filter(career => 
        career.Occupation.toLowerCase().includes(searchTerm)
    );

    renderList(filtered);
});

getCareers();

document.addEventListener('DOMContentLoaded', init);