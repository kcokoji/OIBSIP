import { AlertCircleIcon } from "lucide-react";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <AlertCircleIcon className="text-destructive h-8 w-8" />
      </div>
    </CardWrapper>
  );
};
