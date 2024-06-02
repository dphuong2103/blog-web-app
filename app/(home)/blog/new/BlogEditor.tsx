import type { CodeBlockEditorDescriptor, SandpackConfig } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import React, { useCallback } from 'react';
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
} from '@mdxeditor/editor'
import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import "./style.css";
const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  match: () => true,
  priority: 0,
  Editor: (props) => {
    const cb = useCodeBlockEditorContext()
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
      </div>
    )
  }
}

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
    },
  ]
}

interface BlogEditorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string,
  placeholder?: string,
}


function BlogEditor<TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ control, name }: BlogEditorProps<TFieldValues, TName>) {
  const onImageUpload = useCallback(
    async (image: File) => {
      return "https://picsum.photos/200/300"
    }, [])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MDXEditor
              className="w-full mt-2 min-h-96 border"
              contentEditableClassName="list-special-abc"
              onChange={field.onChange}
              markdown={field.value}
              plugins={
                [
                  codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
                  headingsPlugin(),
                  listsPlugin(),
                  linkPlugin(),
                  quotePlugin(),
                  markdownShortcutPlugin(),
                  diffSourcePlugin(),
                  linkDialogPlugin(),
                  diffSourcePlugin(),
                  frontmatterPlugin(),
                  imagePlugin({
                    imageUploadHandler: onImageUpload,
                  }),
                  tablePlugin(),
                  thematicBreakPlugin(),
                  codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                  sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', } }),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        {' '}
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
                            { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                            {
                              fallback: () => (<>
                                <InsertCodeBlock />
                              </>)
                            }
                          ]}
                        />
                      </>
                    )
                  }),
                ]} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}


export default BlogEditor


