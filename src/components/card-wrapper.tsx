"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/card-header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  footerConent?: React.ReactNode;
}

export const CardWrapper = ({
  children,
  headerLabel,
  footerConent,
}: CardWrapperProps) => {
  return (
    <Card className="relative min-h-[650px] min-w-[450px] px-5 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerConent ? (
        <CardFooter className="absolute bottom-0 left-0 w-full px-12">
          {footerConent}
        </CardFooter>
      ) : null}
    </Card>
  );
};
