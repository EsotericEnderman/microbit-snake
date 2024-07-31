function cloneArray<T extends Cloneable<T>>(array: T[]) {
    const newArray: T[] = [];

    for (const element of array) {
        newArray.push(element.clone());
    }

    return newArray;
}
