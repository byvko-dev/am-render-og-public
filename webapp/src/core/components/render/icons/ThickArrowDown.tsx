import IconProps from "../../../types/IconProps.d.ts";
import ThickArrowUp from "./ThickArrowUp.tsx";

function ThickArrowDown(props: IconProps) {
  return (
    <ThickArrowUp
      {...props}
      classes={[...(props.classes || []), "-rotate-180"]}
    />
  );
}

export default ThickArrowDown;
