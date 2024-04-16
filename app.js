// Import Firebase SDK version 9 modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDy-x6jIFpY-Kb4rsCk1-0SRTwSQlD2R3E",
    authDomain: "voting-system-gugan.firebaseapp.com",
    databaseURL: "https://voting-system-gugan-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "voting-system-gugan",
    storageBucket: "voting-system-gugan.appspot.com",
    messagingSenderId: "1044881782390",
    appId: "1:1044881782390:web:571667c95213fc7a5f9157",
    measurementId: "G-4V53TMFQCB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebaseApp);

// Reference to the "result" node in your database
const resultRef = ref(database, "result");

// Mapping of fake names to identifiers
const Names = {
    "cedar_captain_cont1": "KAVYA SA",
    "cedar_captain_cont2": "ADHAV K",
    "cedar_captain_cont3": "Cedar Captain 3",
    "cedar_captain_cont4": "Cedar Captain 4",
    "cedar_vc_cont1": "NAMRRUTHA S",
    "cedar_vc_cont2": "Cedar Vice Captain 2",
    "cedar_vc_cont3": "Cedar Vice Captain 3",
    "cedar_vc_cont4": "Cedar Vice Captain 4",
    "maple_captain_cont1": "ATHULVINAYAK PRADEEP",
    "maple_captain_cont2": "ARNAV",
    "maple_captain_cont3": "Maple Captain 3",
    "maple_captain_cont4": "Maple Captain 4",
    "maple_vc_cont1": "SHASHANG R",
    "maple_vc_cont2": "Maple Vice Captain 2",
    "maple_vc_cont3": "Maple Vice Captain 3",
    "maple_vc_cont4": "Maple Vice Captain 4",
    "oak_captain_cont1": "RISHAAN R RANKA",
    "oak_captain_cont2": "JAYANTH CB",
    "oak_captain_cont3": "ADITYA ASHOK",
    "oak_captain_cont4": "Oak Captain 4",
    "oak_vc_cont1": "HAASHINI PRIYA CP",
    "oak_vc_cont2": "SIVNETHRAN SK",
    "oak_vc_cont3": "Oak Vice Captain 3",
    "oak_vc_cont4": "Oak Vice Captain 4",
    "pine_captain_cont1": "DHAIRYA BAGRI",
    "pine_captain_cont2": "NEBIN BOSE B",
    "pine_captain_cont3": "Pine Captain 3",
    "pine_captain_cont4": "Pine Captain 4",
    "pine_vc_cont1": "VINAYA SELVARAJ",
    "pine_vc_cont2": "MAHI KISHORE SETHIA",
    "pine_vc_cont3": "Pine Vice Captain 3",
    "pine_vc_cont4": "Pine Vice Captain 4",
    "prefect_boy_cont1": "HARSHAVARDHAN G",
    "prefect_boy_cont2": "SANJAY R",
    "prefect_boy_cont3": "Prefect Boy 3",
    "prefect_boy_cont4": "Prefect Boy 4",
    "prefect_girl_cont1": "MAANYA R JAIN",
    "prefect_girl_cont2": "DHARANNIKA GR",
    "prefect_girl_cont3": "Prefect Girl 3",
    "prefect_girl_cont4": "Prefect Girl 4",
    "student_council_cont1": "PRANITHA PRABU",
    "student_council_cont2": "SREE SHRAVAN K",
    "student_council_cont3": "GAURAV AGARWAL",
    "student_council_cont4": "Student Council 4"
};

// Function to fetch data and populate table
function populateTable() {
    onValue(resultRef, (snapshot) => {
        // Clear previous data
        document.getElementById("table-body").innerHTML = "";

        // Define categories and their respective contestants
        const categoryContestants = {
            "Boy Prefect": ["prefect_boy_cont1", "prefect_boy_cont2"],
            "Girl Prefect": ["prefect_girl_cont1", "prefect_girl_cont2" ],
            "Student Council": ["student_council_cont1", "student_council_cont2", "student_council_cont3"],
            "Pine Captain": ["pine_captain_cont1", "pine_captain_cont2"],
            "Pine Vice Captain": ["pine_vc_cont1", "pine_vc_cont2"],
            "Cedar Captain": ["cedar_captain_cont1", "cedar_captain_cont2"],
            "Cedar Vice Captain": ["cedar_vc_cont1"],
            "Maple Captain": ["maple_captain_cont1", "maple_captain_cont2"],
            "Maple Vice Captain": ["maple_vc_cont1"],
            "Oak Captain": ["oak_captain_cont1", "oak_captain_cont2", "oak_captain_cont3"],
            "Oak Vice Captain": ["oak_vc_cont1", "oak_vc_cont2"]
        };

        // Loop through categories
        Object.entries(categoryContestants).forEach(([category, contestants]) => {
            const categoryVotes = contestants.map(contestant => {
                const candidateName = Names[contestant] || contestant;
                const votes = countTrueValues(snapshot.val()[contestant]);
                return `<tr><td>${candidateName}</td><td>${votes}</td></tr>`;
            }).join(""); // Join contestant votes for this category into a single string

            // Append category votes to table body
            document.getElementById("table-body").innerHTML += `
                <tr>
                    <td colspan="2" style="background-color: black; color: white; font-weight: bold;">${category}</td>
                </tr>
                ${categoryVotes}
            `;
        });

        // After populating the table, update the second table
        updateSecondTable();
    });
}

// Function to populate the second table with top-voted contestants in each category
// Function to populate the second table with top-voted contestants in each category
// Function to populate the second table with top-voted contestants in each category
function populateSecondTable() {
    const secondTableBody = document.getElementById('second-table-body');
    secondTableBody.innerHTML = ''; // Clear previous data

    // Predefined array of category names
    const categories = [
        "Boy Prefect",
        "Girl Prefect",
        "Student Council",
        "Pine Captain",
        "Pine Vice Captain",
        "Cedar Captain",
        "Cedar Vice Captain",
        "Maple Captain",
        "Maple Vice Captain",
        "Oak Captain",
        "Oak Vice Captain"
    ];

    // Populate the second table with top-voted contestants for each category
    categories.forEach(category => {
        const row = document.createElement('tr');
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        const contestantCell = document.createElement('td');
        contestantCell.textContent = "null"; // Initially set as "null"
        row.appendChild(categoryCell);
        row.appendChild(contestantCell);
        secondTableBody.appendChild(row);
    });
}

// Function to update Table 2 with top-voted contestants for each category
// Function to update Table 2 with top-voted contestants for each category
function updateSecondTable() {
    console.log("Updating second table...");
    const topContestants = {};

    // Iterate through the rows of Table 1
    let currentCategory = null;
    const tableRows = document.querySelectorAll('#table-body tr');

    // Gather top-voted contestants for each category
    for (const row of tableRows) {
        // Check if the row is a category header (background color is black)
        if (row.cells.length === 1 && row.cells[0].style.backgroundColor === 'black') {
            currentCategory = row.cells[0].textContent.trim();
            // Initialize top contestant for the category
            topContestants[currentCategory] = [];
        } else if (currentCategory) {
            // Otherwise, consider it as a candidate row
            const candidate = row.cells[0].textContent;
            const votes = parseInt(row.cells[1].textContent);

            if (topContestants[currentCategory].length === 0) {
                topContestants[currentCategory].push({ contestant: candidate, votes: votes });
            } else {
                // Check for ties or more votes
                const maxVotes = topContestants[currentCategory][0].votes;
                
                if (votes > maxVotes) {
                    // New top vote count, clear existing entries
                    topContestants[currentCategory] = [{ contestant: candidate, votes: votes }];
                } else if (votes === maxVotes) {
                    // Tie, add the contestant to the list
                    topContestants[currentCategory].push({ contestant: candidate, votes: votes });
                }
            }
        }
    }

    // Populate the second table with the top-voted candidates' names and images
    const secondTableBody = document.getElementById('second-table-body');
    secondTableBody.innerHTML = ''; // Clear previous data

    // Iterate through the categories and create rows with top-voted candidates
    for (const [category, topContestantsArray] of Object.entries(topContestants)) {
        const row = document.createElement('tr');
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);
        
        const contestantCell = document.createElement('td');
        
        topContestantsArray.forEach(topContestant => {
            const contestantNameElement = document.createElement('div');
            contestantNameElement.textContent = topContestant.contestant;
            contestantCell.appendChild(contestantNameElement);

            const imgElement = document.createElement('img');
            imgElement.src = getImageURL(topContestant.contestant);
            imgElement.alt = topContestant.contestant;
            imgElement.style.width = '100px';
            imgElement.style.height = '100px';
            imgElement.style.borderRadius = '5px';

            // Add a click event to enlarge the image
            imgElement.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = 0;
                modal.style.left = 0;
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '9999';

                const enlargedImg = document.createElement('img');
                enlargedImg.src = imgElement.src;
                enlargedImg.alt = imgElement.alt;
                enlargedImg.style.maxWidth = '90%';
                enlargedImg.style.maxHeight = '90%';
                enlargedImg.style.objectFit = 'contain';
                enlargedImg.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });

                modal.appendChild(enlargedImg);
                document.body.appendChild(modal);
            });

            contestantCell.appendChild(imgElement);
        });

        row.appendChild(contestantCell);
        secondTableBody.appendChild(row);
    }
}
// Function to count true values in an object
function countTrueValues(obj) {
    return Object.values(obj).filter(value => value === true).length;
}

// Function to extract category from contestant name
function getCategoryFromContestant(contestant) {
    // Extract category from the contestant name (e.g., "prefect_boy_cont1" -> "Boy Prefect")
    const category = contestant.split("_")[0] + " " + contestant.split("_")[1];
    return category;
}
// Function to retrieve the image URL based on the contestant name
function getImageURL(contestant) {
    // Define the image URLs based on the contestant name
    const imageUrls = {
        "KAVYA SA": "https://github.com/TiGRVoting/V-Website/blob/e13bda73610b18605e7168020ae57dbc7e2803c4/Images/thrivikram.png",
        // Add other contestant names and their image URLs here
    };
    // Return the image URL for the given contestant name, or a placeholder URL if not found
    return imageUrls[contestant] || "https://github.com/TiGRVoting/V-Website/blob/a880e9d7d71c826ed6beba70983fb6d3f649e7c8/Images/placeholder";
}

// Call the function to populate Table 1 and Table 2 when the page loads
window.onload = function() {
    populateTable();
    populateSecondTable(); // Call populateSecondTable before updateSecondTable
    updateSecondTable();
};
