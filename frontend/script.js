async function analyzeSentiment() {
    const tweet = document.getElementById("tweetInput").value;
    if (!tweet.trim()) return alert("Bitte gib einen Tweet-Text ein.");

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: tweet })
        });

        const result = await response.json();

        document.getElementById("biasLabel").textContent = labelToText(result.label);
        document.getElementById("confidence").textContent = (result.confidence * 100).toFixed(2) + "%";
        document.getElementById("resultBox").classList.remove("d-none");
    } catch (error) {
        console.error("Fehler bei der Analyse:", error);
        alert("Analyse fehlgeschlagen. Bitte versuche es erneut.");
    }
}

function labelToText(label) {
    switch (label) {
        case 0:
            return "Pro Russland 🇷🇺";
        case 1:
            return "Neutral ⚖️";
        case 2:
            return "Pro Ukraine 🇺🇦";
        default:
            return "Unbekannt";
    }
}

// Abrufen des aktuellen Bias-Scores beim Laden
window.onload = async function () {
    try {
        const response = await fetch("/bias_score_current_month");
        const data = await response.json();

        const biasScore = data.bias_score; // Erwartet Wert zwischen -1 und +1
        const indicator = document.getElementById("biasIndicator");

        // Score von [-1, 1] in Prozent umrechnen (0 bis 100%)
        const percent = ((biasScore + 1) / 2) * 100;
        indicator.style.left = `calc(${percent}% - 1px)`;

        document.getElementById("biasScoreLabel").textContent = `Bias-Score: ${biasScore.toFixed(2)}`;
    } catch (error) {
        console.warn("Bias-Score konnte nicht geladen werden.", error);
    }
};
