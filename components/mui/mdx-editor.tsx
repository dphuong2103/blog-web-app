"use client";
// You can use this code in a separate component that's imported in your pages.
import type {
  CodeBlockEditorDescriptor,
  SandpackConfig,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  MDXEditor,
  useCodeBlockEditorContext,
  codeBlockPlugin,
  linkPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertImage,
  CodeToggle,
  BlockTypeSelect,
  InsertTable,
  ListsToggle,
  CreateLink,
  InsertFrontmatter,
  InsertThematicBreak,
  diffSourcePlugin,
  linkDialogPlugin,
  frontmatterPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  codeMirrorPlugin,
  sandpackPlugin,
} from "@mdxeditor/editor";

const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext();
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea
          rows={3}
          cols={20}
          defaultValue={props.code}
          onChange={(e) => cb.setCode(e.target.value)}
        />
      </div>
    );
  },
};

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
    },
  ],
};

const Editor = () => (
  <MDXEditor
    className="min-h-96 w-full"
    markdown={""}
    plugins={[
      codeBlockPlugin({
        codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor],
      }),
      headingsPlugin(),
      listsPlugin(),
      linkPlugin(),
      quotePlugin(),
      markdownShortcutPlugin(),
      diffSourcePlugin(),
      linkDialogPlugin(),
      diffSourcePlugin(),
      frontmatterPlugin(),
      imagePlugin(),
      tablePlugin(),
      thematicBreakPlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
      sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
      codeMirrorPlugin({
        codeBlockLanguages: { js: "JavaScript", css: "CSS" },
      }),
      toolbarPlugin({
        toolbarContents: () => (
          <>
            {" "}
            <UndoRedo />
            <BoldItalicUnderlineToggles />
            <InsertImage />
            <CodeToggle />
            <BlockTypeSelect />
            <CreateLink />
            <InsertFrontmatter />
            <InsertTable />
            <InsertThematicBreak />
            <ListsToggle />
            <UndoRedo />
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          </>
        ),
      }),
    ]}
  />
);

export default Editor;
