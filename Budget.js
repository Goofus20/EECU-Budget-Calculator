//convert annual income to monthly income
function loadSelectedSalary() {
    const M_income = document.getElementById("monthly-income-js");
    const A_income = document.getElementById("annual-income-js");

    const savedSalary = localStorage.getItem("selectedSalary");
    console.log(savedSalary);

    if (savedSalary) {
        const annual = parseFloat(savedSalary);
        const monthly = annual / 12;
    
   if (A_income) {
    console.log("iincome")
        A_income.innerText = annual.toLocaleString();
   }

   if (M_income) {
        M_income.innerText = monthly.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
            });
        }

        console.log("Budget loaded with Salary:", annual);
    } else {
        console.error("No salary found in localStorage!");
    }
}

loadSelectedSalary();