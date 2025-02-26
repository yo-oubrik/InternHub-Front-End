"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

export const ImageGallery = ({
  images,
  title = "Images",
}: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-gray-500 flex items-center gap-2">
        <ImageIcon className="h-4 w-4" />
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer aspect-square rounded-md overflow-hidden border border-gray-200"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover hover:opacity-80 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Image Preview Dialog */}
      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="sm:max-w-3xl">
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImage}
                alt="Image preview"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
