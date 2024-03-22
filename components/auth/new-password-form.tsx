"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";
import Loader from "../ui/loader";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  if (!token) {
    router.push("/login");
  }

  const [error, setError] = useState<string | undefined>("");

  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          toast.success("Reset Sucessfull");
        })
        .catch(() => {
          setError("An unexpected error occurred during submission.");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        ) : (
                          <EyeOffIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confrim password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*******"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        ) : (
                          <EyeOffIcon
                            className="text-muted-foreground"
                            size={20}
                          />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <Loader color="white" size={24} />
            ) : (
              <span> Reset Password</span>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
