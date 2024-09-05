import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import DrawMood from "./DrawMood";
import { FaEraser, FaBrush } from "react-icons/fa";
import { useTranslation } from "../../redux/lang/selectors";

interface DrawingSandboxProps {
  drawing: string;
  onDrawingChange: (drawing: string) => void;
}

export interface DrawingSandboxRef {
  clearCanvas: () => void;
}

const DrawingSandbox = forwardRef<DrawingSandboxRef, DrawingSandboxProps>(
  ({ onDrawingChange }, ref) => {
    const { t } = useTranslation();
    const [brushColor, setBrushColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(5);
    const [isErasing, setIsErasing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        if (canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          if (context) {
            context.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            onDrawingChange("");
          }
        }
      },
    }));

    return (
      <div className="flex flex-col items-center space-y-4">
        <DrawMood
          ref={canvasRef}
          width={475}
          height={300}
          brushColor={brushColor}
          brushSize={brushSize}
          isErasing={isErasing}
          onDrawingChange={onDrawingChange}
        />

        <div className="flex justify-center items-center space-x-4 mt-4">
          <label className="flex items-center space-x-2">
            <FaBrush className="text-gray-500" />
            <span className="text-gray-700 font-medium">
              {t("brushColorLabel")}
            </span>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="h-8 w-8 p-0 border-none cursor-pointer"
            />
          </label>

          <label className="flex items-center space-x-2">
            <FaBrush className="text-gray-500" />
            <span className="text-gray-700 font-medium">
              {" "}
              {t("brushSizeLabel")}
            </span>
            <input
              type="number"
              value={brushSize}
              min="1"
              max="50"
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-9 p-1 border border-gray-300 rounded"
            />
          </label>

          <label className="flex items-center space-x-2">
            <FaEraser className="text-gray-500" />
            <span className="text-gray-700 font-medium">
              {" "}
              {t("eraseModeLabel")}
            </span>
            <input
              type="checkbox"
              checked={isErasing}
              onChange={(e) => setIsErasing(e.target.checked)}
              className="form-checkbox h-5 w-5 text-red-500 cursor-pointer"
            />
          </label>
        </div>
      </div>
    );
  }
);

export default DrawingSandbox;
