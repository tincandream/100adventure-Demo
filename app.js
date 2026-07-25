document.addEventListener("DOMContentLoaded", function () {
    const run = (label, fn) => {
        try {
            fn();
        } catch (err) {
            console.error(
                `[100 Adventure] ${label} failed:`,
                err
            );
        }
    };

    run("renderAdventure", () => renderAdventure());

    run("showTab", () =>
        showTab(
            "overview",
            document.querySelector(
                '.issue-tab[data-tab="overview"]'
            )
        )
    );

    run("updateProgress", () => updateProgress());
});
