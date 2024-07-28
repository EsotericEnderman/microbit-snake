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
