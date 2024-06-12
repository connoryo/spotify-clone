"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
    max?: number;
    onMouseDown?: () => void;
    onMouseUp?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
    value = 1,
    max = 1,
    onChange,
    onMouseDown,
    onMouseUp
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    const handlePointerDown = (event: React.PointerEvent) => {
        if (onMouseDown && event.button === 0) {
            onMouseDown();
        }
    };

    const handlePointerUp = (event: React.PointerEvent) => {
        if (onMouseUp && event.button === 0) {
            onMouseUp(value);
        }
    };

    return (
        <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={0.05}
            aria-label="Volume"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <div className="p-2 w-full group flex items-center">
                <RadixSlider.Track className="bg-neutral-600 relative group grow rounded-full h-[4px]">
                    <RadixSlider.Range className="absolute bg-white rounded-full h-full group-hover:bg-green-500 transition" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                    className="
                        block scale-0 w-3 h-3 bg-white rounded-full shadow
                        group-hover:scale-100 hover:!scale-125 cursor-pointer transition"
                />
            </div>
        </RadixSlider.Root>
    );
}
 
export default Slider;