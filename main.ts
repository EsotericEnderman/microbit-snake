const minimumX = 0;
const minimumY = 0;

const maximumX = 4;
const maximumY = 4;

type LinkedListElement<T> = {
  value: T;
  next: LinkedListElement<T> | null;
}

type LinkedList<T> = {
    head: LinkedListElement<T>;
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

    public static generateRandomParts(count: number) {
        const startingLocation = Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY);
    }
}

const snake = new Snake();
