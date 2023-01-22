import IconProps from "../../../types/IconProps.d.ts";
import SingleArrowUp from "./SingleArrowUp.tsx";

function SingleArrowDown(props: IconProps) {
  return (
    <SingleArrowUp
      {...props}
      classes={[...(props.classes || []), "-rotate-180"]}
    />
  );
}

export default SingleArrowDown;
