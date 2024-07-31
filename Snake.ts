class Snake {
    direction: Vector;

    parts: BiDirectionalLinkedList<SnakePart> = new BiDirectionalLinkedList([]);

    constructor(parts?: BiDirectionalLinkedList<SnakePart>, direction?: Vector) {
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

        for (let i = this.parts.length - 1; i >= 0; i--) {
            console.log("Moving part " + (i + 1));

            const part = this.parts.elements[i];

            const isFirstPart = part === this.parts.head;
            const isLastPart = part === this.parts.tail;

            if (isLastPart) {
                console.log("Unplotting " + part.value.toString());
                led.unplot(part.value.x, part.value.y);
            }

            if (isFirstPart) {
                console.log("Part " + (i + 1) + " is pointing to " + part.next.value.toString());
                console.log("Part " + (i + 1) + " is the first part");
                part.value.addVector(this.direction);
                ledSquare.wrapAround(part.value);
            } else {
                part.value = part.previous.value.clone();
            }
        }

        console.log("Snake = " + this.toString());

        if (this.hasCollectedCollectible()) {
            this.onCollectedCollectible();
        }

        this.draw();
    }

    private draw() {
        for (const part of this.parts.elements) {
            led.plot(part.value.x, part.value.y);
        }
    }

    private onCollectedCollectible() {
        console.log("Collected collectible");

        Collectible.instance.collect();
        this.grow();
    }

    private grow() {
        const tail = this.parts.tail;

        let directions = cloneArray(Vector.cardinalDirections);

        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];
            const cloned = ledSquare.wrapAround(tail.value.clone().addVector(direction));

            if (this.isOnPosition(cloned)) {
                directions.splice(i, 1);
                i--;
            }
        }

        if (directions.length === 0) {
            this.gameOver();
            return;
        }

        const selectedDirection = chooseRandomly(directions);
        const newPart = ledSquare.wrapAround(tail.value.clone().addVector(selectedDirection));

        this.parts.push(newPart);
    }

    private gameOver() {
        basic.showString("GAME OVER!");
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

    public static generateRandomParts(partCount: number): BiDirectionalLinkedList<SnakePart> {
        let currentPosition = Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY);

        console.log("Starting position = " + currentPosition.toString());

        const parts: BiDirectionalLinkedList<SnakePart> = new BiDirectionalLinkedList(
            [{
                value: currentPosition.clone(),
                next: null,
                previous: null
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
