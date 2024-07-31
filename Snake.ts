class Snake {
    private direction: Vector;

    private parts: BiDirectionalLinkedList<SnakePart> = new BiDirectionalLinkedList([]);

    get head() {
        return this.parts.head;
    }

    get tail() {
        return this.parts.tail;
    }

    constructor(parts?: BiDirectionalLinkedList<SnakePart>, direction?: Vector) {
        this.parts = parts;

        if (!this.parts) {
            this.parts = Snake.generateRandomParts(startingSnakeLength);
        }

        this.direction = direction;

        if (!this.direction) {
            const directions = cloneArray(Vector.cardinalDirections);

            for (let i = 0; i < directions.length; i++) {
                const clone = this.head.value.clone().addVector(directions[i]);

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

            const isFirstPart = part === this.head;
            const isLastPart = part === this.tail;

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
        console.log("Growing snake");

        const tail = this.tail;

        console.log("The tail is at " + tail.value.toString());

        let directions = cloneArray(Vector.cardinalDirections);

        console.log("Directions: ")
        for (const direction of directions) {
            console.log(direction.toString());
        }

        console.log("Directions: ")
        for (const direction of Vector.cardinalDirections) {
            console.log(direction.toString());
        }

        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];

            console.log("Checking direction " + direction.toString());

            const cloned = ledSquare.wrapAround(this.tail.value.clone().addVector(direction));

            console.log("Checking position " + cloned.toString());

            const isInvalidPosition = this.isOnPosition(cloned);
            console.log("Is invalid position: " + isInvalidPosition);

            if (isInvalidPosition) {
                console.log(cloned.toString() + " is an invalid position to grow to");
                directions.splice(i, 1);
                i--;
            }
        }

        console.log("Found " + directions.length + " directions to choose from");

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
        return this.getPartsTouchingPosition(position).length !== 0;
    }

    public getPartsTouchingPosition(position: Vector) {
        const parts = [];

        for (const part of this.parts.elements) {
            if (part.value.equals(position)) {
                parts.push(part);
            }
        }

        return parts;
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
