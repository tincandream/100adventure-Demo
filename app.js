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
SPOTIFY SOUNDTRACK
==================================================
*/

function renderPlaylist() {
    const spotify =
        currentAdventure.spotify ||
        currentAdventure.playlist;

    const link = getElement("playlistLink");

    if (!spotify) {
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
        spotify.description || "Listen on Spotify",
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
        link.textContent = "Open in Spotify";
        link.hidden = false;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.removeAttribute("aria-disabled");
    } else {
        link.removeAttribute("href");
        link.textContent = "Spotify Playlist Coming Soon";
        link.hidden = false;
        link.setAttribute("aria-disabled", "true");
    }
}
/*
