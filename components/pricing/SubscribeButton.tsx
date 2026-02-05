"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { subscribe } from "@/app/actions/subscriptionAction";
import { toast } from "sonner";

interface SubscribeButtonProps {
    isSubscribed: boolean;
}

export default function SubscribeButton({ isSubscribed }: SubscribeButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        if (isSubscribed) {
            // Already subscribed - redirect to profile
            router.push("/me");
            return;
        }

        setIsLoading(true);
        try {
            await subscribe();
            toast.success("Successfully subscribed! Welcome to Premium.");
            // Redirect to profile after successful subscription
            router.push("/me");
            router.refresh(); // Refresh to update subscription status
        } catch (error) {
            console.error("Subscription error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to subscribe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <CreditCard className="w-5 h-5" />
                    {isSubscribed ? "Go to Profile" : "Subscribe Now"}
                </>
            )}
        </button>
    );
}
