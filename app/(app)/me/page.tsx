import { Suspense } from "react";
import MeIdentityHeader from "@/components/me-page/MeIdentityHeader";
import MeProfileSwitcher from "@/components/me-page/MeProfileSwitcher";
import MeUserInfo from "@/components/me-page/MeUserInfo";
import MeWhoYouAre from "@/components/me-page/MeWhoYouAre";
import MeSpecialTraits from "@/components/me-page/MeSpecialTraits";
import MeFullReportLink from "@/components/me-page/MeFullReportLink";
import MeLifeQuestions from "@/components/me-page/MeLifeQuestions";
import MeCompatibilityShare from "@/components/me-page/MeCompatibilityShare";
import MeLuckCycle from "@/components/me-page/MeLuckCycle";
import MeBlessingHistory from "@/components/me-page/MeBlessingHistory";
import Loading from "@/components/Loading";
import { getMeOverview, getQuestions } from "@/app/actions/meAction";
import { getBlessings } from "@/app/actions/blessingsAction";
import { getSubscriptionStatus } from "@/app/actions/subscriptionAction";
import { auth } from "@/auth";

/**
 * Format ISO date string to readable format
 * The UTC date represents the local date/time in the birth timezone
 * Extract UTC components directly and format without timezone conversion
 * Example: "1988-06-11T20:00:00.000Z" -> "June 11, 1988"
 */
function formatBirthDate(isoDateString: string): string {
    // Parse the UTC date - extract UTC components directly
    const date = new Date(isoDateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    // Format directly using UTC components (no timezone conversion)
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return `${monthNames[month]} ${day}, ${year}`;
}

/**
 * Format ISO date string to time format
 * The UTC date represents the local time in the birth timezone
 * Extract UTC time components directly
 * Example: "1988-06-11T20:00:00.000Z" -> "8:00 PM"
 */
function formatBirthTime(isoDateString: string): string {
    // Parse the UTC date - extract UTC time components directly
    const date = new Date(isoDateString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Format time
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${displayHours}:${displayMinutes} ${period}`;
}

async function MePageContent() {
    let meOverview;
    try {
        meOverview = await getMeOverview();
    } catch (error) {
        // If refresh token failed, handleRefreshTokenFailure will redirect
        // Re-throw to let Next.js handle the redirect
        throw error;
    }

    const session = await auth();

    // Get accountId from backend response (primary source) or session (fallback)
    // Backend is the source of truth since it has the latest user data
    const accountId =
        meOverview.user.accountId ||
        (session as { accountId?: string })?.accountId ||
        null;

    // If backend has accountId but session doesn't, update the session
    if (
        meOverview.user.accountId &&
        !(session as { accountId?: string })?.accountId
    ) {
        // Trigger session update to sync accountId from backend
        const { updateSession } = await import("@/app/actions/authAction");
        await updateSession();
    }

    // Use user from meOverview - this is the user for the current session
    const currentUser = meOverview.user;

    // Format birth date - UTC date already represents local date/time
    const formattedBirthDate = formatBirthDate(currentUser.birthDate);

    // Format birth time if known - UTC time already represents local time
    const formattedBirthTime = currentUser.isTimeKnown
        ? formatBirthTime(currentUser.birthDate)
        : undefined;

    // Get subscription status and blessings data from API
    let blessingsData = null;
    let isPremium = false;
    try {
        const [subscription, blessings] = await Promise.all([
            getSubscriptionStatus().catch(() => ({ isSubscribed: false })),
            getBlessings().catch(() => null),
        ]);
        blessingsData = blessings;
        isPremium = subscription?.isSubscribed || false;
    } catch (error) {
        console.error("Error loading subscription/blessings:", error);
        // On error, use defaults
        isPremium = false;
    }

    // Get questions from API
    let questionsData = null;
    try {
        questionsData = await getQuestions("me");
    } catch (error) {
        console.error("Error loading questions:", error);
        // On error, use null (component will show pending state)
        questionsData = null;
    }

    return (
        <div className="space-y-0">
            {/* 1. Identity Header - Who you are (natural first) */}
            <MeIdentityHeader
                identity={meOverview.identity}
                rarity={meOverview.rarity}
                userCode={meOverview.user.code || meOverview.user.id}
            />

            {/* 1.5. Profile Switcher - Very visible, sticky at top */}
            <MeProfileSwitcher
                currentProfileId={currentUser.id}
                currentProfileName={currentUser.fullName}
                accountId={accountId}
                isPremium={isPremium}
                maxProfiles={5}
            />

            {/* 1.6. Who You Are - Element visualization and summary */}
            {meOverview.whoYouAre && (
                <MeWhoYouAre
                    whoYouAre={meOverview.whoYouAre}
                    identity={meOverview.identity}
                    rarity={meOverview.rarity}
                    reportCode={meOverview.user.id}
                />
            )}

            {/* 2. Special Traits - What makes you special (build value) */}
            <MeSpecialTraits
                specialTraits={meOverview.specialTraits}
                overallRarity={meOverview.rarity}
                reportCode={meOverview.user.id}
                isPremium={isPremium}
            />

            {/* 2.5. Luck Cycle - Current cycle with countdown */}
            {meOverview.luckCycles && (
                <MeLuckCycle
                    current={meOverview.luckCycles.current}
                    next={meOverview.luckCycles.next}
                    isPremium={isPremium}
                />
            )}

            {/* 3. User Info Details - Complete the picture */}
            <MeUserInfo
                userId={currentUser.id}
                name={currentUser.fullName}
                birthdate={formattedBirthDate}
                birthDateISO={currentUser.birthDate}
                birthTime={formattedBirthTime}
                isTimeKnown={currentUser.isTimeKnown}
                gender={currentUser.gender as "male" | "female" | undefined}
                birthCity={currentUser.birthLocation}
                currentCity={currentUser.currentLocation}
            />

            {/* 3.5. Compatibility Share - Let others check compatibility */}
            <MeCompatibilityShare
                identity={meOverview.identity}
                rarity={meOverview.rarity}
                userCode={meOverview.user.code || meOverview.user.id}
                userName={currentUser.fullName}
                compatibilityCheckCount={
                    (meOverview as { compatibilityCheckCount?: number })
                        .compatibilityCheckCount
                }
            />

            {/* 3.6. Blessing History - Show total count and history (premium) */}
            <MeBlessingHistory
                totalCount={blessingsData?.totalBlessingsCount || 0}
                activeBlessings={(() => {
                    if (!blessingsData) return [];

                    // Filter active blessings (not expired)
                    const now = new Date();
                    return blessingsData.blessings
                        .filter((blessing) => {
                            const expiresAt = new Date(blessing.expiresAt);
                            return expiresAt.getTime() > now.getTime();
                        })
                        .map((blessing) => ({
                            id: blessing.id,
                            fromName: blessing.sender.fullName,
                            fromElement: blessing.sender.identity.element,
                            fromIdentity: {
                                code: blessing.sender.identity.code,
                                element: blessing.sender.identity.element,
                                title: blessing.sender.identity.title,
                            },
                            fromRarity: {
                                oneIn: blessing.sender.rarity.oneIn,
                            },
                            personalMessage: blessing.message,
                            sentAt: blessing.createdAt,
                            expiresAt: blessing.expiresAt,
                        }));
                })()}
                blessings={
                    isPremium && blessingsData
                        ? blessingsData.blessings.map((blessing) => ({
                              id: blessing.id,
                              fromName: blessing.sender.fullName,
                              fromElement: blessing.sender.identity.element,
                              fromIdentity: {
                                  code: blessing.sender.identity.code,
                                  element: blessing.sender.identity.element,
                                  title: blessing.sender.identity.title,
                              },
                              fromRarity: {
                                  oneIn: blessing.sender.rarity.oneIn,
                              },
                              personalMessage: blessing.message,
                              sentAt: blessing.createdAt,
                              expiresAt: blessing.expiresAt,
                          }))
                        : []
                }
                isPremium={isPremium}
            />

            {/* 4. Life Questions - Natural discovery moment (conversion) */}
            <MeLifeQuestions initialResponse={questionsData} scope="me" />

            {/* 5. Full Report Link - Final conversion CTA */}
            {/* TODO: Get reportCode from API when available */}
            {meOverview.user.id && (
                <MeFullReportLink reportCode={meOverview.user.id} />
            )}
        </div>
    );
}

export default function MePage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loading />
                </div>
            }
        >
            <MePageContent />
        </Suspense>
    );
}
