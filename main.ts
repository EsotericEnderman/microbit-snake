const minimumX = 0;
const minimumY = 0;

const maximumX = 4;
const maximumY = 4;

const degreesToRadians = Math.PI / 180;
const radiansToDegrees = 1 / degreesToRadians;

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

    public static readonly north = new Vector(0, 1);
    public static readonly east = new Vector(1, 0);
    public static readonly south = new Vector(0, -1);
    public static readonly west = new Vector(-1, 0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public rotate(angle: number) {
        const currentAngle = Math.atan2(this.y, this.x);
        const magnitude = this.magnitude;

        const newAngle = currentAngle + angle;
        this.x = Math.cos(newAngle) * magnitude;
        this.y = Math.sin(newAngle) * magnitude;

        return this;
    }

    public round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    public add(x: number, y: number) {
        this.x += x;
        this.y += y;

        return this;
    }

    public addVector(vector: Vector) {
        return this.add(vector.x, vector.y);
    }

    public clone() {
        return new Vector(this.x, this.y);
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
