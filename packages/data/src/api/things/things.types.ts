export interface Things {
  edges: Edges[];
}

export interface Edges {
  node: Node;
}

export interface Node {
  id: number;
}

export interface ThingsResults {
  things: Things;
}