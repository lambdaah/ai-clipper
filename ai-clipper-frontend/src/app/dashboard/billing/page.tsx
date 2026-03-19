"use client"

import type { VariantProps } from "class-variance-authority";
import { ArrowLeftIcon, CheckIcon, Link } from "lucide-react";
import { Button, type buttonVariants } from "~/components/ui/button";
import type { PriceId } from "~/actions/stripe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { createCheckoutSession } from "~/actions/stripe";

interface PricingPlan{
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonVariant: VariantProps<typeof buttonVariants>["variant"];
    isPopular?: boolean;
    savePercentage?: string;
    priceId: PriceId;
}

const plans: PricingPlan[] = [
    {title: "Small Pack", 
        price: "$9.99", 
        description: "Perfect for the occasional podcaster", 
        features: ["50 credits", "No expiration", "Download All clips"],
        buttonText: "Buy 50 credits",
        buttonVariant: "outline",
        priceId: "small"
    },
    {title: "Medium Pack", 
        price: "$19.99", 
        description: "Great for regular podcasters", 
        features: ["100 credits", "No expiration", "Download All clips"],
        buttonText: "Buy 100 credits",
        buttonVariant: "outline",
        isPopular: true,
        savePercentage: "20%",
        priceId: "medium"
    },
    {title: "Large Pack", 
        price: "$29.99", 
        description: "Ideal for power users", 
        features: ["200 credits", "No expiration", "Download All clips"],
        buttonText: "Buy 200 credits",
        buttonVariant: "outline",
        isPopular: true,
        savePercentage: "33%",
        priceId: "large"
    },
];


function PricingCard({plan}: {plan: PricingPlan}) {
    return <Card className={cn("relative flex flex-col", plan.isPopular && "border-primary border-2")}> 
    {plan.isPopular && (<div className="bg-primary whitespace-nowrap text-primary-foreground absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform rounded-full px-3 py-1 text-sm font-medium">
        Most Popular</div>)}
        <CardHeader className="flex-1">
                <CardTitle>{plan.title}</CardTitle>
                <div className="text-4xl font-bold">{plan.price}</div>
                {plan.savePercentage && (
                    <p className="text-sm font-medium text-green-600">Save {plan.savePercentage}
                    </p>
                )}
                <CardDescription>{plan.description}</CardDescription>
            </CardHeader> 
            <CardContent className="space-y-2">
                <ul className="text-muted-foreground space-y-2 text-sm">
                    {plan.features.map((feature, index) => (<li key={index} className="flex items-center gap-2"><CheckIcon className="text-primary size-4"></CheckIcon>{feature}</li>))}
                </ul>
            </CardContent>
            <CardFooter>
                <form action={() => createCheckoutSession(plan.priceId)} className="w-full">
                    <Button variant={plan.buttonVariant} className="w-full" type="submit">{plan.buttonText}</Button>
                </form>
            </CardFooter>
        </Card>
}


export default function BillingPage() {
    return (<div className="mx-auto flex min-w-5xl flex-col space-y-8 px-4 py-12">
        <div className="relative flex items-center justify-center gap-4">
            <Button className="absolute top-0 left-0" variant="outline" size="icon" asChild>
                <Link href="/dashboard">
            <ArrowLeftIcon className="size-4"></ArrowLeftIcon>
            </Link>
            </Button>
            <div className="space-y-2 text-center">
                <h1 className ="text-2xl sm:text-4xl font-bold tracking-tight">
                    Buy Credits
                </h1>
                <p className="text-muted-foreground">
                    Purchase credits to generate more podcast clips. The more credits you buy the better the value
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
                <PricingCard key={plan.title} plan={plan} />
            ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="mb-4 text-lg font-semibold">How credits work</h3>
        <ul className="text-muted-forground list-disc space-y-2 pl-5 text-sm">
            <li> 1 credit = 1 minute of generated podcast content </li>
            <li> The program will create around 1 clip per 5 minutes of podcast </li>
            <li> Credits never expire and can be used at any time </li>
            <li> Longer podcasts require more credits based on the duration </li>
            <li> All packages are one-time purchases (not subscription) </li>
        </ul>
        </div>
    </div>);
}