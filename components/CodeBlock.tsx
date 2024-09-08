import React from "react"
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"

const SyntaxHighlighter =
  Prism as typeof React.Component<SyntaxHighlighterProps>

export default function CodeHighlighter({
  language,
  code,
}: {
  language: string
  code: string
}) {
  return (
    <>
      <div className="mb-2 text-xs">{language}</div>
      <SyntaxHighlighter
        language={language}
        style={prism}
        wrapLongLines
        className="text-xs"
      >
        {code}
      </SyntaxHighlighter>
    </>
  )
}
