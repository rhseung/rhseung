export function Figure({ caption, children }: Figure.Props) {
  return (
    <figure className="my-6 flex flex-col gap-2 [&>*]:my-0">
      {children}
      <figcaption className="text-muted-foreground text-sm">{caption}</figcaption>
    </figure>
  );
}

export declare namespace Figure {
  export type Props = {
    caption: string;
    children: React.ReactNode;
  };
}
