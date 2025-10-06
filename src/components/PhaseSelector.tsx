import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Component for selecting the image processing phase (arterial or venous).
 * Provides radio button selection with descriptive labels and visual feedback.
 */
interface PhaseSelectorProps {
  /** Currently selected phase, can be 'arterial', 'venous', or null if none selected */
  selectedPhase: "arterial" | "venous" | null;
  /** Callback function triggered when a new phase is selected */
  onPhaseChange: (phase: "arterial" | "venous") => void;
  /** Flag to disable the selector, typically used when no image is uploaded */
  disabled?: boolean;
}

export const PhaseSelector = ({ 
  selectedPhase, 
  onPhaseChange, 
  disabled 
}: PhaseSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Select Processing Phase</Label>
      <RadioGroup
        value={selectedPhase || ""}
        onValueChange={(value) => onPhaseChange(value as "arterial" | "venous")}
        disabled={disabled}
        className="space-y-3"
      >
        <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors">
          <RadioGroupItem value="arterial" id="arterial" className="mt-1" />
          <div className="space-y-1 flex-1">
            <Label htmlFor="arterial" className="text-base font-medium cursor-pointer">
              Arterial Phase
            </Label>
            <p className="text-sm text-muted-foreground">
              Enhanced contrast for arterial structures
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-accent/5 transition-colors">
          <RadioGroupItem value="venous" id="venous" className="mt-1" />
          <div className="space-y-1 flex-1">
            <Label htmlFor="venous" className="text-base font-medium cursor-pointer">
              Venous Phase
            </Label>
            <p className="text-sm text-muted-foreground">
              Gaussian smoothing for venous visualization
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
