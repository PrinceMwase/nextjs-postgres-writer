export type LineProperty = {
  line: string;
  align: "left" | "right" | "center";
  color: string;
};
export type createType = {
    background: "light" | "dark";
    lines: LineProperty[];
    title: string;
  };
  
export type LineType = {
  text: string;
  index: number;
  confirm: boolean;
  theme: "light" | "dark";
  readonly: boolean;
};

export type payload = {
  id: number;
  background: "light" | "dark";
  lines: LineProperty[];
  title: string;
  date: Date;
  writer: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
  };
  comments?: commentType[] | undefined;
  liked?: boolean
};

export type commentType = {
  comment: string;
  poemId: number | undefined;
  writer: any | undefined;
  createdAt?: Date;
};
