const minimumX = 0;
const minimumY = 0;

const maximumX = 4;
const maximumY = 4;

const degreesToRadians = Math.PI / 180;
const radiansToDegrees = 1 / degreesToRadians;

const startingSnakeLength = 2;

const ledSquare = new Square(new Vector(minimumX, minimumY), maximumX - minimumX + 1);

const snakeMoveIntervalMilliseconds = 1000;
