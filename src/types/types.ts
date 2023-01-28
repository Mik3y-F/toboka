import type { CursorEditor, YHistoryEditor, YjsEditor } from "@slate-yjs/core";
import type { Descendant } from "slate";
import type { ReactEditor } from "slate-react";

export type CursorData = {
  name: string;
  color: string;
};

export type CustomText = {
  text: string;
};

export type Paragraph = {
  type: "paragraph";
  children: Descendant[];
};

export type CustomElement = Paragraph;

export type CustomEditor = ReactEditor &
  YjsEditor &
  YHistoryEditor &
  CursorEditor<CursorData>;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
