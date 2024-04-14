"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/card/card-header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  footerConent?: React.ReactNode;
}

export const CardWrapper = (props: Readonly<CardWrapperProps>) => {
  return (
    <Card className="relative min-h-[550px] min-w-[300px] border-none shadow-2xl sm:h-[650px] sm:w-[450px] sm:px-4">
      <CardHeader>
        <Header label={props.headerLabel} />
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.footerConent ? (
        <CardFooter className="absolute bottom-0 left-0 w-full px-12">
          {props.footerConent}
        </CardFooter>
      ) : null}
    </Card>
  );
};
