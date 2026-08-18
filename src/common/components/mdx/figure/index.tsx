/** 이미지·코드·표를 캡션과 묶는다. */
export function Figure({ caption, children }: Figure.Props) {
  return (
    <figure className="my-6 flex flex-col gap-2 [&>*]:my-0">
      {children}
      <figcaption className="text-muted-foreground text-center text-xs">{caption}</figcaption>
    </figure>
  );
}

export declare namespace Figure {
  export type Props = {
    caption: string;
    children: React.ReactNode;
  };
}
