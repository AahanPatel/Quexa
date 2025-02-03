function createLeaderboard(username, points) {
    const leaderboardList = document.querySelector(".leaderboard-list");

    if (!leaderboardList) {
        console.error("leaderboard-list not found!");
        return;
    }

    const entry = document.createElement("div");
    entry.classList.add("leaderboard-entry");

    const entryUsername = document.createElement("h1");
    entryUsername.classList.add("username");
    entryUsername.textContent = username;

    const entryPoints = document.createElement("h2");
    entryPoints.classList.add("points");
    entryPoints.textContent = points + " gold";

    entry.appendChild(entryUsername);
    entry.appendChild(entryPoints);
    leaderboardList.appendChild(entry);
}

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < 5; i++) {
        createLeaderboard("User " + i, i * 5);
    }
});
