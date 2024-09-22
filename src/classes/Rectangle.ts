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

        return x >= this.minimumX && x <= this.maximumX && y >= this.minimumY && y <= this.maximumY;
    }

    public wrapAround(vector: Vector) {
        let intervalX = vector.x - this.minimumX;

        if (intervalX < 0) {
            intervalX = Math.abs(intervalX);
            intervalX %= this.width;
            intervalX = this.maximumX - intervalX - this.minimumX;
        } else {
            intervalX %= this.width;
        }

        let intervalY = vector.y - this.minimumY;

        if (intervalY < 0) {
            intervalY = Math.abs(intervalY);
            intervalY %= this.height;
            intervalY = this.maximumY - intervalY - this.minimumY;
        } else {
            intervalY %= this.height;
        }

        vector.x = this.minimumX + intervalX;
        vector.y = this.minimumY + intervalY;

        return vector;
    }
}
