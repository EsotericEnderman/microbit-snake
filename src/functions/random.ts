function random(minimum: number, maximum: number, roundInterval?: number) {
    const interval = maximum - minimum; 

    let intervalRandomNumber = Math.random() * interval;

    if (roundInterval) {
        intervalRandomNumber = round(intervalRandomNumber, roundInterval);

        if (intervalRandomNumber > interval) {
            intervalRandomNumber -= roundInterval;
        }
    }

    return minimum + intervalRandomNumber;
}
