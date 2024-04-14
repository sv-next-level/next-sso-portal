"use client";

import { Button } from "@/components/ui/button";

export const BtnNavigation = (props: any) => {
  return (
    <Button
      size="sm"
      variant="link"
      className="p-0 font-normal"
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};
