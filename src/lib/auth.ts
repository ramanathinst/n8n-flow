import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import prisma from "./db";
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "7efbc8f1-e42c-4d87-85a6-1a32b93d0159", // ID of Product from Polar Dashboard
                            slug: "n8n" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal(),
                usage(),
            ], 
        }) 
    ]
});