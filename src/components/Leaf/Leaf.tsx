import React from "react";
import type { RenderLeafProps } from "slate-react";

export function Leaf({ attributes, children }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>;
}
