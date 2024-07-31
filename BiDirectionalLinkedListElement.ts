type BiDirectionalLinkedListElement<T> = {
    value: T;
    next: BiDirectionalLinkedListElement<T> | null;
    previous: BiDirectionalLinkedListElement<T> | null;
}
