// const data = [
//     { name: "John", math: 85, science: 90, english: 80 , hindi: 90},
//     { name: "Jane", math: 90, science: 95, english: 85, hindi: 90 },
//     { name: "Bob", math: 75, science: 80, english: 70, hindi: 90}
//     ];

const load = () => {
    var data = fetch("data.json", { mode: 'no-cors' })
        .then((response) => response.json());

    console.log(data);
    return data;
}

var data = load();
// Set up the table headers
const tableHeading = document.querySelector("#table-heading");
const tableBody = document.querySelector("#table-body");
const headings = Object.keys(data[0]);
headings.forEach(heading => {
    const th = document.createElement("th");
    th.textContent = heading;
    th.addEventListener("click", () => sortData(heading));
    tableHeading.appendChild(th);
});

// Set up the table body
function populateTable(data) {
    tableBody.innerHTML = "";
    data.forEach(student => {
        const tr = document.createElement("tr");
        headings.forEach(heading => {
            const td = document.createElement("td");
            td.textContent = student[heading];
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
populateTable(data);

// Sort the data based on the clicked heading
let sortColumn = null;
let sortOrder = 1; // 1 for ascending, -1 for descending
function sortData(column) {
    if (sortColumn === column) {
        sortOrder *= -1;
    } else {
        sortOrder = 1;
        sortColumn = column;
    }
    data.sort((a, b) => {
        if (a[column] < b[column]) return -1 * sortOrder;
        if (a[column] > b[column]) return 1 * sortOrder;
        return 0;
    });
    populateTable(data);
}