export interface Attributes {
  edges: Edges[];
}

export interface Edges {
  node: Node;
}

export interface Node {
  id: number;
}

export interface AttributesResults {
  attributes: Attributes;
}