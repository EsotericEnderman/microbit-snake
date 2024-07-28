class Rectangle {
    topLeft: Vector;

    width: number;
    height: number;

    constructor(topLeft: Vector, width: number, height: number) {
        this.topLeft = topLeft;
        
        this.width = width;
        this.height = height;
    }

    public get maximumX() {
        return this.topLeft.x + this.width;
    }

    public get maximumY() {
        return this.topLeft.y + this.height;
    }

    public get minimumX() {
        return this.topLeft.x;
    }

    public get minimumY() {
        return this.topLeft.y;
    }

    public includes(position: Vector) {
        const { x, y } = position;

        return x > this.minimumX && x < this.maximumX && y > this.minimumY && y < this.maximumY;
    }
}
