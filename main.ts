const minimumX = 0;
const minimumY = 0;

const maximumX = 4;
const maximumY = 4;

function round(number: number, interval: number) {
    return Math.round(number / interval) * interval;
}

function random(minimum: number, maximum: number, interval: number) {
    const intervalRandomNumber = Math.random() * (minimum - maximum);

    const rounded = round(intervalRandomNumber, interval);
    const clamped = Math.max(rounded, rounded - interval);

    return minimum + clamped;
}

type LinkedListElement<T> = {
    value: T;
    next: LinkedListElement<T> | null;
}

class LinkedList<T> {
    elements: LinkedListElement<T>[];

    constructor(...elements: LinkedListElement<T>[]) {
        this.elements = elements;
    }

    get head() {
        return this.elements[0];
    }

    get tail() {
        const elements = this.elements;
        return elements[elements.length - 1];
    }

    public push(element: LinkedListElement<T>) {
        const elements = this.elements;

        elements.push(element);
        elements[elements.length - 2].next = element;
    }

    public pop() {
        const elements = this.elements;

        const secondLast = elements[elements.length - 2];
        secondLast.next = null;

        return elements.pop();
    }
}

class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static getRandomVector(minimumX: number, minimumY: number, maximumX: number, maximumY: number) {
        const x = Math.floor(minimumX + Math.random() * (maximumX - minimumX));
        const y = Math.floor(minimumY + Math.random() * (maximumY - minimumY));

        return new Vector(x, y);
    }
}

type SnakePart = Vector;

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

        }
    }
}

const snake = new Snake();
