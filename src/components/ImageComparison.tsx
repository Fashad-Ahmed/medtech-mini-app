/**
 * Component for displaying side-by-side comparison of original and processed medical images.
 * Shows a loading state during processing and a placeholder when no processed image is available.
 */
interface ImageComparisonProps {
  /** Data URL of the original uploaded image */
  originalImage: string;
  /** Data URL of the processed image, null if not yet processed */
  processedImage: string | null;
  /** Flag indicating if image processing is in progress */
  isProcessing: boolean;
}

export const ImageComparison = ({ 
  originalImage, 
  processedImage, 
  isProcessing 
}: ImageComparisonProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Original Image</h3>
        <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
          <img
            src={originalImage}
            alt="Original medical scan"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Processed Image</h3>
        <div className="border border-border rounded-lg overflow-hidden bg-muted/30 min-h-[300px] flex items-center justify-center">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4 p-8">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Processing image...</p>
            </div>
          ) : processedImage ? (
            <img
              src={processedImage}
              alt="Processed medical scan"
              className="w-full h-auto"
            />
          ) : (
            <p className="text-muted-foreground">
              Select a phase and click Process to see results
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
