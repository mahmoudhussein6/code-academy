import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy, AlertCircle, Info, Sparkles } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = () => {
    const text = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="bg-slate-800/90 text-indigo-300 font-mono text-sm px-1.5 py-0.5 rounded border border-slate-700/60" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#0b0f19] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono select-none">
        <span className="uppercase font-semibold text-indigo-400">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          title="نسخ الكود"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-sans">تم النسخ</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-sans">نسخ</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-sm leading-relaxed" dir="ltr">
        <pre className="!bg-transparent !p-0 !m-0 font-mono">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="article-content text-slate-200 leading-loose text-base font-normal space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: CodeBlock,

          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-indigo-300 mt-6 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed text-[16px] my-3">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-slate-300 my-4 pr-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-slate-300 my-4 pr-2">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-relaxed">
              <span className="text-slate-300">{children}</span>
            </li>
          ),

          blockquote: ({ children }) => {
            return (
              <div className="my-6 p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/20 text-slate-200 relative">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                  <div className="text-sm leading-relaxed">{children}</div>
                </div>
              </div>
            );
          },

          hr: () => <hr className="my-8 border-slate-800" />,

          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-slate-800">
              <table className="w-full text-right border-collapse text-sm">{children}</table>
            </div>
          ),

          th: ({ children }) => (
            <th className="bg-slate-900 text-white font-semibold p-3 border-b border-slate-800">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="p-3 border-b border-slate-800/60 text-slate-300 bg-slate-950/40">
              {children}
            </td>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

