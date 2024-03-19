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
import { SettingsSchema } from "@/schemas";

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
import { settings } from "@/actions/settings";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import DeleteButton from "./delete-account-form";

export default function ProfileCard() {
  const user = useCurrentUser();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            form.reset();
            toast.error(data?.error);
          }
          form.reset();
          if (data.success) {
            update();
            form.reset();
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Password</FormLabel>
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

                <CardFooter className="flex space-x-2 ">
                  <Button
                    className="ml-auto"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? (
                      <Loader size={24} color="white" />
                    ) : (
                      <p>Save Changes</p>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
            <DeleteButton id={user?.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
