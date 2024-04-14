"use client";

interface ContentFooterProps {
  children: React.ReactNode;
}

export const ContentFooter = (props: Readonly<ContentFooterProps>) => {
  return <div className="mt-1 flex justify-between">{props.children}</div>;
};
