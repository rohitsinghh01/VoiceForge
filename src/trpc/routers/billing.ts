import { TRPCError } from "@trpc/server";
import { polar } from '@/lib/polar'
import { env } from '@/lib/env';
import { createTRPCRouter, orgProcedure } from "../init";

function polarApiFailureMessage(error: unknown): string | null {
    if (
        error &&
        typeof error === "object" &&
        "statusCode" in error &&
        typeof (error as { statusCode: unknown }).statusCode === "number" &&
        "body" in error &&
        typeof (error as { body: unknown }).body === "string"
    ) {
        const { statusCode, body, message } = error as {
            statusCode: number;
            body: string;
            message?: string;
        };
        return `${message ?? "Polar API error"} (${statusCode}): ${body}`;
    }
    return null;
}

/** Polar SDK wraps TCP/TLS/DNS failures as ConnectionError / "fetch failed". */
function polarConnectionFailureMessage(error: unknown): string | null {
    if (!(error instanceof Error)) return null;
    const low = error.message.toLowerCase();
    if (
        error.name === "ConnectionError" ||
        low.includes("unable to make request") ||
        low.includes("fetch failed")
    ) {
        const host =
            env.POLAR_SERVER === "production"
                ? "https://api.polar.sh"
                : "https://sandbox-api.polar.sh";
        const sysCause =
            error.cause instanceof Error ? ` (${error.cause.message})` : "";
        return `${error.message}${sysCause} — Your Next.js server could not reach Polar at ${host}. On the same machine, run: curl -I ${host}. Fix VPN/firewall/DNS, or set HTTPS_PROXY if a corporate proxy is required.`;
    }
    return null;
}

export const billingRouter = createTRPCRouter({
    createCheckout: orgProcedure.mutation(async ({ ctx }) => {
        try {
            const result = await polar.checkouts.create({
                products: [env.POLAR_PRODUCT_ID],
                externalCustomerId: ctx.orgId,
                successUrl: env.APP_URL,
            });

            if (!result.url) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout" });
            }

            return { checkoutUrl: result.url };
        } catch (error) {
            const polarMsg = polarApiFailureMessage(error);
            if (polarMsg) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: polarMsg,
                    cause: error,
                });
            }
            if (error instanceof TRPCError) throw error;
            const connectionMsg = polarConnectionFailureMessage(error);
            if (connectionMsg) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: connectionMsg,
                    cause: error,
                });
            }
            const fallback =
                error instanceof Error ? error.message : "Checkout failed";
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: fallback,
                cause: error,
            });
        }
    }),

    createPortalSession: orgProcedure.mutation(async ({ ctx }) => {
        try {
            const result = await polar.customerSessions.create({
                externalCustomerId: ctx.orgId,
            });

            if (!result.customerPortalUrl) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create portal session" });
            }

            return { portalUrl: result.customerPortalUrl };
        } catch (error) {
            const polarMsg = polarApiFailureMessage(error);
            if (polarMsg) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: polarMsg,
                    cause: error,
                });
            }
            if (error instanceof TRPCError) throw error;
            const connectionMsg = polarConnectionFailureMessage(error);
            if (connectionMsg) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: connectionMsg,
                    cause: error,
                });
            }
            const fallback =
                error instanceof Error ? error.message : "Portal session failed";
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: fallback,
                cause: error,
            });
        }
    }),

    getStatus: orgProcedure.query(async ({ ctx }) => {
        try {
            const customerState = await polar.customers.getStateExternal({
                externalId: ctx.orgId,
            });

            const hasActiveSubscription = (customerState.activeSubscriptions ?? []).length > 0;

            let estimatedCostCents = 0;
            for (const sub of customerState.activeSubscriptions ?? []) {
                for (const meter of sub.meters ?? []) {
                    estimatedCostCents += meter.amount ?? 0;
                }
            }

            return {
                hasActiveSubscription,
                estimatedCostCents,
                customerId: customerState.id
            };
        } catch {
            return {
                hasActiveSubscription: false,
                estimatedCostCents: 0,
                customerId: null
            }
        }
    })
});