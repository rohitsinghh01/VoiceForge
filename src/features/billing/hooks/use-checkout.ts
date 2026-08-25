import { useCallback } from "react";
import { isTRPCClientError } from "@trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";

export function useCheckout() {
    const trpc = useTRPC();
    const mutation = useMutation(
        trpc.billing.createCheckout.mutationOptions({})
    );

    const checkout = useCallback(() => {
        mutation.mutate(undefined, {
            onSuccess: (data) => {
                window.location.href = data.checkoutUrl;
            },
            onError: (error) => {
                console.error("[billing.createCheckout]", error);
                const message = isTRPCClientError(error)
                    ? error.message
                    : error instanceof Error
                      ? error.message
                      : "Checkout failed";
                toast.error(message);
            },
        });
    }, [mutation]);

    return { checkout, isPending: mutation.isPending };
}