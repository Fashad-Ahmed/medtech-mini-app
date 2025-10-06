import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Component for handling image file uploads through drag-and-drop or file selection.
 * Supports image preview and file removal functionality.
 */
interface ImageUploadProps {
  /** Callback function triggered when an image file is selected */
  onImageSelect: (file: File) => void;
  /** Data URL of the selected image for preview, null if no image selected */
  selectedImage: string | null;
  /** Callback function to clear the selected image */
  onClear: () => void;
}

export const ImageUpload = ({
  onImageSelect,
  selectedImage,
  onClear,
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Handles drag events for the upload zone.
   * Updates UI state to show active dragging feedback.
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  /**
   * Processes dropped files, filtering for image files only.
   * Triggers the onImageSelect callback with the first valid image file.
   */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onImageSelect(imageFile);
      }
    },
    [onImageSelect]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      {!selectedImage ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center transition-all
            ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50"
            }
          `}
        >
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-1">
                Upload Medical Image
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports JPG, PNG formats
              </p>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Uploaded medical scan"
            className="w-full rounded-lg border border-border"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onClear}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
