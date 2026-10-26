import Image from "next/image";
import type { EditorialVisual } from "@/lib/visuals";

type EditorialImageProps = {
  visual: EditorialVisual;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function EditorialImage({
  visual,
  priority = false,
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
  className = "editorial-image",
}: EditorialImageProps) {
  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
