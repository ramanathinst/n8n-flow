"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginFormScehma = z.object({
    email: z.email({ message: "Enter a valid email!" }),
    password: z.string().min(4).max(15),
})

type LoginFormValues = z.infer<typeof loginFormScehma>

export const LoginForm = () => {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormScehma),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },
            {
                onSuccess: () => {
                    toast.success("Login success!")
                    router.push("/")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }
    const isPending = form.formState.isSubmitting;
    return (
        <Card className="w-full max-w-md mx-auto mt-30">
            <CardHeader className="flex flex-col items-center">
                <CardTitle className="font-semibold">Create an account</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Enter your email and password to sign up
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            type="email"
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
                        <Button disabled={isPending} type="submit" className="w-full hover:cursor-pointer">
                            {isPending ? "Logging an account...." : "Login"}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-primary font-medium hover:underline"
                            >
                                Signup
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}