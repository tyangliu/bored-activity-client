/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

interface PillProps {
  label: string;
  progress: number;
}

export default function Pill(props: PillProps) {
  const { label, progress = 0 } = props;

  return (
    <div css={css`
      border: 1px solid #fff;
      border-radius: 9999px;
      margin-right: 10px;
      width: 140px;
      position: relative;
      overflow: hidden;
    `}>
      <div css={css`
        background: #fff;
        height: 100%;
        width: ${progress * 100}%;
        opacity: 0.3;
        position: absolute;
        pointer-events: none;
      `}>
      </div>
      <div css={css`
        padding: 8px 16px;
      `}>
        {label}
      </div>
    </div>
  );
}