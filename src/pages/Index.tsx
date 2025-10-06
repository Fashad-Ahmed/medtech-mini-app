import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { PhaseSelector } from "@/components/PhaseSelector";
import { ImageComparison } from "@/components/ImageComparison";
import { toast } from "sonner";
import { Activity } from "lucide-react";
import { DEPLOYED_BACKEND_URL } from "@/constants";

/**
 * Main page component for the medical image processing application.
 * Provides a user interface for:
 * 1. Uploading medical images
 * 2. Selecting processing phase (arterial/venous)
 * 3. Processing images and viewing results
 * 
 * State Management:
 * - selectedFile: Stores the uploaded File object
 * - selectedImage: Stores the data URL of the uploaded image
 * - selectedPhase: Tracks the chosen processing phase
 * - processedImage: Stores the processed image URL
 * - isProcessing: Indicates processing status
 */
const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<"arterial" | "venous" | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handles image file selection.
   * Converts the selected file to a data URL and updates state.
   * @param file - The uploaded image File object
   */
  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setProcessedImage(null);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setProcessedImage(null);
    setSelectedPhase(null);
  };

  /**
   * Processes the uploaded image with the selected phase.
   * Makes an API call to the backend server and handles the response.
   * Updates the UI with the processed image or error message.
   */
  const handleProcess = async () => {
    if (!selectedFile || !selectedPhase) {
      toast.error("Please upload an image and select a phase");
      return;
    }

    setIsProcessing(true);
    setProcessedImage(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("phase", selectedPhase);

      const BACKEND_URL = DEPLOYED_BACKEND_URL || "http://localhost:5000";
      
      const response = await fetch(`${BACKEND_URL}/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Processing failed");
      }

      const blob = await response.blob();
      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
      toast.success("Image processed successfully!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please check if the backend server is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MedTech Surgical Planning</h1>
              <p className="text-sm text-muted-foreground">Image Processing Simulation Tool</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Upload and Controls Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Step 1: Upload Image</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a 2D medical image (JPG/PNG format)
                </p>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onClear={handleClearImage}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Step 2: Select Phase</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose the processing phase to simulate
                </p>
                <PhaseSelector
                  selectedPhase={selectedPhase}
                  onPhaseChange={setSelectedPhase}
                  disabled={!selectedImage}
                />
              </div>

              <Button
                onClick={handleProcess}
                disabled={!selectedImage || !selectedPhase || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Processing..." : "Process Image"}
              </Button>
            </div>
          </div>

          {/* Comparison Section */}
          {selectedImage && (
            <div className="pt-8 border-t border-border">
              <h2 className="text-xl font-semibold mb-6">Step 3: View Results</h2>
              <ImageComparison
                originalImage={selectedImage}
                processedImage={processedImage}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>MedTech Surgical Planning Simulation Tool - For demonstration purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
