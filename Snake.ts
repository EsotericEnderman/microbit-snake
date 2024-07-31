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

            this.direction = chooseRandomly(directions);
        }

        loops.everyInterval(snakeMoveIntervalMilliseconds, () => this.move())

        input.onButtonPressed(Button.A, () => snake.direction.rotate(-90 * degreesToRadians).round());
        input.onButtonPressed(Button.B, () => snake.direction.rotate(90 * degreesToRadians).round());
    }

    private move() {
        for (let i = this.parts.length - 1; i >= 0; i--) {
            const part = this.parts.elements[i];

            const isFirstPart = part === this.head;
            const isLastPart = part === this.tail;

            if (isLastPart) {
                led.unplot(part.value.x, part.value.y);
            }

            if (isFirstPart) {
                part.value.addVector(this.direction);
                ledSquare.wrapAround(part.value);
            } else {
                part.value = part.previous.value.clone();
            }
        }

        if (this.isTouchingSelf()) {
            this.gameOver();
            return;
        }

        if (this.hasCollectedCollectible()) {
            this.onCollectedCollectible();
        }

        this.draw();
    }

    private isTouchingSelf() {
        for (const part of this.parts.elements) {
            const partsTouchingPosition = this.getPartsTouchingPosition(part.value);

            for (const partTouchingPosition of partsTouchingPosition) {
                if (partTouchingPosition === part) {
                    continue;
                }

                return true;
            }
        }

        return false;
    }

    private draw() {
        for (const part of this.parts.elements) {
            led.plot(part.value.x, part.value.y);
        }
    }

    private onCollectedCollectible() {
        Collectible.instance.collect();
        this.grow();
    }

    private grow() {
        const tail = this.tail;

        let directions = cloneArray(Vector.cardinalDirections);

        for (let i = 0; i < directions.length; i++) {
            const direction = directions[i];

            const cloned = ledSquare.wrapAround(this.tail.value.clone().addVector(direction));

            const isInvalidPosition = this.isOnPosition(cloned);
            if (isInvalidPosition) {
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

        return parts;
    }
}
