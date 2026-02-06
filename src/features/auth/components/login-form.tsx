"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* ---------------- Schema ---------------- */

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/* ---------------- Component ---------------- */

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
          toast.success("Login successful");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const handleGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const isPending = form.formState.isSubmitting;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FieldGroup>
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>

                {/* GitHub */}
                <Button variant="outline" type="button" onClick={handleGithub}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 
                      0 5.303 3.438 9.8 8.205 11.385 
                      .6.113.82-.258.82-.577 
                      0-.285-.01-1.04-.015-2.04 
                      -3.338.724-4.042-1.61-4.042-1.61 
                      C4.422 18.07 3.633 17.7 3.633 17.7 
                      c-1.087-.744.084-.729.084-.729 
                      1.205.084 1.838 1.236 1.838 1.236 
                      1.07 1.835 2.809 1.305 3.495.998 
                      .108-.776.417-1.305.76-1.605 
                      -2.665-.3-5.466-1.332-5.466-5.93 
                      0-1.31.465-2.38 1.235-3.22 
                      -.135-.303-.54-1.523.105-3.176 
                      0 0 1.005-.322 3.3 1.23 
                      .96-.267 1.98-.399 3-.405 
                      1.02.006 2.04.138 3 .405 
                      2.28-1.552 3.285-1.23 3.285-1.23 
                      .645 1.653.24 2.873.12 3.176 
                      .765.84 1.23 1.91 1.23 3.22 
                      0 4.61-2.805 5.625-5.475 5.92 
                      .42.36.81 1.096.81 2.22 
                      0 1.606-.015 2.896-.015 3.286 
                      0 .315.21.69.825.57 
                      C20.565 22.092 24 17.592 24 12.297 
                      c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  Login with GitHub
                </Button>

                {/* Google */}
                <Button variant="outline" type="button" onClick={handleGoogle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-4 w-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.9-2.18 5.36-4.62 7.02l7.06 5.48C43.94 36.36 46.5 30.67 46.5 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.54 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.98-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.9-2.13 15.86-5.78l-7.06-5.48c-1.96 1.32-4.48 2.1-8.8 2.1-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  Login with Google
                </Button>

                <FieldDescription className="px-6 text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="underline">
                    Sign up
                  </a>
                </FieldDescription>
              </FieldGroup>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
