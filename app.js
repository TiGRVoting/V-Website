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
const fakeNames = {
    "cedar_captain_cont1": "Cedar Captain 1",
    "cedar_captain_cont2": "Cedar Captain 2",
    "cedar_captain_cont3": "Cedar Captain 3",
    "cedar_captain_cont4": "Cedar Captain 4",
    "cedar_vc_cont1": "Cedar Vice Captain 1",
    "cedar_vc_cont2": "Cedar Vice Captain 2",
    "cedar_vc_cont3": "Cedar Vice Captain 3",
    "cedar_vc_cont4": "Cedar Vice Captain 4",
    "maple_captain_cont1": "Maple Captain 1",
    "maple_captain_cont2": "Maple Captain 2",
    "maple_captain_cont3": "Maple Captain 3",
    "maple_captain_cont4": "Maple Captain 4",
    "maple_vc_cont1": "Maple Vice Captain 1",
    "maple_vc_cont2": "Maple Vice Captain 2",
    "maple_vc_cont3": "Maple Vice Captain 3",
    "maple_vc_cont4": "Maple Vice Captain 4",
    "oak_captain_cont1": "Oak Captain 1",
    "oak_captain_cont2": "Oak Captain 2",
    "oak_captain_cont3": "Oak Captain 3",
    "oak_captain_cont4": "Oak Captain 4",
    "oak_vc_cont1": "Oak Vice Captain 1",
    "oak_vc_cont2": "Oak Vice Captain 2",
    "oak_vc_cont3": "Oak Vice Captain 3",
    "oak_vc_cont4": "Oak Vice Captain 4",
    "pine_captain_cont1": "Pine Captain 1",
    "pine_captain_cont2": "Pine Captain 2",
    "pine_captain_cont3": "Pine Captain 3",
    "pine_captain_cont4": "Pine Captain 4",
    "pine_vc_cont1": "Pine Vice Captain 1",
    "pine_vc_cont2": "Pine Vice Captain 2",
    "pine_vc_cont3": "Pine Vice Captain 3",
    "pine_vc_cont4": "Pine Vice Captain 4",
    "prefect_boy_cont1": "Prefect Boy 1",
    "prefect_boy_cont2": "Prefect Boy 2",
    "prefect_boy_cont3": "Prefect Boy 3",
    "prefect_boy_cont4": "Prefect Boy 4",
    "prefect_girl_cont1": "Prefect Girl 1",
    "prefect_girl_cont2": "Prefect Girl 2",
    "prefect_girl_cont3": "Prefect Girl 3",
    "prefect_girl_cont4": "Prefect Girl 4",
    "student_council_cont1": "Student Council 1",
    "student_council_cont2": "Student Council 2",
    "student_council_cont3": "Student Council 3",
    "student_council_cont4": "Student Council 4"
};

// Function to fetch data and populate table
function populateTable() {
    onValue(resultRef, (snapshot) => {
        const resultData = snapshot.val();
        if (resultData) {
            const tableBody = document.getElementById("table-body");
            tableBody.innerHTML = ""; // Clear previous data
            Object.entries(resultData).forEach(([key, value]) => {
                const candidateName = fakeNames[key] || key; // Use fake name if available, else use identifier
                const votes = countTrueValues(value);
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `<td>${candidateName}</td><td>${votes}</td>`;
                tableBody.appendChild(tableRow);
            });

            // Call the function to update Table 2 once Table 1 data is retrieved
            updateSecondTable(resultData);
        }
    });
}

// Function to populate the second table with top-voted contestants in each category
function populateSecondTable() {
    // No need to populate initially, as it will be updated dynamically
}

// Function to update Table 2 with top-voted contestants for each category
function updateSecondTable(resultData) {
    const topContestants = {};

    // Iterate over the entries of the result data
    Object.entries(resultData).forEach(([key, value]) => {
        const category = getCategoryFromKey(key);
        const candidateName = fakeNames[key] || key;
        const votes = countTrueValues(value);

        if (!topContestants[category] || votes > topContestants[category].votes) {
            topContestants[category] = { contestant: candidateName, votes: votes };
        }
    });

    // Update Table 2 with the top-voted contestants
    const secondTableBody = document.getElementById("second-table-body");
    Object.entries(topContestants).forEach(([category, data]) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${category}</td><td>${data.contestant}</td>`;
        secondTableBody.appendChild(row);
    });
}

// Function to count true values in an object
function countTrueValues(obj) {
    return Object.values(obj).filter(value => value === true).length;
}

// Function to extract category from the key
function getCategoryFromKey(key) {
    const parts = key.split("_");
    return `${capitalize(parts[0])} ${capitalize(parts[1])}`;
}

// Function to capitalize the first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Call the function to populate Table 1 when the page loads
window.onload = function() {
    populateTable();
};
