const adventures = [
    {
        id: "alabama-scenic-byway",

        title: "Alabama Scenic Byway",

        cover: "images/alabama-cover.jpg",

        playlist: {
            title: "Alabama Scenic Byway",
            platform: "Spotify",
            url: "YOUR_SPOTIFY_LINK"
        },

        soundscape: {
            title: "Talladega Forest at Dusk",

            description:
                "Wind through longleaf pines, distant songbirds, a flowing creek and quiet mountain air.",

            audio: "audio/alabama/talladega-dusk.mp3",

            duration: "8 min",

            credit: "100 Adventure Field Recording"
        }
    }
];

/*
Makes the adventure data available to app.js.
*/
window.adventures = adventures;
window.ADVENTURES = adventures;

const ADVENTURES = {
    AL: [
        {
            id: "talladega-scenic-byway",
            title: "Talladega Scenic Byway",
            region: "southeast",
            status: "featured"
        }
    ],

    TN: [
        {
            id: "dolly-country-road-trip",
            title: "Dolly Country Road Trip",
            region: "southeast",
            status: "featured"
        }
    ],

    AR: [
        {
            id: "ozark-americana",
            title: "Ozark Americana",
            region: "southeast",
            status: "coming-soon"
        }
    ]
};
