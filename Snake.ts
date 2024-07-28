class Snake {
    direction: Vector;

    parts: LinkedList<SnakePart>;

    public static generateRandomParts(partCount: number) {
        const startingLocation = Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY);

        const parts: LinkedList<SnakePart> = new LinkedList(
            {
                value: startingLocation,
                next: null
            }
        )

        for (let i = 1; i <= partCount; i++) {
            const rotation = random(0, 270, 90);
            console.log(rotation);

            const direction = Vector.east.clone().rotate(random(0, 270, 90) * degreesToRadians);

            console.log(direction.x);
            console.log(direction.y);
        }
    }
}
