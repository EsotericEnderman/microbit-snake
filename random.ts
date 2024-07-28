function random(minimum: number, maximum: number, interval?: number) {
    const intervalRandomNumber = Math.random() * (minimum - maximum);

    if (!interval) {
        return minimum + intervalRandomNumber;
    }

    const rounded = round(intervalRandomNumber, interval);
    const clamped = Math.max(rounded, rounded - interval);

    return minimum + clamped;
}
