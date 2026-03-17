//convert annual income to monthly income
const savedSalary = localStorage.getItem("selectedSalary");

function loadSelectedSalary() {
    const M_income = document.getElementById("monthly-income-js");
    const A_income = document.getElementById("annual-income-js");

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

const annual = parseFloat(savedSalary);
const monthly = annual / 12;
const SS = document.getElementById("ss");
const med = document.getElementById("medical");
const state = document.getElementById("state");
const fed = document.getElementById("federal");

let taxableinc = annual - 16100

let SStax = taxableinc * 0.062;
let Medtax = taxableinc * 0.0145;
let Statetax = taxableinc * 0.04;
let fedtax = 0;

function federalTax () {

    if (taxableinc <= 12400) {
        fedtax = taxableinc * 0.10;
    } else if (taxableinc <= 50400) {
        fedtax = (12400 * 0.1) + ((taxableinc - 12400) * 0.12);
    } else 
        fedtax = (12400 * 0.1) + ((50400 - 12400) * 0.12) + ((taxableinc - 50400) * 0.22);

        if (SS) {
    SS.innerText = SStax.toLocaleString();
    }
    if (med) {
    console.log("meds");
    med.innerText = Medtax.toLocaleString();
    }
    if (state) {
    state.innerText = Statetax.toLocaleString();
    }
    if (fed) {
    fed.innerText = fedtax.toLocaleString();
    }
}

federalTax();

function totalDeductions () {
    const total = document.getElementById("total");

    let d = SStax + Medtax + Statetax + fedtax + 180;

    if (total) {
        total.innerText = d.toLocaleString();
    }
}

totalDeductions();
    
function netincome () {
    const A_income = document.getElementById("y");
    const t = document.getElementById("t");
    const p = document.getElementById("paycheck");


        const annual = parseFloat(savedSalary);

   if (A_income) {
    console.log("iincome")
        A_income.innerText = annual.toLocaleString();
   }

            let deduct = SStax + Medtax + Statetax + fedtax + 180;

    if (t) {
        t.innerText = deduct.toLocaleString();
    }

        let c = annual - deduct;

        if (p) {
            console.log(c);
            p.innerText = c.toLocaleString();
        }
}

netincome();

function housePayment () {
    const M_income = document.getElementById("monthly");
    const payment = document.getElementById("payment");

    if (M_income) {
        M_income.innerText = monthly.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
            });
        }

        let pay = monthly * 0.33

        if (payment) {
            payment.innerText = pay.toLocaleString();
        }
}

housePayment();