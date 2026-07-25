"use strict";

/*
==================================================
100 ADVENTURE
Main Adventure Page JavaScript
==================================================
*/

let currentAdventure = null;

/*
==================================================
ADVENTURE SELECTION
==================================================
*/

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
            "[100 Adventure] adventures.js did not load or does not contain an adventures array."
        );

        return null;
    }

    const adventureId = getAdventureIdFromUrl();

    return (
        adventures.find(
            adventure => adventure.id === adventureId
        ) || null
    );
}

/*
==================================================
SAFE DOM HELPERS
==================================================
*/

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value, fallback = "—") {
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

function setAttribute(id, attribute, value) {
    const element = getElement(id);

    if (!element || value === undefined || value === null) {
        return;
    }

    element.setAttribute(attribute, value);
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
        function handleImageError() {
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

/*
==================================================
ERROR STATE
==================================================
*/

function showAdventureNotFound() {
    setText("adventureTitle", "Adventure Not Found");
    setText("coverTitle", "Adventure Not Found");

    setText(
        "adventureDescription",
        "This adventure could not be loaded. Return to Explore and choose another journey."
    );

    const containers = [
        "stopsContainer",
        "itineraryContainer",
        "guideContainer"
    ];

    containers.forEach(id => {
        const container = getElement(id);

        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <h2>Adventure unavailable</h2>
                    <p>
                        The adventure ID may be missing or incorrect.
                    </p>
                    <a class="button button--gold" href="adventures.html">
                        Return to Explore
                    </a>
                </div>
            `;
        }
    });
}

/*
==================================================
MAIN ADVENTURE RENDER
==================================================
*/

function renderAdventure() {
    currentAdventure = getCurrentAdventure();

    if (!currentAdventure) {
        showAdventureNotFound();

        console.error(
            `[100 Adventure] No adventure found for ID: ${getAdventureIdFromUrl()}`
        );

        return;
    }

    document.title =
        `${currentAdventure.title} | 100 Adventure`;

    renderAdventureHeader();
    renderAdventureDetails();
    renderAdventureOverview();
    renderStops();
    renderNoticeIdeas();
    renderEphemeraIdeas();
    renderPlaylist();
    renderMapLinks();
    renderOfflineState();
}

/*
==================================================
HEADER
==================================================
*/

function renderAdventureHeader() {
    setText("issueNum", currentAdventure.issueNumber, "001");

    setText(
        "adventureTitle",
        currentAdventure.title,
        "Official Adventure"
    );

    setText(
        "coverTitle",
        currentAdventure.title,
        "Official Adventure"
    );

    setText(
        "adventureSubtitle",
        currentAdventure.description,
        ""
    );

    setText(
        "coverSubtitle",
        currentAdventure.description,
        ""
    );

    setText(
        "adventureTheme",
        currentAdventure.theme,
        "Road Trip"
    );

    setText(
        "adventureLocation",
        currentAdventure.location,
        ""
    );

    setImage(
        "coverImage",
        currentAdventure.cover,
        `${currentAdventure.title} adventure cover`
    );
}

/*
==================================================
DETAILS
==================================================
*/

function renderAdventureDetails() {
    const route =
        `${currentAdventure.routeStart || "Start"} → ` +
        `${currentAdventure.routeEnd || "Finish"}`;

    setText(
        "adventureDistance",
        currentAdventure.distance
    );

    setText(
        "detailDistance",
        currentAdventure.distance
    );

    setText(
        "footerDistance",
        currentAdventure.distance
    );

    setText(
        "adventureDuration",
        currentAdventure.duration
    );

    setText(
        "detailDuration",
        currentAdventure.duration
    );

    setText(
        "adventureSeason",
        currentAdventure.bestSeason,
        "Year-round"
    );

    setText(
        "detailSeason",
        currentAdventure.bestSeason,
        "Year-round"
    );

    setText(
        "detailTheme",
        currentAdventure.theme,
        "Road Trip"
    );

    setText(
        "footerTheme",
        currentAdventure.theme,
        "Road Trip"
    );

    setText("adventureRoute", route);
    setText("footerRoute", route);
}

/*
==================================================
OVERVIEW
==================================================
*/

function renderAdventureOverview() {
    setText(
        "adventureDescription",
        currentAdventure.description,
        ""
    );

    setText(
        "overviewDescription",
        currentAdventure.description,
        ""
    );

    setText(
        "preparationNotes",
        currentAdventure.preparationNotes,
        ""
    );

    setText(
        "bestTime",
        currentAdventure.preparationNotes ||
            currentAdventure.bestSeason,
        ""
    );
}

/*
==================================================
STOPS AND ITINERARY
==================================================
*/

function renderStops() {
    const stops =
        Array.isArray(currentAdventure.stops)
            ? currentAdventure.stops
            : [];

    const containers = [
        getElement("stopsContainer"),
        getElement("itineraryContainer")
    ].filter(Boolean);

    if (containers.length === 0) {
        return;
    }

    if (stops.length === 0) {
        containers.forEach(container => {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No stops have been added yet.</p>
                </div>
            `;
        });

        return;
    }

    const markup = stops
        .map((stop, index) => createStopMarkup(stop, index))
        .join("");

    containers.forEach(container => {
        container.innerHTML = markup;
    });
}

function createStopMarkup(stop, index) {
    const collectItems =
        Array.isArray(stop.collect) && stop.collect.length
            ? `
                <div class="stop-card__collect">
                    <h4>Collect Along the Way</h4>

                    <ul>
                        ${stop.collect
                            .map(
                                item =>
                                    `<li>${escapeHtml(item)}</li>`
                            )
                            .join("")}
                    </ul>
                </div>
            `
            : "";

    const mapLink = stop.map
        ? `
            <a
                class="button button--outline"
                href="${escapeHtml(stop.map)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open ${escapeHtml(
                    stop.name
                )} in Google Maps"
            >
                Open in Maps
            </a>
        `
        : "";

    const visitTime = stop.visitTime
        ? `
            <p class="stop-card__time">
                <strong>Suggested time:</strong>
                ${escapeHtml(stop.visitTime)}
            </p>
        `
        : "";

    const slowDown = stop.slowDown
        ? `
            <div class="stop-card__prompt">
                <span class="detail-label">Slow Down</span>

                <p>
                    ${escapeHtml(stop.slowDown)}
                </p>
            </div>
        `
        : "";

    return `
        <article class="stop-card" data-stop-index="${index}">
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
                        stop.name || `Stop ${index + 1}`
                    )}
                </h3>

                ${
                    stop.chapter
                        ? `
                            <p class="stop-card__chapter">
                                ${escapeHtml(stop.chapter)}
                            </p>
                        `
                        : ""
                }
            </header>

            ${
                stop.description
                    ? `
                        <p class="stop-card__description">
                            ${escapeHtml(stop.description)}
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
                    class="button button--gold stop-complete-button"
                    type="button"
                    data-stop-index="${index}"
                >
                    Mark Complete
                </button>
            </div>
        </article>
    `;
}

/*
==================================================
NOTICE IDEAS
==================================================
*/

function renderNoticeIdeas() {
    const container =
        getElement("noticeIdeas") ||
        getElement("noticeIdeasContainer");

    if (!container) {
        return;
    }

    const ideas =
        Array.isArray(currentAdventure.noticeIdeas)
            ? currentAdventure.noticeIdeas
            : [];

    if (ideas.length === 0) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = ideas
        .map(
            idea => `
                <li>
                    ${escapeHtml(idea)}
                </li>
            `
        )
        .join("");
}

/*
==================================================
EPHEMERA IDEAS
==================================================
*/

function renderEphemeraIdeas() {
    const container =
        getElement("ephemeraIdeas") ||
        getElement("ephemeraIdeasContainer");

    if (!container) {
        return;
    }

    const ideas =
        Array.isArray(currentAdventure.ephemeraIdeas)
            ? currentAdventure.ephemeraIdeas
            : [];

    if (ideas.length === 0) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = ideas
        .map(
            idea => `
                <li>
                    ${escapeHtml(idea)}
                </li>
            `
        )
        .join("");
}

/*
==================================================
PLAYLIST
==================================================
*/

function renderPlaylist() {
    const playlist = currentAdventure.playlist;
    const link = getElement("playlistLink");

    if (!playlist) {
        if (link) {
            link.hidden = true;
        }

        return;
    }

    setText(
        "playlistTitle",
        playlist.title,
        "Adventure Soundtrack"
    );

    setText(
        "playlistPlatform",
        playlist.platform,
        ""
    );

    if (!link) {
        return;
    }

    if (
        playlist.link &&
        playlist.link !== "#"
    ) {
        link.href = playlist.link;
        link.hidden = false;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    } else {
        link.removeAttribute("href");
        link.hidden = true;
    }
}

/*
==================================================
MAP LINKS
==================================================
*/

function renderMapLinks() {
    const mapContainer = getElement("mapStopsContainer");

    if (!mapContainer) {
        return;
    }

    const stops =
        Array.isArray(currentAdventure.stops)
            ? currentAdventure.stops
            : [];

    mapContainer.innerHTML = stops
        .filter(stop => stop.map)
        .map(
            (stop, index) => `
                <a
                    class="map-stop-link"
                    href="${escapeHtml(stop.map)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span class="map-stop-link__number">
                        ${index + 1}
                    </span>

                    <span>
                        ${escapeHtml(stop.name)}
                    </span>
                </a>
            `
        )
        .join("");
}

/*
==================================================
TAB NAVIGATION
==================================================
*/

function showTab(tabName, button = null) {
    const tabSections =
        document.querySelectorAll(".tab-content");

    const tabButtons =
        document.querySelectorAll(".issue-tab");

    tabSections.forEach(section => {
        section.classList.remove("active");
        section.hidden = true;
    });

    tabButtons.forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
    });

    const activeSection =
        getElement(tabName) ||
        document.querySelector(
            `[data-tab-panel="${tabName}"]`
        );

    if (activeSection) {
        activeSection.classList.add("active");
        activeSection.hidden = false;
    } else {
        console.warn(
            `[100 Adventure] Tab panel not found: ${tabName}`
        );
    }

    const activeButton =
        button ||
        document.querySelector(
            `.issue-tab[data-tab="${tabName}"]`
        );

    if (activeButton) {
        activeButton.classList.add("active");
        activeButton.setAttribute(
            "aria-selected",
            "true"
        );
        activeButton.setAttribute("tabindex", "0");
    }

    saveActiveTab(tabName);
}

function attachTabListeners() {
    const tabButtons =
        document.querySelectorAll(".issue-tab");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabName =
                button.dataset.tab ||
                button.getAttribute("aria-controls");

            if (tabName) {
                showTab(tabName, button);
            }
        });

        button.addEventListener(
            "keydown",
            handleTabKeyboardNavigation
        );
    });
}

function handleTabKeyboardNavigation(event) {
    const tabButtons = Array.from(
        document.querySelectorAll(".issue-tab")
    );

    const currentIndex =
        tabButtons.indexOf(event.currentTarget);

    if (currentIndex === -1) {
        return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
        nextIndex =
            (currentIndex + 1) % tabButtons.length;
    } else if (event.key === "ArrowLeft") {
        nextIndex =
            (currentIndex - 1 + tabButtons.length) %
            tabButtons.length;
    } else if (event.key === "Home") {
        nextIndex = 0;
    } else if (event.key === "End") {
        nextIndex = tabButtons.length - 1;
    } else {
        return;
    }

    event.preventDefault();

    const nextButton = tabButtons[nextIndex];
    const tabName =
        nextButton.dataset.tab ||
        nextButton.getAttribute("aria-controls");

    nextButton.focus();

    if (tabName) {
        showTab(tabName, nextButton);
    }
}

function saveActiveTab(tabName) {
    if (!currentAdventure) {
        return;
    }

    localStorage.setItem(
        `activeTab:${currentAdventure.id}`,
        tabName
    );
}

function getSavedActiveTab() {
    if (!currentAdventure) {
        return "overview";
    }

    return (
        localStorage.getItem(
            `activeTab:${currentAdventure.id}`
        ) || "overview"
    );
}

/*
==================================================
PROGRESS
==================================================
*/

function getProgressStorageKey() {
    if (!currentAdventure) {
        return null;
    }

    return `progress:${currentAdventure.id}`;
}

function getCompletedStopsStorageKey() {
    if (!currentAdventure) {
        return null;
    }

    return `completedStops:${currentAdventure.id}`;
}

function getCompletedStops() {
    const key = getCompletedStopsStorageKey();

    if (!key) {
        return [];
    }

    try {
        const saved = JSON.parse(
            localStorage.getItem(key)
        );

        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error(
            "[100 Adventure] Completed stop data could not be read:",
            error
        );

        return [];
    }
}

function saveCompletedStops(completedStops) {
    const key = getCompletedStopsStorageKey();

    if (!key) {
        return;
    }

    localStorage.setItem(
        key,
        JSON.stringify(completedStops)
    );
}

function toggleStopComplete(stopIndex, button) {
    const completedStops = getCompletedStops();
    const normalizedIndex = Number(stopIndex);

    const existingIndex =
        completedStops.indexOf(normalizedIndex);

    if (existingIndex >= 0) {
        completedStops.splice(existingIndex, 1);
    } else {
        completedStops.push(normalizedIndex);
    }

    saveCompletedStops(completedStops);
    updateStopButtons();
    updateProgress();

    if (button) {
        button.blur();
    }
}

function attachStopListeners() {
    document.addEventListener("click", event => {
        const button = event.target.closest(
            ".stop-complete-button"
        );

        if (!button) {
            return;
        }

        toggleStopComplete(
            button.dataset.stopIndex,
            button
        );
    });
}

function updateStopButtons() {
    const completedStops = getCompletedStops();

    document
        .querySelectorAll(".stop-complete-button")
        .forEach(button => {
            const stopIndex =
                Number(button.dataset.stopIndex);

            const completed =
                completedStops.includes(stopIndex);

            button.classList.toggle(
                "is-complete",
                completed
            );

            button.textContent = completed
                ? "Completed"
                : "Mark Complete";

            button.setAttribute(
                "aria-pressed",
                String(completed)
            );

            const card = button.closest(".stop-card");

            if (card) {
                card.classList.toggle(
                    "is-complete",
                    completed
                );
            }
        });
}

function calculateProgress() {
    if (
        !currentAdventure ||
        !Array.isArray(currentAdventure.stops) ||
        currentAdventure.stops.length === 0
    ) {
        return 0;
    }

    const completedStops = getCompletedStops();

    return Math.round(
        (completedStops.length /
            currentAdventure.stops.length) *
            100
    );
}

function updateProgress() {
    if (!currentAdventure) {
        return;
    }

    const progress = calculateProgress();
    const key = getProgressStorageKey();

    if (key) {
        localStorage.setItem(
            key,
            String(progress)
        );
    }

    const progressElements = [
        getElement("adventureProgress"),
        getElement("progressBar")
    ].filter(Boolean);

    progressElements.forEach(element => {
        if (
            element.tagName === "PROGRESS" ||
            element.tagName === "METER"
        ) {
            element.value = progress;
            element.max = 100;
        } else {
            element.style.width = `${progress}%`;
        }

        element.setAttribute(
            "aria-valuenow",
            String(progress)
        );

        element.setAttribute(
            "aria-valuemin",
            "0"
        );

        element.setAttribute(
            "aria-valuemax",
            "100"
        );
    });

    setText(
        "progressPercent",
        `${progress}%`,
        "0%"
    );

    setText(
        "progressText",
        `${progress}% complete`,
        "0% complete"
    );

    updateCompletionState(progress);
}

function updateCompletionState(progress) {
    const completionSection =
        getElement("completionSection");

    if (completionSection) {
        completionSection.hidden = progress < 100;
    }

    const completeButton =
        getElement("completeAdventureButton");

    if (completeButton) {
        completeButton.disabled = progress < 100;
    }
}

/*
==================================================
BEGIN ADVENTURE
==================================================
*/

function beginAdventure() {
    if (!currentAdventure) {
        return;
    }

    const destination =
        currentAdventure.overviewPage ||
        "adventure.html";

    window.location.href =
        `${destination}?id=${encodeURIComponent(
            currentAdventure.id
        )}`;
}

/*
==================================================
OFFLINE SAVING
==================================================
*/

function getDownloadedAdventures() {
    try {
        const downloaded = JSON.parse(
            localStorage.getItem(
                "downloadedAdventures"
            )
        );

        return Array.isArray(downloaded)
            ? downloaded
            : [];
    } catch (error) {
        console.error(
            "[100 Adventure] Downloaded adventure data could not be read:",
            error
        );

        return [];
    }
}

function downloadAdventure() {
    if (!currentAdventure) {
        return;
    }

    const downloaded = getDownloadedAdventures();

    const alreadyDownloaded = downloaded.some(
        item => item.id === currentAdventure.id
    );

    if (!alreadyDownloaded) {
        downloaded.push({
            ...currentAdventure,
            downloadedAt:
                new Date().toISOString()
        });

        localStorage.setItem(
            "downloadedAdventures",
            JSON.stringify(downloaded)
        );
    }

    renderOfflineState();

    showStatusMessage(
        alreadyDownloaded
            ? "This adventure is already saved."
            : "Adventure saved for offline reference."
    );
}

function removeOfflineAdventure() {
    if (!currentAdventure) {
        return;
    }

    const downloaded =
        getDownloadedAdventures().filter(
            item => item.id !== currentAdventure.id
        );

    localStorage.setItem(
        "downloadedAdventures",
        JSON.stringify(downloaded)
    );

    renderOfflineState();

    showStatusMessage(
        "Adventure removed from offline saves."
    );
}

function isAdventureDownloaded() {
    if (!currentAdventure) {
        return false;
    }

    return getDownloadedAdventures().some(
        item => item.id === currentAdventure.id
    );
}

function renderOfflineState() {
    const buttons = [
        getElement("downloadOfflineButton"),
        getElement("offlineButton")
    ].filter(Boolean);

    const downloaded = isAdventureDownloaded();

    buttons.forEach(button => {
        button.textContent = downloaded
            ? "Saved for Offline"
            : "Download for Offline";

        button.classList.toggle(
            "is-downloaded",
            downloaded
        );

        button.setAttribute(
            "aria-pressed",
            String(downloaded)
        );
    });
}

/*
==================================================
STATUS MESSAGE
==================================================
*/

function showStatusMessage(message) {
    let status = getElement("appStatus");

    if (!status) {
        status = document.createElement("div");
        status.id = "appStatus";
        status.className = "app-status";
        status.setAttribute("role", "status");
        status.setAttribute(
            "aria-live",
            "polite"
        );

        document.body.appendChild(status);
    }

    status.textContent = message;
    status.classList.add("is-visible");

    window.clearTimeout(
        showStatusMessage.timeoutId
    );

    showStatusMessage.timeoutId =
        window.setTimeout(() => {
            status.classList.remove("is-visible");
        }, 3000);
}

/*
==================================================
BUTTON LISTENERS
==================================================
*/

function attachButtonListeners() {
    const beginButtons = [
        getElement("beginAdventureButton"),
        getElement("startButton")
    ].filter(Boolean);

    beginButtons.forEach(button => {
        button.addEventListener(
            "click",
            beginAdventure
        );
    });

    const offlineButtons = [
        getElement("downloadOfflineButton"),
        getElement("offlineButton")
    ].filter(Boolean);

    offlineButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (isAdventureDownloaded()) {
                removeOfflineAdventure();
            } else {
                downloadAdventure();
            }
        });
    });
}

/*
==================================================
INITIALIZATION
==================================================
*/

function initializeAdventurePage() {
    renderAdventure();

    if (!currentAdventure) {
        return;
    }

    attachTabListeners();
    attachButtonListeners();
    attachStopListeners();

    const savedTab = getSavedActiveTab();

    const savedTabButton =
        document.querySelector(
            `.issue-tab[data-tab="${savedTab}"]`
        );

    showTab(savedTab, savedTabButton);

    updateStopButtons();
    updateProgress();
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        const run = (label, callback) => {
            try {
                callback();
            } catch (error) {
                console.error(
                    `[100 Adventure] ${label} failed:`,
                    error
                );
            }
        };

        run(
            "initializeAdventurePage",
            initializeAdventurePage
        );
    }
);
