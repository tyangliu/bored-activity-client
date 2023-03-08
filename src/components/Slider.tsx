/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react"

interface SliderProps {
  label: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Slider(props: SliderProps) {
  const { className, label, min = 0, max = 2, step = 1, value, onChange } = props;
  return (
    <div
      css={css`
        position: relative;
      `}
      className={className}
    >
      <Global styles={css`
        input[type=range] {
          -webkit-appearance: none;
          background: none;
          width: 140px;
        }

        input[type=range]::-webkit-slider-runnable-track {
          background: none;
          border: 1px solid #fff;
          height: 32px;
          border-radius: 9999px;
          width: 100%;
          overflow: hidden;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 5px;
          height: 32px;
          background: rgba(255,255,255,0.5);
          box-shadow: -80px 0 0 80px rgba(255,255,255,0.2);
        }
      `}/>
      <label
        css={css`
          left: 20px;
          top: 5px;
          position: absolute;
          pointer-events: none;
        `}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        name={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
