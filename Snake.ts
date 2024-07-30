class Snake {
    direction: Vector;

    parts: LinkedList<SnakePart> = new LinkedList([]);

    constructor(parts?: LinkedList<SnakePart>, direction?: Vector) {
        this.parts = parts;

        if (!this.parts) {
            this.parts = Snake.generateRandomParts(startingSnakeLength);
        }

        this.direction = direction;

        if (!this.direction) {
            const directions = cloneArray(Vector.cardinalDirections);

            for (let i = 0; i < directions.length; i++) {
                const head = this.parts.head;

                const clone = head.value.clone().addVector(directions[i]);

                if (this.isOnPosition(clone)) {
                    directions.splice(i, 1);
                    i--;
                }
            }

            console.log("There are " + directions.length + " directions to choose from");
            this.direction = chooseRandomly(directions);
            console.log("Chosen direction = " + this.direction);

            console.log("Snake = " + this.toString());
        }

        loops.everyInterval(snakeMoveIntervalMilliseconds, () => this.move())

        input.onButtonPressed(Button.A, () => snake.direction.rotate(-90 * degreesToRadians).round());
        input.onButtonPressed(Button.B, () => snake.direction.rotate(90 * degreesToRadians).round());
    }

    private move() {
        if (!this.direction) {
            console.log("No direction defined");
        }

        console.log("Snake = " + this.toString())

        console.log("Moving in direction " + this.direction);

        console.log("There are " + this.parts.length + " parts");

        for (let i = 0; i < this.parts.length; i++) {
            console.log("Moving part " + (i + 1));

            const part = this.parts.elements[i];

            if (part === this.parts.tail) {
                led.unplot(part.value.x, part.value.y);
            }

            if (part.next) {
                console.log("Part " + (i + 1) + " is pointing to " + part.next.value.toString());
                part.value = part.next.value.clone();
            } else {
                console.log("Part " + (i + 1) + " is the first part");
                part.value.addVector(this.direction);
                ledSquare.wrapAround(part.value);
            }
        }

        console.log("Snake = " + this.toString());

        this.draw();
    }

    private draw() {
        for (const part of this.parts.elements) {
            led.plot(part.value.x, part.value.y);
        }
    }

    public hasCollectedCollectible() {
        return this.isOnPosition(Collectible.instance.position);
    }

    public isOnPosition(position: Vector) {
        for (const part of this.parts.elements) {
            if (part.value.equals(position)) {
                return true;
            }
        }

        return false;
    }

    public toString() {
        let string = "[";

        for (const position of this.parts.elements) {
            string += position.value.toString();
        }

        string += "]";

        return string;
    }

    public static generateRandomParts(partCount: number): LinkedList<SnakePart> {
        let currentPosition = Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY);

        console.log("Starting position = " + currentPosition.toString());

        const parts: LinkedList<SnakePart> = new LinkedList(
            [{
                value: currentPosition.clone(),
                next: null
            }]
        )

        for (let i = 1; i < partCount; i++) {
            const directions = cloneArray(Vector.cardinalDirections);

            for (let i = 0; i < directions.length; i++) {
                const direction = directions[i];

                const positionClone = currentPosition.clone();
                positionClone.addVector(direction);

                const isOutOfBounds = !ledSquare.includes(positionClone);

                if (isOutOfBounds) {
                    directions.splice(i, 1);
                    i--;
                }
            }

            const direction = chooseRandomly(directions);
            currentPosition.addVector(direction);

            parts.push(currentPosition.clone());
        }

        console.log("Generated " + parts.length + " random parts");
        console.log("Head = " + parts.head.value.toString());
        console.log("Tail = " + parts.tail.value.toString());

        return parts;
    }
}
