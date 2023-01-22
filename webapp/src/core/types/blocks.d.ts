export type ContentType = "text" | "icon" | "image" | "blocks" | "invalid";

export type Content = string | Block[] | Block;

export interface Block {
  contentType: ContentType;
  content: Content;
  style: BlockStyle;
}

export interface CardsData {
  cards: Block;
  totalCards: number;
}

export interface ColorRGBA {
  R: number;
  G: number;
  B: number;
  A: number;
}

export interface BlockStyle {
  color: ColorRGBA;
  backgroundColor: ColorRGBA;
  backgroundImage: string;
  backgroundImageBlur: number;
  invisible: boolean;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  justifyContent: "start" | "center" | "end" | "space-between";
  alignItems: "vertical" | "horizontal";
  gap: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  growX: boolean;
  growY: boolean;
  width: number;
  maxWidth: number;
  minWidth: number;
}
