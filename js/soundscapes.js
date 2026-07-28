"use strict";

const DB_NAME = "100AdventureSoundscapes";
const DB_VERSION = 1;
const STORE_NAME = "recordings";

const recordButton = document.querySelector("#recordButton");
const stopButton = document.querySelector("#stopButton");
const discardButton = document.querySelector("#discardButton");

const recordingDot = document.querySelector("#recordingDot");
const recordingStatus = document.querySelector("#recordingStatus");
const recordingTime = document.querySelector("#recordingTime");

const recordingPreview = document.querySelector("#recordingPreview");
const previewAudio = document.querySelector("#previewAudio");
const recorderSupport = document.querySelector("#recorderSupport");

const audioUpload = document.querySelector("#audioUpload");

const form = document.querySelector("#soundscapeForm");
const saveButton = document.querySelector("#saveButton");
const formMessage = document.querySelector("#formMessage");

const soundDate = document.querySelector("#soundDate");
const soundList = document.querySelector("#soundList");
const emptyLibrary = document.querySelector("#emptyLibrary");
const soundCount = document.querySelector("#soundCount");

let mediaRecorder = null;
let mediaStream = null;
let recordedChunks = [];

let pendingAudioBlob = null;
let pendingAudioName = "field-recording.webm";

let timerInterval = null;
let elapsedSeconds = 0;
let previewUrl = null;


/*
=========================================================
DEFAULT DATE
=========================================================
*/

soundDate.value = new Date()
    .toISOString()
    .slice(0, 10);


/*
=========================================================
INDEXED DATABASE
=========================================================
*/

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded = () => {

            const database = request.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {

                const store = database.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );

                store.createIndex(
                    "createdAt",
                    "createdAt"
                );
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };

    });
}


async function addRecording(recording) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readwrite"
        );

        transaction
            .objectStore(STORE_NAME)
            .add(recording);

        transaction.oncomplete = () => {

            database.close();
            resolve();

        };

        transaction.onerror = () => {

            database.close();
            reject(transaction.error);

        };

    });
}


async function getRecordings() {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readonly"
        );

        const request = transaction
            .objectStore(STORE_NAME)
            .getAll();

        request.onsuccess = () => {

            const recordings = request.result.sort(
                (first, second) =>
                    second.createdAt - first.createdAt
            );

            resolve(recordings);

        };

        request.onerror = () => {
            reject(request.error);
        };

        transaction.oncomplete = () => {
            database.close();
        };

    });
}


async function deleteRecording(id) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readwrite"
        );

        transaction
            .objectStore(STORE_NAME)
            .delete(id);

        transaction.oncomplete = () => {

            database.close();
            resolve();

        };

        transaction.onerror = () => {

            database.close();
            reject(transaction.error);

        };

    });
}


/*
=========================================================
RECORDER UTILITIES
=========================================================
*/

function chooseMimeType() {

    const supportedTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/mp4"
    ];

    return supportedTypes.find(type => {
        return window.MediaRecorder?.isTypeSupported(type);
    }) || "";

}


function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

    const remainingSeconds = (seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;

}


function startTimer() {

    elapsedSeconds = 0;
    recordingTime.textContent = "00:00";

    timerInterval = window.setInterval(() => {

        elapsedSeconds += 1;

        recordingTime.textContent =
            formatTime(elapsedSeconds);

    }, 1000);

}


function stopTimer() {

    window.clearInterval(timerInterval);
    timerInterval = null;

}


function releaseMicrophone() {

    if (!mediaStream) {
        return;
    }

    mediaStream
        .getTracks()
        .forEach(track => track.stop());

    mediaStream = null;

}


/*
=========================================================
PENDING RECORDING
=========================================================
*/

function setPendingAudio(
    blob,
    filename = "field-recording.webm"
) {

    pendingAudioBlob = blob;
    pendingAudioName = filename;

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(blob);

    previewAudio.src = previewUrl;

    recordingPreview.hidden = false;
    discardButton.hidden = false;
    saveButton.disabled = false;

    recordingStatus.textContent =
        "Ready to add to your library";

}


function clearPendingAudio() {

    pendingAudioBlob = null;
    pendingAudioName = "field-recording.webm";

    previewAudio.removeAttribute("src");
    previewAudio.load();

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }

    previewUrl = null;

    recordingPreview.hidden = true;
    discardButton.hidden = true;
    saveButton.disabled = true;

    audioUpload.value = "";

    recordingStatus.textContent =
        "Ready to listen";

    recordingTime.textContent = "00:00";

    elapsedSeconds = 0;

}


/*
=========================================================
START RECORDING
=========================================================
*/

async function startRecording() {

    formMessage.textContent = "";

    if (
        !navigator.mediaDevices?.getUserMedia ||
        !window.MediaRecorder
    ) {

        recorderSupport.textContent =
            "This browser cannot record directly. You can still import an audio file.";

        return;
    }

    try {

        clearPendingAudio();

        mediaStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        recordedChunks = [];

        const mimeType = chooseMimeType();

        mediaRecorder = mimeType
            ? new MediaRecorder(
                mediaStream,
                { mimeType }
            )
            : new MediaRecorder(mediaStream);


        mediaRecorder.addEventListener(
            "dataavailable",
            event => {

                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }

            }
        );


        mediaRecorder.addEventListener(
            "stop",
            () => {

                const blob = new Blob(
                    recordedChunks,
                    {
                        type:
                            mediaRecorder.mimeType ||
                            "audio/webm"
                    }
                );

                let extension = "webm";

                if (blob.type.includes("mp4")) {
                    extension = "m4a";
                }

                if (blob.type.includes("ogg")) {
                    extension = "ogg";
                }

                setPendingAudio(
                    blob,
                    `100-adventure-${Date.now()}.${extension}`
                );

                releaseMicrophone();

            }
        );


        mediaRecorder.start(250);

        recordButton.disabled = true;
        stopButton.disabled = false;

        recordingDot.classList.add(
            "is-recording"
        );

        recordingStatus.textContent =
            "Recording the atmosphere…";

        startTimer();

    } catch (error) {

        console.error(error);

        recorderSupport.textContent =
            "Microphone access was not available. Check your browser permission or import a Voice Memo instead.";

        releaseMicrophone();

    }

}


/*
=========================================================
STOP RECORDING
=========================================================
*/

function stopRecording() {

    if (mediaRecorder?.state === "recording") {
        mediaRecorder.stop();
    }

    stopTimer();

    recordButton.disabled = false;
    stopButton.disabled = true;

    recordingDot.classList.remove(
        "is-recording"
    );

}


/*
=========================================================
TEXT SAFETY
=========================================================
*/

function escapeHtml(value = "") {

    return value.replace(
        /[&<>'"]/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#039;",
            '"': "&quot;"
        })[character]
    );

}


function formatDisplayDate(value) {

    if (!value) {
        return "Date not added";
    }

    const date = new Date(
        `${value}T12:00:00`
    );

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    ).format(date);

}


/*
=========================================================
RENDER SOUND LIBRARY
=========================================================
*/

async function renderLibrary() {

    try {

        const recordings = await getRecordings();

        soundCount.textContent =
            `${recordings.length} field recording${
                recordings.length === 1
                    ? ""
                    : "s"
            }`;

        emptyLibrary.hidden =
            recordings.length > 0;

        soundList.innerHTML = "";


        recordings.forEach(recording => {

            const article =
                document.createElement("article");

            article.className = "sound-card";

            const audioUrl =
                URL.createObjectURL(
                    recording.audioBlob
                );

            article.dataset.audioUrl =
                audioUrl;


            const tags = (
                recording.tags || []
            )
                .map(tag => {
                    return `
                        <span>
                            ${escapeHtml(tag)}
                        </span>
                    `;
                })
                .join("");


            const details = [
                recording.season,
                recording.timeOfDay,
                recording.weather
            ]
                .filter(Boolean)
                .map(item => {
                    return `
                        <span>
                            ${escapeHtml(item)}
                        </span>
                    `;
                })
                .join("");


            article.innerHTML = `

                <div class="sound-card__topline">

                    <p class="section-marker">
                        Field Recording
                    </p>

                    <button
                        class="sound-card__delete"
                        type="button"
                        data-id="${recording.id}"
                        aria-label="Delete ${escapeHtml(recording.title)}"
                    >
                        Delete
                    </button>

                </div>


                <h3>
                    ${escapeHtml(recording.title)}
                </h3>


                <p class="sound-card__place">

                    ${
                        escapeHtml(
                            recording.location ||
                            "Place not added"
                        )
                    }

                    ·

                    ${
                        formatDisplayDate(
                            recording.date
                        )
                    }

                </p>


                <audio
                    controls
                    preload="metadata"
                    src="${audioUrl}"
                ></audio>


                ${
                    details
                        ? `
                            <div class="sound-card__details">
                                ${details}
                            </div>
                        `
                        : ""
                }


                ${
                    recording.note
                        ? `
                            <p class="sound-card__note">
                                ${escapeHtml(recording.note)}
                            </p>
                        `
                        : ""
                }


                ${
                    tags
                        ? `
                            <div class="sound-card__tags">
                                ${tags}
                            </div>
                        `
                        : ""
                }

            `;

            soundList.append(article);

        });

    } catch (error) {

        console.error(error);

        soundList.innerHTML = `
            <p>
                We could not open your Sound Library in this browser.
            </p>
        `;

    }

}


/*
=========================================================
BUTTON EVENTS
=========================================================
*/

recordButton.addEventListener(
    "click",
    startRecording
);

stopButton.addEventListener(
    "click",
    stopRecording
);

discardButton.addEventListener(
    "click",
    clearPendingAudio
);


/*
=========================================================
IMPORT EXISTING AUDIO
=========================================================
*/

audioUpload.addEventListener(
    "change",
    event => {

        const [file] =
            event.target.files;

        if (!file) {
            return;
        }

        const hasAudioType =
            file.type.startsWith("audio/");

        const hasAudioExtension =
            /\.(m4a|mp3|wav|aac|ogg|webm)$/i
                .test(file.name);

        if (
            !hasAudioType &&
            !hasAudioExtension
        ) {

            formMessage.textContent =
                "Please choose an audio recording.";

            return;
        }

        setPendingAudio(
            file,
            file.name
        );

        const titleInput =
            document.querySelector(
                "#soundTitle"
            );

        if (!titleInput.value) {

            titleInput.value =
                file.name.replace(
                    /\.[^.]+$/,
                    ""
                );

        }

    }
);


/*
=========================================================
SAVE RECORDING
=========================================================
*/

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        formMessage.textContent = "";

        if (!pendingAudioBlob) {

            formMessage.textContent =
                "Record or import a sound before saving.";

            return;
        }


        const formData =
            new FormData(form);

        const title = String(
            formData.get("title") || ""
        ).trim();


        if (!title) {

            formMessage.textContent =
                "Give this soundscape a title.";

            return;
        }


        saveButton.disabled = true;

        saveButton.textContent =
            "Adding to Library…";


        const recording = {

            title,

            location: String(
                formData.get("location") || ""
            ).trim(),

            date: String(
                formData.get("date") || ""
            ),

            season: String(
                formData.get("season") || ""
            ),

            timeOfDay: String(
                formData.get("timeOfDay") || ""
            ),

            weather: String(
                formData.get("weather") || ""
            ).trim(),

            tags: String(
                formData.get("tags") || ""
            )
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean)
                .slice(0, 12),

            note: String(
                formData.get("note") || ""
            ).trim(),

            originalFilename:
                pendingAudioName,

            audioBlob:
                pendingAudioBlob,

            createdAt:
                Date.now()

        };


        try {

            await addRecording(recording);

            form.reset();

            soundDate.value =
                new Date()
                    .toISOString()
                    .slice(0, 10);

            clearPendingAudio();

            formMessage.textContent =
                "Added to your Sound Library.";

            await renderLibrary();

            document
                .querySelector("#library-title")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        } catch (error) {

            console.error(error);

            formMessage.textContent =
                "This recording could not be saved. Your browser storage may be full.";

        } finally {

            saveButton.textContent =
                "Add to Sound Library";

            saveButton.disabled =
                !pendingAudioBlob;

        }

    }
);


/*
=========================================================
DELETE RECORDING
=========================================================
*/

soundList.addEventListener(
    "click",
    async event => {

        const button =
            event.target.closest(
                ".sound-card__delete"
            );

        if (!button) {
            return;
        }

        const confirmed =
            window.confirm(
                "Remove this soundscape from this device?"
            );

        if (!confirmed) {
            return;
        }

        await deleteRecording(
            Number(button.dataset.id)
        );

        await renderLibrary();

    }
);


/*
=========================================================
PAGE CLEANUP
=========================================================
*/

window.addEventListener(
    "beforeunload",
    () => {

        releaseMicrophone();

        document
            .querySelectorAll(".sound-card")
            .forEach(card => {

                if (card.dataset.audioUrl) {

                    URL.revokeObjectURL(
                        card.dataset.audioUrl
                    );

                }

            });

    }
);


/*
=========================================================
BROWSER SUPPORT MESSAGE
=========================================================
*/

if (
    !navigator.mediaDevices?.getUserMedia ||
    !window.MediaRecorder
) {

    recordButton.disabled = true;

    recorderSupport.textContent =
        "Direct recording is not supported here, but importing audio still works.";

} else if (!window.isSecureContext) {

    recordButton.disabled = true;

    recorderSupport.textContent =
        "Microphone recording works after the site is published with HTTPS. Importing audio works now.";

} else {

    recorderSupport.textContent =
        "Recordings stay private on this device in Version 1.";

}


/*
=========================================================
INITIALIZE
=========================================================
*/

renderLibrary();
