"use client";

import { Button } from "@/components/ui/button";

interface BtnProceedProps {
  disabled: boolean;
}

export const BtnProceed = (props: Readonly<BtnProceedProps>) => {
  return (
    <Button type="submit" disabled={props.disabled} className="w-full">
      Proceed
    </Button>
  );
};
