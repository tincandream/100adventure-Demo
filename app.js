"use strict";

let currentAdventure = null;

/* ==================================================
   ADVENTURE SELECTION
================================================== */

function getAdventureIdFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return params.get("id") || "alabama-scenic-byway";
}

function getCurrentAdventure() {
    if (
        typeof adventures === "undefined" ||
        !Array.isArray(adventures)
    ) {
        console.error(
            "[100 Adventure] adventures.js did not load correctly."
        );

        return null;
    }

    const adventureId = getAdventureIdFromUrl();

    return (
        adventures.find(
            adventure => adventure.id === adventureId
        ) ||
        adventures[0] ||
        null
    );
}

/* ==================================================
   DOM HELPERS
================================================== */

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value, fallback = "") {
    const element = getElement(id);

    if (!element) {
        return;
    }

    element.textContent =
        value !== undefined &&
        value !== null &&
        value !== ""
            ? value
            : fallback;
}

function setImage(id, source, altText) {
    const image = getElement(id);

    if (!image) {
        return;
    }

    image.alt = altText || "Adventure image";

    if (!source) {
        image.hidden = true;
        return;
    }

    image.src = source;
    image.hidden = false;

    image.addEventListener(
        "error",
        function () {
            image.hidden = true;

            console.warn(
                `[100 Adventure] Image could not be loaded: ${source}`
            );
        },
        { once: true }
    );
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* ==================================================
   MAIN RENDER
================================================== */

function renderAdventure() {
    currentAdventure = getCurrentAdventure();

    if (!currentAdventure) {
        showAdventureNotFound();
        return;
    }

    document.title =
        `${currentAdventure.title} | 100 Adventure`;

    renderHeader();
    renderOverview();
    renderStops();
    renderTreasureLists();
    renderLocalFind();
    renderPlaylist();
    updateProgress();
}

function showAdventureNotFound() {
    setText("title", "Adventure Not Found");

    setText(
        "description",
        "This adventure could not be loaded. Return to Explore and choose another journey."
    );

    const stopsList = getElement("stopsList");

    if (stopsList) {
        stopsList.innerHTML = `
            <article class="issue-paper-card">
                <h2>Adventure unavailable</h2>

                <p>
                    The adventure ID may be missing or incorrect.
                </p>

                <a class="button" href="explore.html">
                    Return to Explore
                </a>
            </article>
        `;
    }
}

/* ==================================================
   HEADER
================================================== */

function renderHeader() {
    const routeStart =
        currentAdventure.routeStart || "Start";

    const routeEnd =
        currentAdventure.routeEnd || "Finish";

    setText(
        "theme",
        currentAdventure.theme,
        "Road Trip"
    );

    setText(
        "title",
        currentAdventure.title,
        "Official Adventure"
    );

    const details = [
        currentAdventure.distance,
        currentAdventure.duration,
        currentAdventure.location
    ]
        .filter(Boolean)
        .join(" · ");

    setText("details", details);

    setText("routeStart", routeStart);
    setText("routeEnd", routeEnd);

    setImage(
        "coverImage",
        currentAdventure.cover ||
            currentAdventure.coverImage,
        `${currentAdventure.title} adventure cover`
    );

    const issueNumber =
        currentAdventure.issueNumber || "001";

    const mastheadIssue =
        document.querySelector(
            ".issue-masthead__top span"
        );

    if (mastheadIssue) {
        mastheadIssue.textContent =
            `Issue No. ${issueNumber}`;
    }

    const colophon =
        document.querySelector(
            ".issue-colophon span"
        );

    if (colophon) {
        colophon.textContent =
            `Issue No. ${issueNumber} · ${currentAdventure.title}`;
    }
}

/* ==================================================
   OVERVIEW
================================================== */

function renderOverview() {
    setText(
        "description",
        currentAdventure.description
    );

    setText(
        "distanceFact",
        currentAdventure.distance,
        "Distance coming soon"
    );

    setText(
        "durationFact",
        currentAdventure.duration,
        "Travel time coming soon"
    );

    setText(
        "seasonFact",
        currentAdventure.bestSeason,
        "Year-round"
    );

    setText(
        "bestTime",
        currentAdventure.bestTime ||
            currentAdventure.preparationNotes ||
            currentAdventure.bestSeason ||
            "Travel when the weather feels comfortable and leave room for unplanned stops."
    );
}

/* ==================================================
   STOPS
================================================== */

function renderStops() {
    const container = getElement("stopsList");

    if (!container) {
        return;
    }

    const stops =
        Array.isArray(currentAdventure.stops)
            ? currentAdventure.stops
            : [];

    if (stops.length === 0) {
        container.innerHTML = `
            <article class="issue-paper-card">
                <p>No stops have been added yet.</p>
            </article>
        `;

        return;
    }

    container.innerHTML = stops
        .map(
            (stop, index) =>
                createStopMarkup(stop, index)
        )
        .join("");

    container
        .querySelectorAll(
            ".stop-complete-button"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                function () {
                    toggleStopComplete(
                        Number(
                            button.dataset.stopIndex
                        )
                    );
                }
            );
        });

    refreshStopButtons();
}

function createStopMarkup(stop, index) {
    const collectItems =
        Array.isArray(stop.collect) &&
        stop.collect.length
            ? `
                <div class="stop-card__collect">

                    <p class="section-marker">
                        Collect Along the Way
                    </p>

                    <ul>
                        ${stop.collect
                            .map(
                                item =>
                                    `<li>${escapeHtml(
                                        item
                                    )}</li>`
                            )
                            .join("")}
                    </ul>

                </div>
            `
            : "";

    const visitTime = stop.visitTime
        ? `
            <p class="stop-card__time">

                <strong>
                    Suggested time:
                </strong>

                ${escapeHtml(stop.visitTime)}

            </p>
        `
        : "";

    const slowDown = stop.slowDown
        ? `
            <div class="stop-card__prompt">

                <p class="section-marker">
                    Slow Down
                </p>

                <p>
                    ${escapeHtml(stop.slowDown)}
                </p>

            </div>
        `
        : "";

    const mapLink = stop.map
        ? `
            
                class="button button--outline"
                href="${escapeHtml(stop.map)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open in Maps
            </a>
        `
        : "";

    return `
        <article
            class="stop-card"
            data-stop-index="${index}"
        >

            <header class="stop-card__header">

                <p class="section-marker">
                    Stop ${index + 1}
                </p>

                ${
                    stop.type
                        ? `
                            <span class="stop-card__type">
                                ${escapeHtml(stop.type)}
                            </span>
                        `
                        : ""
                }

                <h3>
                    ${escapeHtml(
                        stop.name ||
                            `Stop ${index + 1}`
                    )}
                </h3>

                ${
                    stop.chapter
                        ? `
                            <p class="stop-card__chapter">
                                ${escapeHtml(
                                    stop.chapter
                                )}
                            </p>
                        `
                        : ""
                }

            </header>

            ${
                stop.description
                    ? `
                        <p class="stop-card__description">
                            ${escapeHtml(
                                stop.description
                            )}
                        </p>
                    `
                    : ""
            }

            ${visitTime}

            ${slowDown}

            ${collectItems}

            <div class="stop-card__actions">

                ${mapLink}

                <button
                    class="button button--region stop-complete-button"
                    type="button"
                    data-stop-index="${index}"
                >
                    Mark Complete
                </button>

            </div>

        </article>
    `;
}

/* ==================================================
   TREASURE LISTS
================================================== */

function renderTreasureLists() {
    renderTreasureList(
        "notice",
        currentAdventure.noticeIdeas ||
            currentAdventure.notice
    );

    renderTreasureList(
        "ephemera",
        currentAdventure.ephemeraIdeas ||
            currentAdventure.ephemera
    );
}

function renderTreasureList(id, items) {
    const container = getElement(id);

    if (!container) {
        return;
    }

    const safeItems =
        Array.isArray(items) ? items : [];

    if (safeItems.length === 0) {
        container.innerHTML =
            "<p>Ideas coming soon.</p>";

        return;
    }

    container.innerHTML = safeItems
        .map(
            item => `
                <div class="treasure-item">

                    <span aria-hidden="true">
                        ✦
                    </span>

                    <p>
                        ${escapeHtml(item)}
                    </p>

                </div>
            `
        )
        .join("");
}

/* ==================================================
   LOCAL FIND
================================================== */

function renderLocalFind() {
    const section =
        document.querySelector(".local-find");

    if (!section) {
        return;
    }

    const localFind =
        currentAdventure &&
        currentAdventure.localFind;

    if (!localFind) {
        section.hidden = true;
        return;
    }

    const name =
        getElement("localFindName");

    const maker =
        getElement("localFindMaker");

    const caption =
        getElement("localFindCaption");

    const link =
        getElement("localFindLink");

    if (name) {
        name.textContent =
            localFind.name || "";
    }

    if (maker) {
        maker.textContent =
            localFind.maker || "";
    }

    if (caption) {
        caption.textContent =
            localFind.caption || "";
    }

    if (link) {
        const url = localFind.link || "";

        if (url && url !== "#") {
            link.href = url;
            link.hidden = false;

            link.removeAttribute(
                "aria-disabled"
            );
        } else {
            link.removeAttribute("href");
            link.hidden = true;
        }
    }

    section.hidden = false;
}

/* --------------------------------------------------
   AUDIO
-------------------------------------------------- */

const playlistTitle =
    document.getElementById("playlistTitle");

const playlistPlatform =
    document.getElementById("playlistPlatform");

const playlistLink =
    document.getElementById("playlistLink");

const soundscapeTitle =
    document.getElementById("soundscapeTitle");

const soundscapeDescription =
    document.getElementById("soundscapeDescription");

const soundscapePlayer =
    document.getElementById("soundscapePlayer");

const soundscapeDuration =
    document.getElementById("soundscapeDuration");

const soundscapeCredit =
    document.getElementById("soundscapeCredit");


if (adventure.playlist) {

    playlistTitle.textContent =
        adventure.playlist.title;

    playlistPlatform.textContent =
        adventure.playlist.platform;

    playlistLink.href =
        adventure.playlist.url;

}


if (adventure.soundscape) {

    soundscapeTitle.textContent =
        adventure.soundscape.title;

    soundscapeDescription.textContent =
        adventure.soundscape.description;

    soundscapePlayer.src =
        adventure.soundscape.audio;

    soundscapeDuration.textContent =
        adventure.soundscape.duration;

    soundscapeCredit.textContent =
        adventure.soundscape.credit;

}

/* ==================================================
   SPOTIFY
================================================== */

function renderPlaylist() {
    const spotify =
        currentAdventure.spotify ||
        currentAdventure.playlist ||
        null;

    const link =
        getElement("playlistLink");

    if (!spotify) {
        setText(
            "playlistTitle",
            "Adventure Soundtrack"
        );

        setText(
            "playlistPlatform",
            "Playlist coming soon."
        );

        if (link) {
            link.hidden = true;
        }

        return;
    }

    setText(
        "playlistTitle",
        spotify.title,
        "Adventure Soundtrack"
    );

    setText(
        "playlistPlatform",
        spotify.description ||
            spotify.platform ||
            "Listen on Spotify"
    );

    if (!link) {
        return;
    }

    const playlistUrl =
        spotify.playlistUrl ||
        spotify.link ||
        "";

    if (
        playlistUrl &&
        playlistUrl !== "#"
    ) {
        link.href = playlistUrl;
        link.textContent =
            "🎵 Listen on Spotify";

        link.hidden = false;
        link.target = "_blank";
        link.rel =
            "noopener noreferrer";

        link.removeAttribute(
            "aria-disabled"
        );
    } else {
        link.removeAttribute("href");

        link.textContent =
            "Spotify Playlist Coming Soon";

        link.hidden = false;

        link.setAttribute(
            "aria-disabled",
            "true"
        );
    }
}

/* ==================================================
   TABS
================================================== */

function showTab(tabId, clickedButton) {
    document
        .querySelectorAll(".tab-content")
        .forEach(section => {
            const isActive =
                section.id === tabId;

            section.hidden = !isActive;

            section.classList.toggle(
                "active",
                isActive
            );
        });

    document
        .querySelectorAll(".issue-tab")
        .forEach(button => {
            const isActive =
                button === clickedButton ||
                button.dataset.tab === tabId;

            button.classList.toggle(
                "active",
                isActive
            );

            button.setAttribute(
                "aria-selected",
                isActive
                    ? "true"
                    : "false"
            );
        });

    if (tabId === "stops") {
        updateProgress();
    }
}

function openRouteTab() {
    const routeButton =
        document.querySelector(
            '.issue-tab[data-tab="stops"]'
        );

    showTab(
        "stops",
        routeButton
    );

    const tabs =
        document.querySelector(
            ".issue-tabs"
        );

    if (tabs) {
        tabs.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function startAdventure() {
    openRouteTab();
}

/* ==================================================
   PROGRESS
================================================== */

function getProgressStorageKey() {
    const adventureId =
        currentAdventure?.id ||
        getAdventureIdFromUrl();

    return (
        `100-adventure-progress-${adventureId}`
    );
}

function getCompletedStops() {
    try {
        const saved =
            localStorage.getItem(
                getProgressStorageKey()
            );

        const completed =
            saved
                ? JSON.parse(saved)
                : [];

        return Array.isArray(completed)
            ? completed.filter(
                Number.isInteger
            )
            : [];
    } catch (error) {
        console.warn(
            "[100 Adventure] Progress could not be read.",
            error
        );

        return [];
    }
}

function saveCompletedStops(
    completedStops
) {
    try {
        localStorage.setItem(
            getProgressStorageKey(),
            JSON.stringify(
                completedStops
            )
        );
    } catch (error) {
        console.warn(
            "[100 Adventure] Progress could not be saved.",
            error
        );
    }
}

function toggleStopComplete(index) {
    const completed =
        new Set(
            getCompletedStops()
        );

    if (completed.has(index)) {
        completed.delete(index);
    } else {
        completed.add(index);
    }

    saveCompletedStops(
        [...completed].sort(
            (a, b) => a - b
        )
    );

    refreshStopButtons();
    updateProgress();
}

function refreshStopButtons() {
    const completed =
        new Set(
            getCompletedStops()
        );

    document
        .querySelectorAll(
            ".stop-complete-button"
        )
        .forEach(button => {
            const index =
                Number(
                    button.dataset.stopIndex
                );

            const isComplete =
                completed.has(index);

            const card =
                button.closest(
                    ".stop-card"
                );

            button.textContent =
                isComplete
                    ? "Visited ✓"
                    : "Mark Complete";

            button.setAttribute(
                "aria-pressed",
                isComplete
                    ? "true"
                    : "false"
            );

            if (card) {
                card.classList.toggle(
                    "stop-card--complete",
                    isComplete
                );
            }
        });
}

function updateProgress() {
    if (!currentAdventure) {
        currentAdventure =
            getCurrentAdventure();
    }

    const totalStops =
        Array.isArray(
            currentAdventure?.stops
        )
            ? currentAdventure.stops.length
            : 0;

    const completedCount =
        getCompletedStops()
            .filter(
                index =>
                    index >= 0 &&
                    index < totalStops
            )
            .length;

    const stopWord =
        totalStops === 1
            ? "Stop"
            : "Stops";

    setText(
        "progress",
        `${completedCount} / ${totalStops} ${stopWord} Visited`
    );

    const progressBar =
        getElement("progressBar");

    if (progressBar) {
        const percentage =
            totalStops > 0
                ? (
                    completedCount /
                    totalStops
                ) * 100
                : 0;

        progressBar.style.width =
            `${percentage}%`;
    }
}
