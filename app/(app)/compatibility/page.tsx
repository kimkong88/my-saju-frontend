import { Suspense } from "react";
import FriendsPageContent from "@/components/friends-page/FriendsPageContent";
import Loading from "@/components/Loading";
import { getMeOverview } from "@/app/actions/meAction";

async function CompatibilityPageContentWrapper() {
    const meOverview = await getMeOverview();
    const currentUserCode = meOverview.user.code || meOverview.user.id;
    
    return <FriendsPageContent currentUserCode={currentUserCode} />;
}

// Note: React DevTools may show a performance measurement warning for async server components.
// This is a known issue and doesn't affect functionality. It only appears in development.

export default function CompatibilityPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Loading />
                </div>
            }
        >
            <CompatibilityPageContentWrapper />
        </Suspense>
    );
}
