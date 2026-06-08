export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

let globalId = 0

export function getId() {
    return ++globalId
}