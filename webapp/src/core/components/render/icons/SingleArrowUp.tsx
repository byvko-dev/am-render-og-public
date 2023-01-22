import IconProps from "../../../types/IconProps.d.ts";

function SingleArrowUp({ classes, color, size }: IconProps) {
  return (
    <svg
      style={{
        width: size + "px",
        height: size + "px",
      }}
      fill={color}
      className={classes?.join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 298.04"
    >
      <g>
        <path
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="nonzero"
          d="M70.94 285.81c-16.17 16.24-42.46 16.32-58.71.15-16.24-16.16-16.32-42.46-.15-58.7L226.57 12.23c16.16-16.24 42.46-16.32 58.7-.15l214.65 215.18c16.17 16.24 16.09 42.54-.15 58.7-16.25 16.17-42.54 16.09-58.71-.15L256 100.29 70.94 285.81z"
        />
      </g>
    </svg>
  );
}

export default SingleArrowUp;
