class LinkedList<T> {
    elements: LinkedListElement<T>[];

    constructor(...elements: LinkedListElement<T>[]) {
        this.elements = elements;
    }

    get head() {
        return this.elements[0];
    }

    get tail() {
        const elements = this.elements;
        return elements[elements.length - 1];
    }

    public push(element: LinkedListElement<T>) {
        const elements = this.elements;

        elements.push(element);
        elements[elements.length - 2].next = element;
    }

    public pop() {
        const elements = this.elements;

        const secondLast = elements[elements.length - 2];
        secondLast.next = null;

        return elements.pop();
    }
}
