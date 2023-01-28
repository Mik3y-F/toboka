import type { RenderElementProps } from "slate-react";
import React from "react";

export function Element({ attributes, children }: RenderElementProps) {
  return (
    <p {...attributes} className="pb-2">
      {children}
    </p>
  );
}
