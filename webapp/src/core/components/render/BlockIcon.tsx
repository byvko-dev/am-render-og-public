import IconProps from "@/core/types/IconProps";
import Circle from "./icons/Circle";
import DoubleArrowDown from "./icons/DoubleArrowDown";
import DoubleArrowUp from "./icons/DoubleArrowUp";
import Line from "./icons/Line";
import SingleArrowDown from "./icons/SingleArrowDown";
import SingleArrowUp from "./icons/SingleArrowUp";
import ThickArrowDown from "./icons/ThickArrowDown";
import ThickArrowUp from "./icons/ThickArrowUp";

export default function BlockIcon({
  name,
  props,
}: {
  name: string;
  props: IconProps;
}) {
  switch (name) {
    case "singleArrowUp":
      return <SingleArrowUp {...props} />;
    case "singleArrowDown":
      return <SingleArrowDown {...props} />;

    case "doubleArrowUp":
      return <DoubleArrowUp {...props} />;
    case "doubleArrowDown":
      return <DoubleArrowDown {...props} />;

    case "thickArrowUp":
      return <ThickArrowUp {...props} />;
    case "thickArrowDown":
      return <ThickArrowDown {...props} />;

    case "lineHorizontal":
      return <Line {...props} />;

    case "":
      return null;

    default:
      return <Circle {...props} />;
  }
}
