import IconProps from "../../../types/IconProps.d.ts";

function Circle({ classes, color, size }: IconProps) {
  return (
    <svg
      style={{
        width: size + "px",
        height: size + "px",
      }}
      fill={color}
      className={classes?.join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}

export default Circle;
