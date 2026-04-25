"use client"

import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "white" | "blue" | "black"
  size?: "sm" | "md" | "lg"
  className?: string
  withLink?: boolean
}

export default function Logo({
  variant = "blue",
  size = "md",
  className = "",
  withLink = true,
}: LogoProps) {
  // We use the existing MQM LOGO as a fallback. 
  // TODO: Replace with actual variant files once provided by user.
  const logoSrc = "/MQM LOGO.png"

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  }

  // A trick to colorize the logo until actual variants are provided
  // Note: this only works well on transparent PNGs of a single color
  const filterClass = 
    variant === "white" ? "brightness-0 invert" :
    variant === "black" ? "brightness-0" :
    "" // For blue, we'll just use the default image for now

  const content = (
    <div className={`relative ${sizeClasses[size]} w-auto ${className}`}>
      <Image
        src={logoSrc}
        alt="Maqam Al-Emaar"
        fill
        className={`object-contain object-left ${filterClass}`}
        sizes="(max-width: 768px) 150px, 200px"
        priority
      />
    </div>
  )

  if (withLink) {
    return (
      <Link href="/" className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}
