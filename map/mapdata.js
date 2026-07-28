
/* =========================================================
   100 ADVENTURE
   SIMPLEMAPS USA MAP DATA
   Complete replacement mapdata.js
   ========================================================= */

var simplemaps_usmap_mapdata = {
    main_settings: {
        /* General */
        width: "responsive",
        background_color: "transparent",
        background_transparent: "yes",
        div: "usaMap",
        auto_load: "yes",

        /* State defaults */
        state_description: "none",
        state_color: "#d8d4c7",
        state_hover_color: "#42564a",
        state_url: "",
        border_size: 1.25,
        border_color: "#f7f5ef",

        all_states_inactive: "no",
        all_states_zoomable: "no",

        /* Labels */
        label_color: "#2d3340",
        label_hover_color: "#2d3340",
        label_size: 12,
        label_font: "Arial",
        hide_labels: "no",
        hide_eastern_labels: "no",

        /* Locations */
        location_description: "none",
        location_color: "#b69348",
        location_opacity: 1,
        location_hover_opacity: 1,
        location_size: 18,
        location_type: "circle",
        location_url: "",
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        /* Popups */
        popup_color: "#f7f5ef",
        popup_opacity: 0.96,
        popup_shadow: 1,
        popup_corners: 10,
        popup_font: "Arial",
        popup_nocss: "no",

        /* Zoom and navigation */
        zoom: "yes",
        manual_zoom: "yes",
        back_image: "no",
        initial_back: "no",
        initial_zoom: -1,
        initial_zoom_solo: "no",

        /* Miscellaneous */
        rotate: "0",
        url_new_tab: "no",
        images_directory: "default",
        import_labels: "no",
        fade_time: 0.15,
        link_text: "View State"
    },

    state_specific: {
        HI: {
            name: "Hawaii",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        AK: {
            name: "Alaska",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        FL: {
            name: "Florida",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        NH: {
            name: "New Hampshire",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        VT: {
            name: "Vermont",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        ME: {
            name: "Maine",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        RI: {
            name: "Rhode Island",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        NY: {
            name: "New York",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        PA: {
            name: "Pennsylvania",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        NJ: {
            name: "New Jersey",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        DE: {
            name: "Delaware",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        MD: {
            name: "Maryland",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        VA: {
            name: "Virginia",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        WV: {
            name: "West Virginia",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        OH: {
            name: "Ohio",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        IN: {
            name: "Indiana",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        IL: {
            name: "Illinois",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        CT: {
            name: "Connecticut",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        WI: {
            name: "Wisconsin",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        NC: {
            name: "North Carolina",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        DC: {
            name: "District of Columbia",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        MA: {
            name: "Massachusetts",
            region: "northeast",
            color: "#7897a3",
            hover_color: "#42564a"
        },

        TN: {
            name: "Tennessee",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        AR: {
            name: "Arkansas",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        MO: {
            name: "Missouri",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        GA: {
            name: "Georgia",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        SC: {
            name: "South Carolina",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        KY: {
            name: "Kentucky",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        AL: {
            name: "Alabama",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        LA: {
            name: "Louisiana",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        MS: {
            name: "Mississippi",
            region: "southeast",
            color: "#a99a84",
            hover_color: "#42564a"
        },

        IA: {
            name: "Iowa",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        MN: {
            name: "Minnesota",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        OK: {
            name: "Oklahoma",
            region: "southwest",
            color: "#c58a69",
            hover_color: "#42564a"
        },

        TX: {
            name: "Texas",
            region: "southwest",
            color: "#c58a69",
            hover_color: "#42564a"
        },

        NM: {
            name: "New Mexico",
            region: "southwest",
            color: "#c58a69",
            hover_color: "#42564a"
        },

        KS: {
            name: "Kansas",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        NE: {
            name: "Nebraska",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        SD: {
            name: "South Dakota",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        ND: {
            name: "North Dakota",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        WY: {
            name: "Wyoming",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        MT: {
            name: "Montana",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        CO: {
            name: "Colorado",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        UT: {
            name: "Utah",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        AZ: {
            name: "Arizona",
            region: "southwest",
            color: "#c58a69",
            hover_color: "#42564a"
        },

        NV: {
            name: "Nevada",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        OR: {
            name: "Oregon",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        WA: {
            name: "Washington",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        CA: {
            name: "California",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        },

        MI: {
            name: "Michigan",
            region: "midwest",
            color: "#c4ab72",
            hover_color: "#42564a"
        },

        ID: {
            name: "Idaho",
            region: "west",
            color: "#899988",
            hover_color: "#42564a"
        }
    },

    locations: {},

    labels: {},

    regions: {
        southeast: {
            name: "Southeast",
            states: [
                "AL",
                "AR",
                "FL",
                "GA",
                "KY",
                "LA",
                "MS",
                "NC",
                "SC",
                "TN",
                "VA",
                "WV",
                "DC"
            ]
        },

        southwest: {
            name: "Southwest",
            states: [
                "AZ",
                "NM",
                "OK",
                "TX"
            ]
        },

        midwest: {
            name: "Midwest",
            states: [
                "IL",
                "IN",
                "IA",
                "KS",
                "MI",
                "MN",
                "MO",
                "NE",
                "ND",
                "OH",
                "SD",
                "WI"
            ]
        },

        northeast: {
            name: "Northeast",
            states: [
                "CT",
                "DE",
                "ME",
                "MD",
                "MA",
                "NH",
                "NJ",
                "NY",
                "PA",
                "RI",
                "VT"
            ]
        },

        west: {
            name: "West",
            states: [
                "AK",
                "CA",
                "CO",
                "HI",
                "ID",
                "MT",
                "NV",
                "OR",
                "UT",
                "WA",
                "WY"
            ]
        }
    }
};
