"use client";

import { Button } from "@/components/ui/button";

interface BtnNavigationProps {
  flow: string;
  label: string;
  setProcess: React.Dispatch<React.SetStateAction<string>>;
}

export const BtnNavigation = (props: Readonly<BtnNavigationProps>) => {
  return (
    <Button
      size="sm"
      variant="link"
      className="p-0 font-normal"
      onClick={() =>
        props.setProcess((prev: any) => ({
          ...prev,
          flow: props.flow,
        }))
      }
    >
      {props.label}
    </Button>
  );
};
