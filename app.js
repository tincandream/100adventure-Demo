let visitedStops = [];


// Load saved progress

if (localStorage.getItem("visitedStops")) {

    visitedStops =
    JSON.parse(localStorage.getItem("visitedStops"));

}



// Mark a stop as visited

function markVisited(stopIndex) {


    if (!visitedStops.includes(stopIndex)) {

        visitedStops.push(stopIndex);

    }


    localStorage.setItem(
        "visitedStops",
        JSON.stringify(visitedStops)
    );


    updateProgress();

}



// Update progress display

function updateProgress() {


    let progressText =
    document.getElementById("progress");


    if (!progressText) return;



    progressText.innerHTML =
    visitedStops.length +
    " / " +
    adventure.stops.length +
    " Stops Visited";


}



// Reset adventure (for testing)

function resetAdventure(){

    localStorage.removeItem("visitedStops");

    visitedStops = [];

    updateProgress();

}
