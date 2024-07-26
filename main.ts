type LinkedListElement<T> = {
  value: T;
  next: LinkedListElement<T> | null;
}

type LinkedList<T> = {
    head: LinkedListElement<T>;
}

type SnakePart = {
    x: number;
    y: number;
}

class Snake {
    parts: LinkedList<SnakePart>;
}
