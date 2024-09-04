import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

interface DrawMoodProps {
  width: number;
  height: number;
  brushColor: string;
  brushSize: number;
  isErasing: boolean;
  onDrawingChange: (drawing: string) => void;
}

const DrawMood = forwardRef<HTMLCanvasElement, DrawMoodProps>(
  (
    { width, height, brushColor, brushSize, isErasing, onDrawingChange },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<
      { x: number; y: number } | undefined
    >(undefined);

    useImperativeHandle(ref, () => canvasRef.current!);

    const startPaint = useCallback((event: MouseEvent) => {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        setMousePosition(coordinates);
        setIsPainting(true);
      }
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas?.addEventListener("mousedown", startPaint);
      return () => {
        canvas?.removeEventListener("mousedown", startPaint);
      };
    }, [startPaint]);

    const drawLine = useCallback(
      (
        originalMousePosition: { x: number; y: number },
        newMousePosition: { x: number; y: number }
      ) => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          if (context) {
            context.strokeStyle = isErasing ? "white" : brushColor;
            context.lineJoin = "round";
            context.lineWidth = brushSize;

            context.beginPath();
            context.moveTo(originalMousePosition.x, originalMousePosition.y);
            context.lineTo(newMousePosition.x, newMousePosition.y);
            context.closePath();
            context.stroke();

            onDrawingChange(canvas.toDataURL());
          }
        }
      },
      [brushColor, brushSize, isErasing, onDrawingChange]
    );

    const paint = useCallback(
      (event: MouseEvent) => {
        if (isPainting) {
          const newMousePosition = getCoordinates(event);
          if (mousePosition && newMousePosition) {
            drawLine(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
          }
        }
      },
      [isPainting, mousePosition, drawLine]
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas?.addEventListener("mousemove", paint);
      return () => {
        canvas?.removeEventListener("mousemove", paint);
      };
    }, [paint]);

    const exitPaint = useCallback(() => {
      setIsPainting(false);
      setMousePosition(undefined);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas?.addEventListener("mouseup", exitPaint);
      canvas?.addEventListener("mouseleave", exitPaint);
      return () => {
        canvas?.removeEventListener("mouseup", exitPaint);
        canvas?.removeEventListener("mouseleave", exitPaint);
      };
    }, [exitPaint]);

    const getCoordinates = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const clearCanvas = () => {
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
    };

    return (
      <div className="relative border-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="cursor-crosshair rounded-lg"
        />
        <button
          onClick={clearCanvas}
          type="button"
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        >
          Clear
        </button>
      </div>
    );
  }
);

export default DrawMood;
