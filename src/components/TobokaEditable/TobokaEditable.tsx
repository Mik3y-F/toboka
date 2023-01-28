import type { ComponentProps } from "react";
import React from "react";
import { Editable, useSlate } from "slate-react";
import { Element } from "../Element/Element";
import { Leaf } from "../Leaf/Leaf";
import { Spinner } from "../Spinner/Spinner";

type TobokaEditableProps = Omit<
  ComponentProps<typeof Editable>,
  "renderElement" | "renderLeaf"
> &
  Partial<
    Pick<ComponentProps<typeof Editable>, "renderElement" | "renderLeaf">
  >;

export function TobokaEditable({
  renderElement = Element,
  renderLeaf = Leaf,
  ...props
}: TobokaEditableProps) {
  const editor = useSlate();

  if (editor.sharedRoot.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center rounded-lg bg-white p-5 text-sm font-semibold">
          <Spinner className="text-lg text-gray-600" />
          <div className="my-3 text-gray-600">Preparing Editor...</div>
        </div>
      </div>
    );
  }

  return (
    <Editable
      placeholder="Write Something ..."
      {...props}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
    />
  );
}
