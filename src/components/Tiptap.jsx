// src/Tiptap.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
// import { OrderedList } from '@tiptap/extension-ordered-list';
// import { BulletList } from '@tiptap/extension-bullet-list';
// import { Paragraph } from '@tiptap/extension-paragraph';

import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiCodeFill,
  RiCodeBoxLine,
  RiDoubleQuotesL,
  RiArrowGoBackFill,
  RiArrowGoForwardFill,
} from 'react-icons/ri';
import StarterKit from '@tiptap/starter-kit';

import { lowlight } from 'lowlight';
import CodeBlockComponent from './CodeBlockComponent';
import React from 'react';

function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          {/* bold */}
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          {/* italic */}
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          {/* Underline */}
          <RiUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          {/* strike */}
          <RiStrikethrough />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          {/* h2 */}
          <RiH2 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          {/* h3 */}
          <RiH3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          {/* bullet list */}
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          {/* ordered list */}
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          {/* code */}
          <RiCodeFill />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          {/* code block */}
          <RiCodeBoxLine />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          {/* blockquote */}
          <RiDoubleQuotesL />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          {/* undo */}
          <RiArrowGoBackFill />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          {/* redo */}
          <RiArrowGoForwardFill />
        </button>
      </div>
    </div>
  );
}

// export default function Tiptap({ setPreview, setEditable }) {
export default function Tiptap({ setPreview }) {
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      // BulletList.configure({
      //   keepMarks: true,
      //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      // }),
      // OrderedList.configure({
      //   keepMarks: true,
      //   keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      // }),
      // Document,
      // Paragraph,
      // Text,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Underline,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    content: `
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
    </p>
    <p>
     Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
    </p>
    <p>
    That’s a boring paragraph followed by a fenced code block:
    </p>
    <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
    {
    if (i % 15 == 0)
    console.log("FizzBuzz");
    else if (i % 3 == 0)
    console.log("Fizz");
    else if (i % 5 == 0)
    console.log("Buzz");
    else
    console.log(i);
    }</code></pre>
    <p>
      Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
    </p>
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      //console.log(html);
      setPreview(html);
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }
  return (
    <div>
      <div className="textEditor">
        <MenuBar editor={editor} />
      </div>
      <div className="textEditor">
        <div className="checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            id="editable"
            value={editable}
            onChange={(event) => setEditable(event.target.checked)}
          />
          <label htmlFor="editable">Editable</label>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

//fix missing props validation by proptype generator extension
MenuBar.propTypes = {
  editor: PropTypes.shape({
    can: PropTypes.func,
    chain: PropTypes.func,
    isActive: PropTypes.func,
  }),
};

//fix missing props validation by proptype generator extension
Tiptap.propTypes = {
  setPreview: PropTypes.func,
  setEditable: PropTypes.func,
};
