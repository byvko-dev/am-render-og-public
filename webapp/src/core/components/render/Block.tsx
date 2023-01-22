import { CSSProperties } from "react";
import { Block } from "@/core/types/blocks";
import BlockIcon from "./BlockIcon";

export function Block({
  block,
  children,
}: {
  block: Block;
  children?: JSX.Element;
}) {
  const style: CSSProperties = {};
  style.display = "flex";
  // items-center
  style.alignItems = "center";
  // justify-center
  style.justifyContent = "center";

  if (block.style.justifyContent === "center") style.justifyContent = "center";
  if (block.style.justifyContent === "space-between") {
    style.justifyContent = "space-between";
  }

  if (block.style.alignItems === "horizontal") style.flexDirection = "row";
  if (block.style.alignItems === "vertical") style.flexDirection = "column";

  if (block.style.color) {
    style.color = `rgba(${block.style.color.R}, ${block.style.color.G}, ${
      block.style.color.B
    }, ${block.style.color.A / 255})`;
  }
  if (block.style.backgroundColor) {
    style.backgroundColor = `rgba(${block.style.backgroundColor.R}, ${
      block.style.backgroundColor.G
    }, ${block.style.backgroundColor.B}, ${
      block.style.backgroundColor.A / 255
    })`;
  }
  if (block.style.invisible) style.visibility = "hidden";

  if (block.style.backgroundImage) {
    style.backgroundImage = `url(data:image/png;base64,${block.style.backgroundImage})`;
    style.backgroundPosition = "center";
    style.backgroundRepeat = "no-repeat";
    style.backgroundSize = "  100% 100%";
  }

  style.gap = block.style.gap + "em";
  style.fontSize = block.style.fontSize + "px";
  style.borderRadius = block.style.borderRadius + "px";
  style.flexGrow = block.style.growX || block.style.growY ? 1 : 0;

  if (block.style.width) style.width = block.style.width + "px";
  if (block.style.minWidth) style.minWidth = block.style.minWidth + "px";
  if (block.style.maxWidth) style.maxWidth = block.style.maxWidth + "px";
  if (block.style.growX) style.width = "100%";

  style.paddingTop = block.style.paddingTop + "em";
  style.paddingLeft = block.style.paddingLeft + "em";
  style.paddingRight = block.style.paddingRight + "em";
  style.paddingBottom = block.style.paddingBottom + "em";

  return <BlockContent block={block} style={style} children={children} />;
}

export default function BlockContent({
  block,
  children,
  style,
}: {
  block: Block;
  style: CSSProperties;
  children?: JSX.Element;
}) {
  if (children) {
    return <div style={style}>{children}</div>;
  }

  if (block.contentType === "blocks") {
    const content = block.content as Block[];
    return (
      <div style={style}>
        {content.map((block: Block, i) => (
          <Block block={block} />
        ))}
      </div>
    );
  }

  if (block.contentType === "text") {
    return <div style={style}>{block.content as string}</div>;
  }

  if (block.contentType === "icon") {
    const icon = block.content as Block;
    const color = `rgba(${icon.style.color.R}, ${icon.style.color.G}, ${
      icon.style.color.B
    }, ${icon.style.color.A / 255})`;
    return (
      <div style={style}>
        <BlockIcon
          name={icon.content as string}
          props={{ color, size: icon.style.fontSize }}
        />
      </div>
    );
  }

  return <div style={style}>{block.content as string}</div>;
}
