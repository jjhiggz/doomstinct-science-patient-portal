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
import { verifyPassword } from "../-helpers/auth-utils.server";
import { createJWT } from "../-helpers/jwt";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const $login = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      include: {
        password: true,
      },
    });

    if (!user) {
      return {
        data: null,
        error: "Invalid email or password",
      } as const;
    }

    const isValid = await verifyPassword(
      data.password,
      user.password?.hash ?? ""
    );

    if (!isValid) {
      return {
        data: null,
        error: "Invalid email or password",
      } as const;
    }

    const jwt = createJWT(user);
    const session = await useAuthSession();

    return await session.update({
      token: jwt,
      user: clientUserSchema.strip().parse(user),
    });
  });

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  type LoginSchema = z.infer<typeof loginSchema>;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data: LoginSchema) => {
    $login({
      data,
    }).then((result) => {
      return match(result)
        .with({ data: null, error: P.string }, ({ error }) => {
          toast({
            variant: "destructive",
            title: error,
          });
        })
        .otherwise(() => {
          toast({
            variant: "success",
            title: "Welcome back!",
          });
          router.invalidate();
        });
    });
  });

  const emailError = errors.email?.message ?? "";
  const passwordError = errors.password?.message ?? "";

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">Login to your account</h1>
        <p className="text-balance text-muted-foreground text-sm">
          Enter your email below to login to your account
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
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
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
