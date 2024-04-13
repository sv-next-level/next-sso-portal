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
    <Card className="relative min-h-[550px] min-w-[300px] border-none shadow-2xl sm:h-[650px] sm:w-[450px] sm:px-4">
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
