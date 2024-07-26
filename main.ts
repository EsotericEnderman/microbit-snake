type LinkedListElement<T> = {
  value: T;
  next: LinkedListElement<T> | null;
}

type LinkedList<T> = {
    head: LinkedListElement<T>;
}

type Vector = {
    x: number;
    y: number;
}

type SnakePart = Vector;

class Snake {
    parts: LinkedList<SnakePart>;
}

const snake = new Snake();
