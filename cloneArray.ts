function cloneArray<T>(array: T[]) {
    const newArray: T[] = [];

    for (const element of array) {
        newArray.push(element)
    }

    return newArray;
}
