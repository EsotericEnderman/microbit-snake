class Collectible {

    public static instance: Collectible;

    public readonly position: Vector;

    private constructor(position: Vector) {
        if (Collectible.instance) {
            Collectible.instance.despawn();
        }

        this.position = position;

        led.plot(position.x, position.y);
    }

    public static initialise() {
        Collectible.instance = Collectible.getRandomCollectible();
    }

    public collect() {
        this.despawn();
        Collectible.instance = Collectible.getRandomCollectible();
    }

    public despawn() {
        led.unplot(this.position.x, this.position.y);
    }

    public static getRandomCollectible() {
        return new Collectible(Vector.getRandomVector(minimumX, minimumY, maximumX, maximumY));
    }
}
