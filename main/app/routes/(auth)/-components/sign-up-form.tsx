import { Button } from "~/shadcn/components/ui/button";
import { Input } from "~/shadcn/components/ui/input";
import { Label } from "~/shadcn/components/ui/label";
import { cn } from "../../../shadcn/utils/classnames";
import { Link, useRouter } from "@tanstack/react-router";
import { match, P } from "ts-pattern";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createServerFn } from "@tanstack/start";
import { toast } from "~/shadcn/hooks/use-toast";
import { prisma } from "~/db";
import { clientUserSchema } from "../-helpers/auth-schemas";
import { useAuthSession } from "~/session";
import { createUser, createJWT } from "../-helpers/auth-utils.server";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

const $signUp = createServerFn({ method: "POST" })
  .validator(
    signUpSchema.omit({
      confirmPassword: true,
    })
  )
  .handler(async ({ data }) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return {
        data: null,
        error: "We're  sorry that username already exists",
      } as const;
    }

    const newUser = await createUser({
      email: data.email,
      password: data.password,
    });

    if (!newUser) {
      return {
        data: null,
        error: "Could not create user",
      } as const;
    }

    const jwt = createJWT(newUser);

    const session = await useAuthSession();
    session.update({
      token: jwt,
      user: clientUserSchema.strip().parse(newUser),
    });
    return {
      data: "success",
      error: null,
    };
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  type SignUpSchema = z.infer<typeof signUpSchema>;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(
      signUpSchema.refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      })
    ),
  });

  const onSubmit = handleSubmit((data: SignUpSchema) => {
    $signUp({
      data,
    }).then((result) => {
      return match(result)
        .with({ data: null, error: P.string }, ({ error }) => {
          toast({
            variant: "destructive",
            title: error,
          });
        })
        .with({ data: P.string }, ({ data }) => {
          toast({
            variant: "success",
            title: "Success!",
          });
          router.invalidate();
        })
        .exhaustive();
    });
  });

  const emailError = errors.email?.message ?? "";
  const passwordError = errors.password?.message ?? "";
  const confirmPasswordError = errors.confirmPassword?.message ?? "";

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Create your account</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Enter your email and password below to sign up for an account
        </p>
      </div>
      <div className="gap-6 grid">
        <div className="gap-2 grid">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            aria-invalid={!!emailError}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!passwordError}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={!!confirmPasswordError}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
