/* ==================================================
   100 ADVENTURE — EXPLORE MAP
   ================================================== */

:root {
    /* Core 100 Adventure colors */
    --adventure-cream: #f5f0e6;
    --adventure-paper: #fbf8f1;
    --adventure-ink: #302d29;
    --adventure-muted: #766f65;
    --adventure-line: rgba(48, 45, 41, 0.15);
    --adventure-gold: #b89658;

    /* Regional colors — easy to replace */
    --region-northeast: #718a91;
    --region-southeast: #a16f55;
    --region-midwest: #9a8b58;
    --region-southwest: #b5684d;
    --region-west: #687d68;
}


/* Page */

.explore-body {
    background: var(--adventure-paper);
    color: var(--adventure-ink);
}

.explore-page {
    width: min(100%, 1500px);
    margin: 0 auto;
    padding: 48px 28px 130px;
}


/* Header */

.explore-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 30px;

    margin-bottom: 30px;
}

.explore-eyebrow {
    margin: 0 0 9px;

    color: var(--adventure-muted);

    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.17em;
    text-transform: uppercase;
}

.explore-header h1 {
    margin: 0;

    font-size: clamp(2.3rem, 5vw, 5.2rem);
    font-weight: 400;
    line-height: 0.98;
    letter-spacing: -0.045em;
}

.explore-introduction {
    max-width: 600px;
    margin: 17px 0 0;

    color: var(--adventure-muted);

    font-size: 1rem;
    line-height: 1.6;
}

.route-count {
    flex: 0 0 auto;
    margin: 0;
    padding-bottom: 5px;

    color: var(--adventure-muted);

    font-size: 0.76rem;
    letter-spacing: 0.06em;
}


/* Filters */

.region-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 18px;
}

.region-filter {
    appearance: none;

    padding: 9px 15px;

    color: var(--adventure-ink);
    background: transparent;

    border: 1px solid var(--adventure-line);
    border-radius: 999px;

    font: inherit;
    font-size: 0.74rem;
    letter-spacing: 0.035em;

    cursor: pointer;

    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
}

.region-filter:hover {
    background: var(--adventure-cream);
}

.region-filter.is-active {
    color: var(--adventure-paper);
    background: var(--adventure-ink);
    border-color: var(--adventure-ink);
}


/* Main map layout */

.explore-map-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(290px, 0.7fr);
    gap: 18px;
    align-items: stretch;
}

.map-column {
    min-width: 0;
}

.explore-map {
    width: 100%;
    height: min(68vh, 720px);
    min-height: 520px;

    overflow: hidden;

    background: #d8ded8;

    border: 1px solid var(--adventure-line);
    border-radius: 22px;
}


/* Leaflet map appearance */

.explore-map .leaflet-control-zoom {
    border: 0;
    box-shadow: none;
}

.explore-map .leaflet-control-zoom a {
    color: var(--adventure-ink);
    background: var(--adventure-paper);

    border: 1px solid var(--adventure-line);
}

.explore-map .leaflet-control-attribution {
    color: var(--adventure-muted);
    background: rgba(251, 248, 241, 0.88);

    font-size: 0.58rem;
}


/* Custom markers */

.adventure-map-marker {
    display: grid;
    place-items: center;

    width: 27px;
    height: 27px;

    color: white;

    border: 3px solid var(--adventure-paper);
    border-radius: 50%;

    box-shadow: 0 3px 10px rgba(40, 34, 27, 0.25);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.adventure-map-marker::after {
    content: "";

    width: 5px;
    height: 5px;

    background: currentColor;
    border-radius: 50%;
}

.adventure-map-marker:hover,
.adventure-map-marker.is-selected {
    transform: scale(1.18);

    box-shadow: 0 5px 16px rgba(40, 34, 27, 0.34);
}

.marker-northeast {
    background: var(--region-northeast);
}

.marker-southeast {
    background: var(--region-southeast);
}

.marker-midwest {
    background: var(--region-midwest);
}

.marker-southwest {
    background: var(--region-southwest);
}

.marker-west {
    background: var(--region-west);
}


/* Regional key */

.map-key {
    display: flex;
    flex-wrap: wrap;
    gap: 9px 17px;

    padding: 14px 3px 0;
}

.map-key span {
    display: inline-flex;
    align-items: center;
    gap: 7px;

    color: var(--adventure-muted);

    font-size: 0.66rem;
    letter-spacing: 0.025em;
}

.map-key i {
    width: 8px;
    height: 8px;

    border-radius: 50%;
}

.map-key [data-key-region="northeast"] i {
    background: var(--region-northeast);
}

.map-key [data-key-region="southeast"] i {
    background: var(--region-southeast);
}

.map-key [data-key-region="midwest"] i {
    background: var(--region-midwest);
}

.map-key [data-key-region="southwest"] i {
    background: var(--region-southwest);
}

.map-key [data-key-region="west"] i {
    background: var(--region-west);
}


/* Adventure preview */

.adventure-preview {
    min-height: 520px;
    padding: 30px;

    background: var(--adventure-cream);

    border: 1px solid var(--adventure-line);
    border-radius: 22px;
}

.preview-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
    min-height: 450px;
}

.preview-empty-symbol {
    margin-bottom: 30px;

    color: var(--adventure-gold);

    font-size: 2.2rem;
}

.preview-label {
    margin: 0 0 10px;

    color: var(--adventure-muted);

    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.adventure-preview h2 {
    margin: 0 0 14px;

    font-size: clamp(1.8rem, 3vw, 2.7rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.035em;
}

.adventure-preview p {
    color: var(--adventure-muted);
    line-height: 1.6;
}

.preview-region {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 24px;

    color: var(--adventure-muted);

    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.preview-region::before {
    content: "";

    width: 9px;
    height: 9px;

    background: var(--preview-region-color);
    border-radius: 50%;
}

.preview-meta {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;

    margin: 28px 0;

    overflow: hidden;

    background: var(--adventure-line);

    border: 1px solid var(--adventure-line);
    border-radius: 13px;
}

.preview-meta div {
    padding: 16px;

    background: var(--adventure-paper);
}

.preview-meta span {
    display: block;

    margin-bottom: 5px;

    color: var(--adventure-muted);

    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.preview-meta strong {
    font-size: 0.9rem;
    font-weight: 500;
}

.preview-route {
    margin: 24px 0;
    padding-top: 22px;

    border-top: 1px solid var(--adventure-line);
}

.preview-route span {
    display: block;

    margin-bottom: 7px;

    color: var(--adventure-muted);

    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.preview-route p {
    margin: 0;

    color: var(--adventure-ink);

    font-size: 0.88rem;
}

.preview-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 48px;
    margin-top: 12px;

    color: var(--adventure-paper);
    background: var(--adventure-ink);

    border: 1px solid var(--adventure-ink);
    border-radius: 999px;

    font-size: 0.75rem;
    letter-spacing: 0.055em;
    text-decoration: none;

    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}

.preview-button:hover {
    color: var(--adventure-ink);
    background: transparent;
}


/* Directory */

.route-directory {
    margin-top: 72px;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;

    margin-bottom: 22px;
}

.section-heading h2 {
    margin: 0;

    font-size: clamp(1.7rem, 3vw, 2.8rem);
    font-weight: 400;
    letter-spacing: -0.035em;
}

.route-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

.route-card {
    position: relative;

    display: flex;
    flex-direction: column;

    min-height: 245px;
    padding: 24px;

    background: var(--adventure-paper);

    border: 1px solid var(--adventure-line);
    border-radius: 18px;

    cursor: pointer;

    transition:
        transform 0.2s ease,
        background-color 0.2s ease;
}

.route-card:hover {
    transform: translateY(-3px);

    background: var(--adventure-cream);
}

.route-card__region {
    display: flex;
    align-items: center;
    gap: 8px;

    margin: 0 0 30px;

    color: var(--adventure-muted);

    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.route-card__region::before {
    content: "";

    width: 8px;
    height: 8px;

    background: var(--card-region-color);
    border-radius: 50%;
}

.route-card h3 {
    margin: 0 0 11px;

    font-size: 1.35rem;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.025em;
}

.route-card__location {
    margin: 0;

    color: var(--adventure-muted);

    font-size: 0.78rem;
}

.route-card__footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    margin-top: auto;
    padding-top: 28px;

    color: var(--adventure-muted);

    font-size: 0.68rem;
}


/* Responsive */

@media (max-width: 980px) {
    .explore-map-layout {
        grid-template-columns: 1fr;
    }

    .adventure-preview {
        min-height: auto;
    }

    .preview-empty {
        min-height: 250px;
    }

    .route-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 700px) {
    .explore-page {
        padding: 31px 15px 115px;
    }

    .explore-header {
        display: block;
    }

    .route-count {
        margin-top: 18px;
    }

    .region-filters {
        flex-wrap: nowrap;

        margin-right: -15px;
        padding-right: 15px;
        padding-bottom: 5px;

        overflow-x: auto;
    }

    .region-filter {
        flex: 0 0 auto;
    }

    .explore-map {
        height: 58vh;
        min-height: 430px;

        border-radius: 16px;
    }

    .adventure-preview {
        padding: 24px;

        border-radius: 16px;
    }

    .route-directory {
        margin-top: 52px;
    }

    .route-grid {
        grid-template-columns: 1fr;
    }

    .route-card {
        min-height: 210px;
    }
}
