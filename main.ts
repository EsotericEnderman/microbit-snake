type LinkedListElement<T> = {
  value: T;
  next: LinkedListElement<T> | null;
}

type LinkedList<T> = {
    head: LinkedListElement<T>
}
