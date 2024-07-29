const snake = new Snake();

input.onButtonPressed(Button.A, () => snake.direction.rotate(-90 * degreesToRadians).round());
input.onButtonPressed(Button.B, () => snake.direction.rotate(90 * degreesToRadians).round());
