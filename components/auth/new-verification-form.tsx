"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

import { FormError } from "../form-error";
import Loader from "../ui/loader";
import { toast } from "sonner";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      router.push("/login");
    }
    newVerification(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        toast.success("Email Verified");
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center ">
        {!error && <Loader size={30} color="#ea701f" />}

        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
