function chooseRandomly<T>(elements: T[]) {
    return elements[round(random(0, elements.length - 1))];
}
