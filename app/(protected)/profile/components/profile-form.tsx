"use client";
import { useState, useTransition } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ChangePasswordSchema, SettingsSchema } from "@/schemas";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { UserRole } from "@prisma/client";
import { passwordSettings, settings } from "@/actions/settings";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import DeleteButton from "./delete-account-form";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
  const user = useCurrentUser();
  const router = useRouter();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
    },
    mode: "onChange",
  });
  const { formState } = form;
  const { isDirty } = formState;
  const PasswordForm = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });
  const passwordFormState = PasswordForm.formState;
  const passwordIsDirty = passwordFormState.isDirty;
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            toast.error(data?.error);
          } else {
            update();
            router.refresh();
            toast.info(data?.success);
          }
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };
  const onSubmitPassword = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      passwordSettings(values)
        .then((data) => {
          if (data.error) {
            PasswordForm.reset();
            toast.error(data?.error);
          } else {
            update();
            PasswordForm.reset();
            toast.info(data?.success);
          }
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen py-4 ">
        <Card className="w-[400px] lg:w-full md-w[500px] max-w-3xl">
          <CardHeader className="space-y-1">
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardTitle>Personal Information</CardTitle>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="ml-auto"
                  disabled={isPending || !isDirty}
                  type="submit"
                >
                  {isPending ? (
                    <Loader size={24} color="white" />
                  ) : (
                    <p>Save Changes</p>
                  )}
                </Button>
              </form>
            </Form>
            <Form {...PasswordForm}>
              <form
                className="space-y-6"
                onSubmit={PasswordForm.handleSubmit(onSubmitPassword)}
              >
                <CardTitle>Password</CardTitle>
                <FormField
                  control={PasswordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
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
                  control={PasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
                <Button
                  className="ml-auto"
                  disabled={isPending || !passwordIsDirty}
                  variant="secondary"
                  type="submit"
                >
                  {isPending ? (
                    <Loader size={24} color="white" />
                  ) : (
                    <p>Change password</p>
                  )}
                </Button>
              </form>
            </Form>
            <CardFooter className="flex justify-end">
              <DeleteButton id={user?.id} />
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
