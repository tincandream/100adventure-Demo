  /* =========================================================
   100 ADVENTURE
   THE LIVING ATLAS
   Explore page interactions
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const REGION_CONFIG = {
    all: {
        name: "All America",
        atlasName: "The complete atlas",
        status: "Showing journeys from every region.",
        bodyClass: null
    },

    southeast: {
        name: "Southeast",
        atlasName: "The Southeast roadbook",
        status: "Showing journeys through the Southeast.",
        bodyClass: "region-southeast"
    },

    southwest: {
        name: "Southwest",
        atlasName: "The Southwest roadbook",
        status: "Showing journeys through the Southwest.",
        bodyClass: "region-southwest"
    },

    midwest: {
        name: "Midwest",
        atlasName: "The Midwest roadbook",
        status: "Showing journeys through the Midwest.",
        bodyClass: "region-midwest"
    },

    northeast: {
        name: "Northeast",
        atlasName: "The Northeast roadbook",
        status: "Showing journeys through the Northeast.",
        bodyClass: "region-northeast"
    },

    west: {
        name: "West",
        atlasName: "The Western roadbook",
        status: "Showing journeys through the West.",
        bodyClass: "region-west"
    }
};


const REGION_CLASS_NAMES = [
    "region-southeast",
    "region-southwest",
    "region-midwest",
    "region-northeast",
    "region-west"
];


/* =========================================================
   STATE DIRECTORY
   Used by the Field Notes panel and SimpleMaps integration.
   ========================================================= */

const STATE_DATA = {
    AL: {
        name: "Alabama",
        region: "southeast",
        description:
            "Mountain roads, Civil Rights landmarks, small-town main streets, pecan country, and storied Southern highways.",
        scenicRoads: 5,
        camperStays: 7
    },

    AR: {
        name: "Arkansas",
        region: "southeast",
        description:
            "Ozark ridges, clear rivers, forest roads, historic springs, and quiet campgrounds made for slower travel.",
        scenicRoads: 8,
        camperStays: 12
    },

    TN: {
        name: "Tennessee",
        region: "southeast",
        description:
            "Mountain music, Appalachian roads, heritage towns, scenic parkways, and welcoming places to make camp.",
        scenicRoads: 7,
        camperStays: 10
    },

    NC: {
        name: "North Carolina",
        region: "southeast",
        description:
            "Blue Ridge overlooks, coastal roads, mountain towns, historic communities, and memorable roadside stops.",
        scenicRoads: 9,
        camperStays: 14
    },

    ME: {
        name: "Maine",
        region: "northeast",
        description:
            "Rocky coastlines, pine forests, fishing villages, quiet inland roads, and cool-weather camping.",
        scenicRoads: 6,
        camperStays: 9
    },

    VT: {
        name: "Vermont",
        region: "northeast",
        description:
            "Covered bridges, village greens, mountain passes, old general stores, and autumn roads worth lingering on.",
        scenicRoads: 6,
        camperStays: 8
    },

    MI: {
        name: "Michigan",
        region: "midwest",
        description:
            "Great Lakes shorelines, forested peninsulas, historic towns, and camper-friendly roads beside the water.",
        scenicRoads: 7,
        camperStays: 11
    },

    SD: {
        name: "South Dakota",
        region: "midwest",
        description:
            "Prairie horizons, dramatic stone landscapes, historic highways, and wide-open camping country.",
        scenicRoads: 5,
        camperStays: 8
    },

    NM: {
        name: "New Mexico",
        region: "southwest",
        description:
            "High desert roads, adobe towns, mountain light, historic trading routes, and distinctive roadside culture.",
        scenicRoads: 7,
        camperStays: 9
    },

    AZ: {
        name: "Arizona",
        region: "southwest",
        description:
            "Desert highways, red-rock country, Route 66 landmarks, pine-covered highlands, and expansive skies.",
        scenicRoads: 8,
        camperStays: 11
    },

    OR: {
        name: "Oregon",
        region: "west",
        description:
            "Coastal highways, volcanic landscapes, forest roads, waterfalls, and long days made for wandering.",
        scenicRoads: 9,
        camperStays: 13
    },

    CA: {
        name: "California",
        region: "west",
        description:
            "Pacific roads, desert landmarks, mountain passes, historic motels, and some of America’s most iconic drives.",
        scenicRoads: 11,
        camperStays: 15
    }
};


/* =========================================================
   JOURNEY DATA

   Add future journeys here using the same structure.
   Image paths are optional.
   ========================================================= */

const JOURNEYS = [
    {
        id: "alabama-highlands",
        title: "Alabama Highlands Roadbook",
        state: "Alabama",
        stateCode: "AL",
        region: "southeast",
        distance: 100,
        duration: "3 days",
        season: "Autumn",
        camperStays: 2,
        scenicRoads: 3,
        badge: "Camper route",
        description:
            "A collected journey through mountain overlooks, forest roads, historic places, and classic Alabama roadside stops.",
        tags: [
            "mountains",
            "americana",
            "campgrounds",
            "historic",
            "scenic byways",
            "camper life"
        ],
        collections: [
            "camper-life",
            "landscape",
            "americana",
            "season"
        ],
        image: "",
        url: "adventure.html?id=alabama-highlands"
    },

    {
        id: "dolly-country",
        title: "Dolly Country Heritage Road",
        state: "Tennessee",
        stateCode: "TN",
        region: "southeast",
        distance: 100,
        duration: "3 days",
        season: "Spring",
        camperStays: 2,
        scenicRoads: 2,
        badge: "Heritage journey",
        description:
            "A warm-hearted drive through Sevier County, Appalachian heritage, mountain roads, local sweets, and Dolly country.",
        tags: [
            "music",
            "heritage",
            "mountains",
            "small towns",
            "camper friendly",
            "americana"
        ],
        collections: [
            "camper-life",
            "landscape",
            "americana",
            "season"
        ],
        image: "",
        url: "adventure.html?id=dolly-country"
    },

    {
        id: "ozark-highlands",
        title: "Ozark Highlands Weekend",
        state: "Arkansas",
        stateCode: "AR",
        region: "southeast",
        distance: 214,
        duration: "2 nights",
        season: "Autumn",
        camperStays: 5,
        scenicRoads: 7,
        badge: "Scenic weekend",
        description:
            "Forest roads, mountain water, old resort towns, and a gentle weekend pace through the Arkansas Ozarks.",
        tags: [
            "ozarks",
            "waterfalls",
            "forest",
            "mountains",
            "campgrounds",
            "autumn"
        ],
        collections: [
            "camper-life",
            "landscape",
            "season"
        ],
        image: "",
        url: "adventure.html?id=ozark-highlands"
    },

    {
        id: "new-mexico-high-road",
        title: "The High Road to Taos",
        state: "New Mexico",
        stateCode: "NM",
        region: "southwest",
        distance: 105,
        duration: "2 days",
        season: "Spring",
        camperStays: 4,
        scenicRoads: 4,
        badge: "Historic road",
        description:
            "Adobe villages, mountain views, art traditions, and high-desert history along one of New Mexico’s most storied roads.",
        tags: [
            "desert",
            "art",
            "historic",
            "mountains",
            "small towns",
            "scenic road"
        ],
        collections: [
            "landscape",
            "americana",
            "season"
        ],
        image: "",
        url: "adventure.html?id=new-mexico-high-road"
    },

    {
        id: "great-lakes-shore",
        title: "Great Lakes Shore Road",
        state: "Michigan",
        stateCode: "MI",
        region: "midwest",
        distance: 186,
        duration: "3 days",
        season: "Summer",
        camperStays: 6,
        scenicRoads: 5,
        badge: "Lakeside escape",
        description:
            "Freshwater beaches, lighthouse towns, woodland campsites, and relaxed drives along the Michigan shoreline.",
        tags: [
            "lakes",
            "beaches",
            "lighthouses",
            "summer",
            "campgrounds",
            "small towns"
        ],
        collections: [
            "camper-life",
            "landscape",
            "season"
        ],
        image: "",
        url: "adventure.html?id=great-lakes-shore"
    },

    {
        id: "oregon-coast",
        title: "Oregon Coast Roadbook",
        state: "Oregon",
        stateCode: "OR",
        region: "west",
        distance: 230,
        duration: "4 days",
        season: "Summer",
        camperStays: 7,
        scenicRoads: 6,
        badge: "Coastal road",
        description:
            "Sea stacks, small harbor towns, forest campgrounds, and open-road views along the Pacific coast.",
        tags: [
            "coast",
            "forest",
            "beaches",
            "summer",
            "camper friendly",
            "scenic highway"
        ],
        collections: [
            "camper-life",
            "landscape",
            "season"
        ],
        image: "",
        url: "adventure.html?id=oregon-coast"
    }
];


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const atlasState = {
    activeRegion: "all",
    activeStateCode: null,
    activeCollection: null,
    searchTerm: "",
    filteredJourneys: [...JOURNEYS]
};


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const elements = {
    body: document.body,

    searchButton: document.querySelector("#atlasSearchButton"),
    searchPanel: document.querySelector("#atlasSearchPanel"),
    searchForm: document.querySelector("#atlasSearchForm"),
    searchInput: document.querySelector("#atlasSearchInput"),

    regionButtons: [
        ...document.querySelectorAll(".region-selector__button")
    ],

    activeRegionName: document.querySelector("#activeRegionName"),
    routeCount: document.querySelector("#routeCount"),
    routeDirectoryStatus: document.querySelector(
        "#routeDirectoryStatus"
    ),

    routeGrid: document.querySelector("#routeGrid"),
    routeGridEmpty: document.querySelector("#routeGridEmpty"),

    previewEmpty: document.querySelector("#atlasPreviewEmpty"),
    previewSelection: document.querySelector(
        "#atlasPreviewSelection"
    ),
    previewRegion: document.querySelector("#previewRegion"),
    previewTitle: document.querySelector("#previewTitle"),
    previewDescription: document.querySelector(
        "#previewDescription"
    ),
    previewJourneyCount: document.querySelector(
        "#previewJourneyCount"
    ),
    previewRoadCount: document.querySelector(
        "#previewRoadCount"
    ),
    previewCampCount: document.querySelector(
        "#previewCampCount"
    ),
    previewAction: document.querySelector("#previewAction"),

    collectionLinks: [
        ...document.querySelectorAll("[data-collection]")
    ],

    map: document.querySelector("#usaMap")
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeExplorePage() {
    bindEventListeners();
    renderExplorePage();
    initializeSimpleMapsIntegration();
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function bindEventListeners() {
    elements.searchButton?.addEventListener(
        "click",
        toggleSearchPanel
    );

    elements.searchForm?.addEventListener(
        "submit",
        handleSearchSubmit
    );

    elements.searchInput?.addEventListener(
        "input",
        handleSearchInput
    );

    elements.searchInput?.addEventListener(
        "keydown",
        handleSearchKeydown
    );

    elements.regionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const region = button.dataset.region;

            selectRegion(region);
        });
    });

    elements.collectionLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const collection = link.dataset.collection;

            selectCollection(collection);
        });
    });

    elements.routeGrid?.addEventListener(
        "click",
        handleJourneyGridClick
    );

    document.addEventListener("keydown", handleGlobalKeydown);
}


/* =========================================================
   MAIN RENDER
   ========================================================= */

function renderExplorePage() {
    atlasState.filteredJourneys = getFilteredJourneys();

    updateRegionControls();
    updateRegionContext();
    updateJourneyCount();
    updateDirectoryStatus();
    renderJourneyCards();
    updateMapContext();
}


/* =========================================================
   REGION FILTERING
   ========================================================= */

function selectRegion(region) {
    if (!REGION_CONFIG[region]) {
        return;
    }

    atlasState.activeRegion = region;
    atlasState.activeStateCode = null;
    atlasState.activeCollection = null;

    closeStatePreview();
    renderExplorePage();
}


function updateRegionControls() {
    elements.regionButtons.forEach((button) => {
        const isActive =
            button.dataset.region === atlasState.activeRegion;

        button.classList.toggle("is-active", isActive);
        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });
}


function updateRegionContext() {
    const region =
        REGION_CONFIG[atlasState.activeRegion] ??
        REGION_CONFIG.all;

    REGION_CLASS_NAMES.forEach((className) => {
        elements.body.classList.remove(className);
    });

    if (region.bodyClass) {
        elements.body.classList.add(region.bodyClass);
    }

    if (elements.activeRegionName) {
        elements.activeRegionName.textContent =
            region.atlasName;
    }
}


/* =========================================================
   COLLECTION FILTERING
   ========================================================= */

function selectCollection(collection) {
    atlasState.activeCollection =
        atlasState.activeCollection === collection
            ? null
            : collection;

    atlasState.activeRegion = "all";
    atlasState.activeStateCode = null;

    closeStatePreview();
    renderExplorePage();
}


/* =========================================================
   SEARCH
   ========================================================= */

function toggleSearchPanel() {
    if (!elements.searchPanel || !elements.searchButton) {
        return;
    }

    const isOpening = elements.searchPanel.hidden;

    elements.searchPanel.hidden = !isOpening;

    elements.searchButton.setAttribute(
        "aria-expanded",
        String(isOpening)
    );

    if (isOpening) {
        window.requestAnimationFrame(() => {
            elements.searchInput?.focus();
        });
    }
}


function handleSearchSubmit(event) {
    event.preventDefault();

    atlasState.searchTerm =
        normalizeSearchTerm(elements.searchInput?.value);

    atlasState.activeStateCode = null;

    closeStatePreview();
    renderExplorePage();

    document
        .querySelector("#curated-journeys")
        ?.scrollIntoView({
            behavior: prefersReducedMotion()
                ? "auto"
                : "smooth",
            block: "start"
        });
}


function handleSearchInput(event) {
    atlasState.searchTerm =
        normalizeSearchTerm(event.target.value);

    renderExplorePage();
}


function handleSearchKeydown(event) {
    if (event.key !== "Escape") {
        return;
    }

    clearSearch();
    closeSearchPanel();
}


function clearSearch() {
    atlasState.searchTerm = "";

    if (elements.searchInput) {
        elements.searchInput.value = "";
    }

    renderExplorePage();
}


function closeSearchPanel() {
    if (!elements.searchPanel || !elements.searchButton) {
        return;
    }

    elements.searchPanel.hidden = true;

    elements.searchButton.setAttribute(
        "aria-expanded",
        "false"
    );

    elements.searchButton.focus();
}


/* =========================================================
   JOURNEY FILTERING
   ========================================================= */

function getFilteredJourneys() {
    const searchTerm = atlasState.searchTerm;

    return JOURNEYS.filter((journey) => {
        const matchesRegion =
            atlasState.activeRegion === "all" ||
            journey.region === atlasState.activeRegion;

        const matchesCollection =
            !atlasState.activeCollection ||
            journey.collections.includes(
                atlasState.activeCollection
            );

        const searchableText = [
            journey.title,
            journey.state,
            journey.region,
            journey.description,
            journey.season,
            journey.badge,
            ...journey.tags
        ]
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            !searchTerm ||
            searchableText.includes(searchTerm);

        return (
            matchesRegion &&
            matchesCollection &&
            matchesSearch
        );
    });
}


/* =========================================================
   JOURNEY CARDS
   ========================================================= */

function renderJourneyCards() {
    if (!elements.routeGrid) {
        return;
    }

    elements.routeGrid.replaceChildren();

    const journeys = atlasState.filteredJourneys;

    if (elements.routeGridEmpty) {
        elements.routeGridEmpty.hidden =
            journeys.length !== 0;
    }

    if (journeys.length === 0) {
        return;
    }

    const fragment = document.createDocumentFragment();

    journeys.forEach((journey) => {
        fragment.appendChild(
            createJourneyCard(journey)
        );
    });

    elements.routeGrid.appendChild(fragment);
}


function createJourneyCard(journey) {
    const article = document.createElement("article");

    article.className =
        `journey-card region-${journey.region}`;

    article.dataset.journeyId = journey.id;

    const link = document.createElement("a");

    link.className = "journey-card__link";
    link.href = journey.url;
    link.dataset.journeyId = journey.id;

    link.setAttribute(
        "aria-label",
        `Open ${journey.title}`
    );

    const media = createJourneyMedia(journey);
    const body = document.createElement("div");

    body.className = "journey-card__body";

    const region = document.createElement("p");

    region.className = "journey-card__region";
    region.textContent =
        `${REGION_CONFIG[journey.region].name} · ${journey.state}`;

    const title = document.createElement("h3");

    title.className = "journey-card__title";
    title.textContent = journey.title;

    const description = document.createElement("p");

    description.className =
        "journey-card__description";
    description.textContent = journey.description;

    const meta = document.createElement("div");

    meta.className = "journey-card__meta";

    meta.append(
        createMetaItem(`${journey.distance} miles`),
        createMetaItem(journey.duration),
        createMetaItem(journey.season)
    );

    body.append(
        region,
        title,
        description,
        meta
    );

    link.append(media, body);
    article.appendChild(link);

    return article;
}


function createJourneyMedia(journey) {
    const media = document.createElement("div");

    media.className = "journey-card__media";
    media.dataset.region = journey.region;

    const badge = document.createElement("span");

    badge.className = "journey-card__badge";
    badge.textContent = journey.badge;

    if (journey.image) {
        const image = document.createElement("img");

        image.src = journey.image;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";

        media.appendChild(image);
    } else {
        const monogram = document.createElement("span");

        monogram.className =
            "journey-card__monogram";

        monogram.setAttribute("aria-hidden", "true");
        monogram.textContent = journey.stateCode;

        media.appendChild(monogram);
    }

    media.appendChild(badge);

    return media;
}


function createMetaItem(text) {
    const item = document.createElement("span");

    item.textContent = text;

    return item;
}


function handleJourneyGridClick(event) {
    const link = event.target.closest(
        "[data-journey-id]"
    );

    if (!link) {
        return;
    }

    const journey = getJourneyById(
        link.dataset.journeyId
    );

    if (!journey) {
        return;
    }

    /*
     * Allow normal navigation.
     * This update provides immediate visual feedback before
     * the destination page opens.
     */
    openJourneyPreview(journey);
}


/* =========================================================
   FIELD NOTES PREVIEW
   ========================================================= */

function openStatePreview(stateCode) {
    const state = STATE_DATA[stateCode];

    if (!state) {
        return;
    }

    atlasState.activeStateCode = stateCode;
    atlasState.activeRegion = state.region;
    atlasState.activeCollection = null;

    const stateJourneys = JOURNEYS.filter(
        (journey) => journey.stateCode === stateCode
    );

    updatePreview({
        region: REGION_CONFIG[state.region].name,
        title: state.name,
        description: state.description,
        journeyCount: stateJourneys.length,
        scenicRoads: state.scenicRoads,
        camperStays: state.camperStays,
        actionLabel: "Explore this state",
        actionHref:
            `#curated-journeys`
    });

    renderExplorePage();

    elements.previewSelection?.scrollIntoView({
        behavior: prefersReducedMotion()
            ? "auto"
            : "smooth",
        block: "nearest"
    });
}


function openJourneyPreview(journey) {
    updatePreview({
        region:
            `${REGION_CONFIG[journey.region].name} · ${journey.state}`,
        title: journey.title,
        description: journey.description,
        journeyCount: 1,
        scenicRoads: journey.scenicRoads,
        camperStays: journey.camperStays,
        actionLabel: "Open this journey",
        actionHref: journey.url
    });
}


function updatePreview(preview) {
    if (
        !elements.previewEmpty ||
        !elements.previewSelection
    ) {
        return;
    }

    elements.previewEmpty.hidden = true;
    elements.previewSelection.hidden = false;

    setText(elements.previewRegion, preview.region);
    setText(elements.previewTitle, preview.title);
    setText(
        elements.previewDescription,
        preview.description
    );
    setText(
        elements.previewJourneyCount,
        preview.journeyCount
    );
    setText(
        elements.previewRoadCount,
        preview.scenicRoads
    );
    setText(
        elements.previewCampCount,
        preview.camperStays
    );

    if (elements.previewAction) {
        elements.previewAction.textContent =
            preview.actionLabel;

        elements.previewAction.href =
            preview.actionHref;
    }
}


function closeStatePreview() {
    if (
        !elements.previewEmpty ||
        !elements.previewSelection
    ) {
        return;
    }

    elements.previewEmpty.hidden = false;
    elements.previewSelection.hidden = true;
}


/* =========================================================
   COUNTS AND STATUS
   ========================================================= */

function updateJourneyCount() {
    if (!elements.routeCount) {
        return;
    }

    elements.routeCount.textContent =
        String(atlasState.filteredJourneys.length);
}


function updateDirectoryStatus() {
    if (!elements.routeDirectoryStatus) {
        return;
    }

    const count = atlasState.filteredJourneys.length;
    const journeyWord =
        count === 1 ? "journey" : "journeys";

    if (atlasState.searchTerm) {
        elements.routeDirectoryStatus.textContent =
            `${count} ${journeyWord} found for “${atlasState.searchTerm}.”`;

        return;
    }

    if (atlasState.activeCollection) {
        elements.routeDirectoryStatus.textContent =
            `${count} ${journeyWord} selected from this collection.`;

        return;
    }

    const region =
        REGION_CONFIG[atlasState.activeRegion];

    elements.routeDirectoryStatus.textContent =
        region?.status ??
        `${count} ${journeyWord} in the roadbook.`;
}


/* =========================================================
   SIMPLEMAPS INTEGRATION
   ========================================================= */

/*
 * SimpleMaps is configured separately through its mapdata
 * file. This function safely waits for the map to exist and
 * then connects state selections to the Living Atlas.
 *
 * Each state in SimpleMaps should use its two-letter ID,
 * such as AL, AR, TN, OR, or ME.
 */

function initializeSimpleMapsIntegration() {
    if (!elements.map) {
        return;
    }

    elements.map.addEventListener(
        "click",
        handleMapInteraction
    );

    elements.map.addEventListener(
        "keydown",
        handleMapKeyboardInteraction
    );

    connectSimpleMapsHooks();
}


function handleMapInteraction(event) {
    const stateCode = findStateCodeFromTarget(
        event.target
    );

    if (stateCode) {
        openStatePreview(stateCode);
    }
}


function handleMapKeyboardInteraction(event) {
    if (
        event.key !== "Enter" &&
        event.key !== " "
    ) {
        return;
    }

    const stateCode = findStateCodeFromTarget(
        event.target
    );

    if (!stateCode) {
        return;
    }

    event.preventDefault();
    openStatePreview(stateCode);
}


function findStateCodeFromTarget(target) {
    if (!(target instanceof Element)) {
        return null;
    }

    const stateElement = target.closest(
        "[data-state], [data-state-code], [data-id], path[id]"
    );

    if (!stateElement) {
        return null;
    }

    const candidates = [
        stateElement.dataset.state,
        stateElement.dataset.stateCode,
        stateElement.dataset.id,
        stateElement.id
    ];

    for (const candidate of candidates) {
        const stateCode = extractStateCode(candidate);

        if (stateCode && STATE_DATA[stateCode]) {
            return stateCode;
        }
    }

    return null;
}


function extractStateCode(value) {
    if (!value) {
        return null;
    }

    const normalized = String(value)
        .toUpperCase()
        .replace(/^US[-_]/, "")
        .replace(/^STATE[-_]/, "")
        .trim();

    const exactMatch = normalized.match(/^[A-Z]{2}$/);

    if (exactMatch) {
        return exactMatch[0];
    }

    const embeddedMatch = normalized.match(
        /(?:^|[-_])([A-Z]{2})(?:$|[-_])/
    );

    return embeddedMatch?.[1] ?? null;
}


/*
 * Optional SimpleMaps callback support.
 *
 * When SimpleMaps is present, these handlers are made
 * available globally. They can be referenced from your
 * SimpleMaps configuration without coupling the rest of
 * the page to the vendor library.
 */

function connectSimpleMapsHooks() {
    window.on100AStateSelected = function on100AStateSelected(
        stateCode
    ) {
        const normalizedCode =
            extractStateCode(stateCode);

        if (normalizedCode) {
            openStatePreview(normalizedCode);
        }
    };

    window.on100ARegionSelected =
        function on100ARegionSelected(region) {
            if (REGION_CONFIG[region]) {
                selectRegion(region);
            }
        };
}


function updateMapContext() {
    if (!elements.map) {
        return;
    }

    elements.map.dataset.activeRegion =
        atlasState.activeRegion;

    elements.map.dataset.activeState =
        atlasState.activeStateCode ?? "";

    elements.map.setAttribute(
        "aria-label",
        atlasState.activeRegion === "all"
            ? "Interactive map of the United States"
            : `Interactive map showing the ${REGION_CONFIG[atlasState.activeRegion].name} region`
    );

    window.dispatchEvent(
        new CustomEvent("100a:atlaschange", {
            detail: {
                region: atlasState.activeRegion,
                stateCode: atlasState.activeStateCode,
                journeys: atlasState.filteredJourneys
            }
        })
    );
}


/* =========================================================
   GLOBAL KEYBOARD HANDLING
   ========================================================= */

function handleGlobalKeydown(event) {
    if (event.key !== "Escape") {
        return;
    }

    if (
        elements.searchPanel &&
        !elements.searchPanel.hidden
    ) {
        closeSearchPanel();
    }
}


/* =========================================================
   UTILITIES
   ========================================================= */

function getJourneyById(journeyId) {
    return JOURNEYS.find(
        (journey) => journey.id === journeyId
    );
}


function normalizeSearchTerm(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase();
}


function setText(element, value) {
    if (!element) {
        return;
    }

    element.textContent = String(value ?? "");
}


function prefersReducedMotion() {
    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
}


/* =========================================================
   START APPLICATION
   ========================================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeExplorePage,
        { once: true }
    );
} else {
    initializeExplorePage();
}
