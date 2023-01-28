import type { CursorState } from "@slate-yjs/core";
import { withYHistory, withYjs, YjsEditor, withCursors } from "@slate-yjs/core";
import React, { useEffect, useMemo } from "react";
import type { Descendant, Text } from "slate";
import { createEditor } from "slate";
import type { RenderLeafProps } from "slate-react";
import { Slate, withReact } from "slate-react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { withNormalize } from "../../plugins/withNormalize";
import type { CursorData } from "../../types/types";
import {
  getRemoteCaretsOnLeaf,
  getRemoteCursorsOnLeaf,
  useDecorateRemoteCursors,
} from "@slate-yjs/react";
import { addAlpha, randomCursorData } from "../../utils";
import { Leaf } from "../Leaf/Leaf";
import { TobokaEditable } from "../TobokaEditable/TobokaEditable";
import clsx from "clsx";

function renderDecoratedLeaf(props: RenderLeafProps) {
  getRemoteCursorsOnLeaf<CursorData, Text>(props.leaf).forEach(
    (cursor: CursorState<CursorData>) => {
      if (cursor.data) {
        props.children = (
          <span style={{ backgroundColor: addAlpha(cursor.data.color, 0.5) }}>
            {props.children}
          </span>
        );
      }
    }
  );

  getRemoteCaretsOnLeaf<CursorData, Text>(props.leaf).forEach(
    (caret: CursorState<CursorData>) => {
      if (caret.data) {
        props.children = (
          <span className="relative">
            <span
              contentEditable={false}
              className="absolute top-0 bottom-0 left-[-1px] w-0.5"
              style={{ backgroundColor: caret.data.color }}
            />
            <span
              contentEditable={false}
              className="absolute left-[-1px] top-0 select-none whitespace-nowrap rounded rounded-bl-none px-1.5 py-0.5 text-xs text-white"
              style={{
                backgroundColor: caret.data.color,
                transform: "translateY(-100%)",
              }}
            >
              {caret.data.name}
            </span>
            {props.children}
          </span>
        );
      }
    }
  );

  return <Leaf {...props} />;
}

function DecoratedTobokaEditable(props: { className: string }) {
  const { className } = props;

  const decorate = useDecorateRemoteCursors();
  return (
    <TobokaEditable
      className={clsx("overflow-scroll break-words", className)}
      decorate={decorate}
      renderLeaf={renderDecoratedLeaf}
    />
  );
}

type TobokaEditorProps = {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;
};

export default function TobokaEditor(props: TobokaEditorProps) {
  const { value, setValue } = props;

  const hostname = window.location.host
    .split(":")[0]
    ?.replace(/^https?:\/\//, "");

  const yDoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(() => {
    return new WebsocketProvider(
      `ws://${hostname || "localhost"}:1234`,
      "",
      yDoc
    );
  }, [hostname, yDoc]);

  const editor = useMemo(() => {
    const sharedType = provider.doc.get("content", Y.XmlText) as Y.XmlText;

    return withNormalize(
      withReact(
        withCursors(
          withYHistory(
            withYjs(createEditor(), sharedType, { autoConnect: false })
          ),
          provider.awareness,
          {
            data: randomCursorData(),
          }
        )
      )
    );
  }, [provider.awareness, provider.doc]);

  useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <div className="h-screen bg-slate-300 p-20">
      <Slate value={value} onChange={setValue} editor={editor}>
        <DecoratedTobokaEditable className="h-full w-full rounded-lg bg-white p-10 placeholder:absolute" />
      </Slate>
    </div>
  );
}
