"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { initialCode } from "@/config/ide-default";
import Editor, { Monaco, } from '@monaco-editor/react';
import { editor } from "monaco-editor";
import useDebouncedState from "@/components/hook/debounceState";

export default function Page() {

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [htmlValue, setHtmlValue] = useDebouncedState<string>(initialCode, 500);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     let iframe = iframeRef.current;

  //     const doc = iframe.contentDocument;
  //     doc?.open();
  //     doc?.write(htmlValue);
  //     doc?.close();
  //   }
  // }, [htmlValue])

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    // Use .current as a reference to the underlying object
    if (editorRef.current) {
      editorRef.current = editor;
    }
  }

  function handleEditorChange(value: string | undefined, ev: editor.IModelContentChangedEvent) {
    console.log('here is the current model value:', value);
    if (value) {
      setHtmlValue(value);
    }
  }

  return (
    <main>
      <div className="grid grid-cols-2 w-screen h-screen">
        <Editor
          className="resizeable"
          height="100vh"
          defaultLanguage="html"
          defaultValue={initialCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
        <ScrollArea className="h-screen bg-green-50 resizeable">
          <iframe ref={iframeRef} src="https://example.com" style={{ border: "none", width: "100%", height: "100vh" }}>

          </iframe>
        </ScrollArea>
      </div>
    </main>
  )
}