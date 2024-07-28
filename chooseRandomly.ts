function chooseRandomly<T>(elements: T[]) {
    return elements[random(0, elements.length - 1)];
}
