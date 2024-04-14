"use client";

import { Button } from "@/components/ui/button";

export const BtnProceed = (props: any) => {
  return (
    <Button type="submit" disabled={props.disabled} className="w-full">
      Proceed
    </Button>
  );
};
