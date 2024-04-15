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
function updateSecondTable() {
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
            topContestants[currentCategory] = { contestant: null, votes: 0 };
            continue;
        }

        // Otherwise, consider it as a candidate row
        if (currentCategory) {
            const candidate = row.cells[0].textContent;
            const votes = parseInt(row.cells[1].textContent);

            // Check if the candidate has more votes than the current top contestant for the category
            if (votes > topContestants[currentCategory].votes) {
                topContestants[currentCategory] = { contestant: candidate, votes: votes };
            }
        }
    }

    // Populate the second table with the top-voted candidates' images
    const secondTableBody = document.getElementById('second-table-body');
    secondTableBody.innerHTML = ''; // Clear previous data

    // Iterate through the categories and create rows with images for top-voted candidates
    for (const [category, topContestant] of Object.entries(topContestants)) {
        // Create a row for each category
        const row = document.createElement('tr');
        
        // Create the first cell for the category
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        
        // Create the second cell for the top-voted contestant's name and image
        const contestantCell = document.createElement('td');
        if (topContestant.contestant) {
            // Add top-voted contestant's name
            const contestantNameElement = document.createElement('div');
            contestantNameElement.textContent = topContestant.contestant;
            contestantCell.appendChild(contestantNameElement);
            
            // Add the image for the contestant
            const imgElement = document.createElement('img');
            imgElement.src = `https://raw.githubusercontent.com/TiGRVoting/V-Website/e13bda73610b18605e7168020ae57dbc7e2803c4/Images/${topContestant.contestant.replace(/\s/g, '_').toLowerCase()}.png`;
            imgElement.alt = topContestant.contestant;
            imgElement.style.width = '100px';
            imgElement.style.height = '100px';
            imgElement.style.borderRadius = '5px';
            imgElement.style.cursor = 'pointer';
            
            // Add a click event to enlarge the image to fit the full screen
            imgElement.addEventListener('click', () => {
                // Create a full screen modal
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

                // Create an enlarged image element
                const enlargedImg = document.createElement('img');
                enlargedImg.src = imgElement.src;
                enlargedImg.alt = imgElement.alt;
                enlargedImg.style.maxWidth = '100%';
                enlargedImg.style.maxHeight = '100%';
                enlargedImg.style.objectFit = 'contain'; // Maintain aspect ratio and fit in screen
                enlargedImg.style.cursor = 'pointer';
                
                // Add a click event to close the modal
                enlargedImg.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Append the enlarged image to the modal
                modal.appendChild(enlargedImg);
                
                // Append the modal to the document body
                document.body.appendChild(modal);
            });

            contestantCell.appendChild(imgElement);
        } else {
            // Add a placeholder image for null values
            const imgElement = document.createElement('img');
            imgElement.src = 'https://raw.githubusercontent.com/TiGRVoting/V-Website/a880e9d7d71c826ed6beba70983fb6d3f649e7c8/Images/placeholder.png';
            imgElement.alt = 'Placeholder';
            imgElement.style.width = '100px';
            imgElement.style.height = '100px';
            imgElement.style.borderRadius = '5px';
            imgElement.style.cursor = 'pointer';
            
            // Add a click event to enlarge the image to fit the full screen
            imgElement.addEventListener('click', () => {
                // Create a full screen modal
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

                // Create an enlarged image element
                const enlargedImg = document.createElement('img');
                enlargedImg.src = imgElement.src;
                enlargedImg.alt = imgElement.alt;
                enlargedImg.style.maxWidth = '100%';
                enlargedImg.style.maxHeight = '100%';
                enlargedImg.style.objectFit = 'contain'; // Maintain aspect ratio and fit in screen
                enlargedImg.style.cursor = 'pointer';
                
                // Add a click event to close the modal
                enlargedImg.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Append the enlarged image to the modal
                modal.appendChild(enlargedImg);
                
                // Append the modal to the document body
                document.body.appendChild(modal);
            });

            contestantCell.appendChild(imgElement);
        }

        // Append the category and contestant cells to the row
        row.appendChild(categoryCell);
        row.appendChild(contestantCell);
        
        // Append the row to the second table body
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

// Call the function to populate Table 1 and Table 2 when the page loads
window.onload = function() {
    populateTable();
    populateSecondTable();
};
