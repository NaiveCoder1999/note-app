// src/Tiptap.jsx
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

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

export default function Tiptap({ initialValue, getPreview, getJSON }) {
  const [editable, setEditable] = useState(false);
  const prevValue = useRef(initialValue);

  //console.log('init value:' + initValue.current);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Underline,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = JSON.stringify(editor.getJSON()); //JSON object to string
      getPreview(html);
      getJSON(text);
      prevValue.current = html;
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }
    // Update editor content when initialValueof note changes
    let prevDesc = editor.getHTML();
    editor.setEditable(editable);
    if (prevDesc !== initialValue && prevDesc !== '<p></p>') {
      editor.commands.setContent(prevDesc);
      prevValue.current = prevDesc;
    } else {
      editor.commands.setContent(initialValue);
      // let obj =
      //   '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Test Example"}]}]}';
      // editor.commands.setContent(JSON.parse(obj));
    }
  }, [editor, editable, initialValue]);

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
            onChange={(event) => {
              setEditable(event.target.checked);
            }}
          />
          <label htmlFor="editable">Editable</label>
        </div>
        <EditorContent editor={editor} />
      </div>
      <p>use ref value:{prevValue.current} </p>
      <p>initial Value:{initialValue} </p>
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
  initialValue: PropTypes.string,
  getPreview: PropTypes.func,
  setEditable: PropTypes.func,
  getJSON: PropTypes.func,
};
