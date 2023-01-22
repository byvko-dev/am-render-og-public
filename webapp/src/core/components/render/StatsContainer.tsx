import { Block as BlockType } from "@/core/types/blocks";
import { Block } from "./Block";

export default function StatsContainer({ cards }: { cards: BlockType }) {
  return (
    <div id="tender-render" style={{ display: "flex" }}>
      <Block block={cards} />
    </div>
  );
}
