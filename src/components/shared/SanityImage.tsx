import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { SanityImage as SanityImageType } from "@/types/sanity"

interface SanityImageProps {
  image: SanityImageType
  alt?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function SanityImage({
  image,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: SanityImageProps) {
  if (!image?.asset) return null

  // Fallback to image.alt from Sanity if component alt prop isn't provided
  const finalAlt = alt || image.alt || "Image"
  
  // Use LRQIP for blur-up placeholder
  const blurDataURL = image.asset.metadata?.lqip

  // Use original dimensions if not overridden and not fill
  const w = width || (fill ? undefined : image.asset.metadata?.dimensions?.width)
  const h = height || (fill ? undefined : image.asset.metadata?.dimensions?.height)

  return (
    <Image
      src={urlFor(image).url()}
      alt={finalAlt}
      fill={fill}
      width={w}
      height={h}
      className={className}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      priority={priority}
      sizes={sizes}
    />
  )
}
