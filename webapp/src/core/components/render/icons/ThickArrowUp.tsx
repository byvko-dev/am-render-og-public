import IconProps from "../../../types/IconProps.d.ts";

function ThickArrowUp({ classes, color, size }: IconProps) {
  return (
    <svg
      style={{
        width: size + "px",
        height: size + "px",
      }}
      fill={color}
      className={classes?.join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.01 336.37"
    >
      <g>
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="nonzero"
          d="M469.51 336.37H42.47c-9.9-.03-19.84-3.47-27.89-10.47-17.68-15.4-19.55-42.24-4.15-59.92L229.45 14.56c1.51-1.7 3.17-3.33 4.98-4.82 18.06-14.93 44.83-12.41 59.76 5.65l206.65 249.76a42.308 42.308 0 0 1 11.17 28.71c0 23.47-19.03 42.51-42.5 42.51z"
        />
      </g>
    </svg>
  );
}

export default ThickArrowUp;
