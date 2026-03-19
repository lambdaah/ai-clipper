"use client"

import { cn } from "~/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import Link from "next/dist/client/link"
import { loginSchema, signupSchema, type LoginFormValues, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth"
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/components/navigation"
import { log } from "console"
  

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try{
            setIsSubmitting(true);
            setError(null);

            const signInResult = await signIn("credentials",{email: data.email, password:data.password, redirect: false});

            if (signInResult?.error){
              setError("Invalid email or password");
            }
            else {
              router.push("/dashboard");

            }
        } catch (err: unknown) {
  console.error("Login failed:", err);

  // best-effort message extraction
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
        ? err
        : "An unexpected error occurred. Please try again.";

  setError(message);
} finally {
            setIsSubmitting(false);

        }

    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                  {error}
                </p>
              )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" required {...register("password")} />
                {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
              </Field>
              <Field>
                {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                  {error}
                </p>
              )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Log in"}</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an Account? <Link href="/signup">Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
