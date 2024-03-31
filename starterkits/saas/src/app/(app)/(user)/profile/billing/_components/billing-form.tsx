"use client"

import * as React from "react"

import { type UserSubscriptionPlan } from "@/types/billing"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Icons } from "@/components/ui/icons"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>, buttonType: number) {
    event.preventDefault()
    setIsLoading(!isLoading)

    let response
    // Get a Stripe session URL.
    if (buttonType === 1) {
      response = await fetch("/api/users/stripe/professional")
    } else if (buttonType === 2) {
      response = await fetch("/api/users/stripe/enterprise")
    } else {
      return toast(
        "Something went wrong.", {
        description: "Please refresh the page and try again.",
      }
      )
    }

    if (!response?.ok) {
      return toast(
        "Something went wrong.", {
        description: "Please refresh the page and try again.",
      }
      )
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    interface Session {
      url: string;
    }

    if (response) {
      const session = await response.json() as Session;

      if (session) {
        window.location.href = session.url;
      }
    }
}

  return (
    <form className={cn(className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col max-md:space-y-2 md:flex-row md:space-x-2">

          <button
            type="button"
            className={cn(buttonVariants())}
            disabled={isLoading}
            onClick={(event) => handleButtonClick(event, 1)}
          >
            {isLoading && (
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPaid ? "Manage Subscription" : "Upgrade to Pro"}
          </button>
          {!subscriptionPlan.isPaid ? (
            <button
              type="button"
              className={cn(buttonVariants())}
              disabled={isLoading}
              onClick={(event) => handleButtonClick(event, 2)}
            >
              {isLoading && (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upgrade to Enterprise
            </button>
          ) : null}


          {subscriptionPlan.isPaid ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}