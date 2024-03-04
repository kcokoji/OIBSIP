"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonTitle?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  backButtonTitle,
}: CardWrapperProps) => {
  return (
    <Card className=" w-[400px]  rounded-md border-black">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="border-none justify-center">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          title={backButtonTitle}
        />
      </CardFooter>
    </Card>
  );
};
