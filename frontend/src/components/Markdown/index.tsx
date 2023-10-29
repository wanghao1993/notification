import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { useEffect, useRef, useState } from 'react';

interface MarkdownProps {
  handleEditorChange: ({ html, text }: { html: string; text: string }) => void;
  style?: {
    height: '500px';
  };
  defaultValue: string;
}
const Markdown = (props: MarkdownProps) => {
  const { handleEditorChange, style } = props;
  const md = new MarkdownIt();
  const [value, setValue] = useState<string>();
  const changeFn = ({ html, text }) => {
    handleEditorChange({ html, text });
    setValue(text);
  };

  const MdRef = useRef<MdEditor>();

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <MdEditor
      ref={MdRef}
      value={value}
      style={style}
      onChange={({ html, text }) => changeFn({ html, text })}
      renderHTML={(text) => md.render(text)}
    ></MdEditor>
  );
};

export default Markdown;
