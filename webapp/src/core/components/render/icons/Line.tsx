import IconProps from "../../../types/IconProps.d.ts";

function Line({ size, classes, color }: IconProps) {
  return (
    <svg
      style={{
        width: size + "px",
        height: size + "px",
      }}
      fill={color}
      className={classes?.join(" ")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="6 19 12 2"
    >
      <path d="M17 19H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2z"></path>
    </svg>
  );
}

export default Line;
