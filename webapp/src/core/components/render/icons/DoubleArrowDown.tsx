import IconProps from "../../../types/IconProps.d.ts";
import DoubleArrowUp from "./DoubleArrowUp.tsx";

function DoubleArrowDown(props: IconProps) {
  return (
    <DoubleArrowUp
      {...props}
      classes={[...(props.classes || []), "-rotate-180"]}
    />
  );
}

export default DoubleArrowDown;
