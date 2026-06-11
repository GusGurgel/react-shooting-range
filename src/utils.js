export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

let globalId = 0
export function getId() {
    return ++globalId
}

export function getFormattedDate(date) {
    const pad = (n) => String(n).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Meses são base 0
    const year = String(date.getFullYear()).slice(-2);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getScoresFromLocalStore() {
    let scores = localStorage.getItem("scores") || "[]"
    return JSON.parse(scores)
}

export function getHighScoreFromLocalStore(difficulty) {
    let scores = getScoresFromLocalStore(difficulty)
    scores = scores.filter(value => value.difficulty === difficulty)
    return scores.reduce((max, current) => (current.value || 0) > (max.value || 0) ? current : max, { value: 0 })
}

export function addScoreToLocalStore(score, difficulty = "Easy") {
    let scores = getScoresFromLocalStore()
    scores.push({ value: score, date: new Date(), difficulty })
    localStorage.setItem("scores", JSON.stringify(scores))
}

export function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}