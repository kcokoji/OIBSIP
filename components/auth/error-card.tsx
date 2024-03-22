"use client";
import { AlertCircleIcon } from "lucide-react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { FormError } from "../form-error";

export const ErrorCard = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <AlertCircleIcon className="text-destructive h-8 w-8" />
        {errorMessage && <FormError message={errorMessage} />}
      </div>
    </CardWrapper>
  );
};
