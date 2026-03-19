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
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth"
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/components/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        try{
            setIsSubmitting(true);
            setError(null);

            const result = await signUp(data);
            if (!result.success){
              setError(result.error ?? "An error occured during signup")
              return;
            }

            const signUpResult = await signIn("credentials",{email: data.email, password:data.password, redirect: false});

            if (signUpResult?.error){
              setError("Account created but couldn't sign in. Please try logging in manually.");
            }
            else {
              router.push("/dashboard");

            }
        } catch (err: unknown) {
  console.error("Signup failed:", err);

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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to sign up account
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
                <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Signing up..." : "Sign Up"}</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
