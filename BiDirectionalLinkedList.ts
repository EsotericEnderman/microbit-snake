class BiDirectionalLinkedList<T> {
    public elements: BiDirectionalLinkedListElement<T>[];

    constructor(elements: BiDirectionalLinkedListElement<T>[]) {
        this.elements = elements;
    }

    get head() {
        return this.elements[0];
    }

    get tail() {
        const elements = this.elements;
        return elements[elements.length - 1];
    }

    get length() {
        return this.elements.length;
    }

    public push(element: T) {
        const elements = this.elements;
        const lastElement = elements[elements.length - 1];

        const elementToAppend: BiDirectionalLinkedListElement<T> = { value: element, next: null, previous: lastElement };

        elements.push(elementToAppend);
        lastElement.next = elementToAppend;
    }

    public shift() {
        this.elements.shift();
    }

    public unshift(value: T) {
        const element: BiDirectionalLinkedListElement<T> = {
            value,
            next: this.head,
            previous: null
        }

        this.elements.unshift(element);
    }

    public pop() {
        const elements = this.elements;

        const secondLast = elements[elements.length - 2];
        secondLast.next = null;

        return elements.pop();
    }
}
