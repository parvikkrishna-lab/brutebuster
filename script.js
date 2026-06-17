// --- WORDLIST FOR PASSPHRASE GENERATION ---
// --- EXPANDED WORDLIST FOR PASSPHRASE GENERATION (100 WORDS) ---
const wordPool = [
    // Tech & Cyberpunk
    "cyber", "matrix", "quantum", "vector", "binary", "glitch", "beacon", "cipher", "monolith", "silicon",
    "breach", "firewall", "pixel", "kernel", "router", "subway", "uplink", "bypass", "protocol", "phantom",
    // Nature & Geology
    "tundra", "granite", "vortex", "timber", "canyon", "glacier", "avalanche", "volcano", "zephyr", "eclipse",
    "boulder", "monsoon", "cavern", "meteor", "nebula", "galaxy", "horizon", "summit", "wildwood", "sequoia",
    // Medieval & Stronghold
    "forge", "shield", "shadow", "castle", "knight", "anchor", "fortress", "bastion", "citadel", "paladin",
    "gauntlet", "rampart", "garrison", "turret", "sentinel", "vanguard", "chalice", "dynasty", "kingdom", "warlord",
    // Animals & Creatures
    "falcon", "panther", "mammoth", "griffin", "phoenix", "raptor", "badger", "leopard", "grizzly", "stallion",
    "viper", "cobra", "kraken", "scallop", "walrus", "cheetah", "condor", "scorpion", "coyote", "mustang",
    // Abstract, Science & Objects
    "battery", "staple", "velocity", "isotope", "friction", "gravity", "spectrum", "symmetry", "catalyst", "paradox",
    "resonance", "kinetic", "octane", "alchemy", "chronicle", "pinnacle", "mirage", "phantom", "odyssey", "meridian"
];

// --- DOM ELEMENT REFERENCES ---
const lengthSlider = document.getElementById('pass-length');
const lengthValueDisplay = document.getElementById('length-val');
const typeRandomRadio = document.getElementById('type-random');
const typePhraseRadio = document.getElementById('type-phrase');
const charOptionsContainer = document.getElementById('character-options');
const gameInput = document.getElementById('game-input');
const terminalDisplay = document.getElementById('terminal');
const strengthBadgeContainer = document.getElementById('strength-output');

let typingDebounceTimeout;

// --- INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Synchronize slider track changes
    lengthSlider.addEventListener('input', handleSliderInput);
    
    // Wire context mutation rules on generation type change
    typeRandomRadio.addEventListener('change', adaptGenerationContext);
    typePhraseRadio.addEventListener('change', adaptGenerationContext);
    
    // Wire live analytics key entry listener to mini game input
    gameInput.addEventListener('input', (e) => runGauntlet(e.target.value));
});

// --- ADAPTIVE INTERFACE LOGIC ---
function handleSliderInput() {
    const isPhrase = typePhraseRadio.checked;
    lengthValueDisplay.innerText = `${lengthSlider.value} ${isPhrase ? 'words' : 'characters'}`;
}

function adaptGenerationContext() {
    if (typePhraseRadio.checked) {
        // Morph settings for word configuration
        lengthSlider.min = 3;
        lengthSlider.max = 10;
        lengthSlider.value = 4;
        lengthValueDisplay.innerText = "4 words";
        charOptionsContainer.style.opacity = "0.3";
        charOptionsContainer.style.pointerEvents = "none"; // Disable options contextually
    } else {
        // Snap back settings to standalone character criteria
        lengthSlider.min = 6;
        lengthSlider.max = 30;
        lengthSlider.value = 12;
        lengthValueDisplay.innerText = "12 characters";
        charOptionsContainer.style.opacity = "1";
        charOptionsContainer.style.pointerEvents = "auto";
    }
}

// --- PASSWORD GENERATION LOGIC ---
function generatePassword() {
    const lengthSetting = parseInt(lengthSlider.value);
    const isPhrase = typePhraseRadio.checked;
    let computedOutput = "";

    if (isPhrase) {
        let phraseArray = [];
        for (let i = 0; i < lengthSetting; i++) {
            const randomIndex = Math.floor(Math.random() * wordPool.length);
            phraseArray.push(wordPool[randomIndex]);
        }
        computedOutput = phraseArray.join("-");
    } else {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const num = "0123456789";
        const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let usableChars = "";
        if (document.getElementById('inc-upper').checked) usableChars += upper;
        if (document.getElementById('inc-lower').checked) usableChars += lower;
        if (document.getElementById('inc-numbers').checked) usableChars += num;
        if (document.getElementById('inc-symbols').checked) usableChars += sym;

        if (usableChars === "") {
            alert("Please select at least one character parameter subset!");
            return;
        }

        for (let i = 0; i < lengthSetting; i++) {
            computedOutput += usableChars.charAt(Math.floor(Math.random() * usableChars.length));
        }
    }

    document.getElementById('generated-password').innerText = computedOutput;
}

function copyPassword() {
    const textToCopy = document.getElementById('generated-password').innerText;
    if (textToCopy === "Click Generate Below" || textToCopy === "") return;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => alert("Copied successfully to clipboard."))
        .catch(() => alert("Clipboard copying failed. Ensure secure HTTPS delivery environments."));
}

// --- TRAINING SIMULATOR ENGINE (THE GAUNTLET) ---
function runGauntlet(password) {
    clearTimeout(typingDebounceTimeout);

    if (!password) {
        terminalDisplay.innerHTML = "[SYSTEM]: Awaiting target input...";
        terminalDisplay.style.color = "#00ff00";
        terminalDisplay.style.borderColor = "#22c55e";
        strengthBadgeContainer.innerHTML = "";
        return;
    }

    // Process entropy arrays locally via dependency engine injection
    const stats = zxcvbn(password);
    const complexScore = stats.score; 
    const computationsToCrack = stats.crack_times_display.offline_fast_hashing_1e10_per_second;

    const healthMetrics = [
        { text: "CRITICAL WEAKNESS", color: "var(--danger)" },
        { text: "WEAK DEFENSES", color: "#f97316" },
        { text: "MODERATE CAPACITY", color: "#eab308" },
        { text: "STRONG STANDING", color: "#a855f7" },
        { text: "UNBREAKABLE FORGE", color: "var(--success)" }
    ];
    
    strengthBadgeContainer.innerHTML = `<span class="strength-badge" style="background-color: ${healthMetrics[complexScore].color}">${healthMetrics[complexScore].text}</span>`;

    // Render loading sequence block
    terminalDisplay.innerHTML = `[CRACKING ENGINE RUNNING]...<br>Parsing structural sequences...<br>Calculating complexity dictionaries...`;
    terminalDisplay.style.color = "#ff9900";
    terminalDisplay.style.borderColor = "#ff9900";

    typingDebounceTimeout = setTimeout(() => {
        let assessmentOutput = `[CRACK PERFORMANCE REPORT]<br>`;
        assessmentOutput += `Time to intercept entry point via standard arrays: <span style="color:#ffffff; font-weight:bold;">${computationsToCrack}</span><br><br>`;

        if (complexScore <= 1) {
            terminalDisplay.style.color = "var(--danger)";
            terminalDisplay.style.borderColor = "var(--danger)";
            assessmentOutput += `⚠️ ACCESS BREACHED! Found high-correlation systemic matches to common linguistic words or sequential keys. Modern automated standard scripts bypass this security wall immediately.`;
        } else if (complexScore <= 3) {
            terminalDisplay.style.color = "#eab308";
            terminalDisplay.style.borderColor = "#eab308";
            assessmentOutput += `⚠️ VULNERABLE THREAT INDICATION! Passable metrics, but susceptible to pattern mutation models (e.g. basic character swaps or predictable appended digits).`;
        } else {
            terminalDisplay.style.color = "var(--success)";
            terminalDisplay.style.borderColor = "var(--success)";
            assessmentOutput += `🛡️ FORGE ARCHITECTURE LOCKED! High structural diversity. Brute force systems encounter mathematical scaling problems trying to break this composition.`;
        }
        
        if (stats.feedback.warning) {
            assessmentOutput += `<br><br><span style="color:#fda4af; font-size:0.85rem;">Heuristic Flag: ${stats.feedback.warning}</span>`;
        }

        terminalDisplay.innerHTML = assessmentOutput;
    }, 350); 
}