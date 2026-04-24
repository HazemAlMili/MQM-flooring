"use client"

import { PortableText, PortableTextComponents } from "@portabletext/react"
import { PortableTextBlock } from "@portabletext/types"

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-foreground/80 mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl text-foreground mt-10 mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-foreground mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 italic text-foreground/70 my-8 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
