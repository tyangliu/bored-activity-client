/** @jsxImportSource @emotion/react */

interface IconProps {
    className?: string;
    code: string;
}


export default function Icon(props: IconProps) {
  const { className, code } = props;
  return (
    <span className={`material-symbols-rounded ${className}`}>
      {code}
    </span>
  );
}
