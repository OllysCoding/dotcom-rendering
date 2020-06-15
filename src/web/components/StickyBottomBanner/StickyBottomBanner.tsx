import React, { useState, useEffect } from 'react';
import {
    CMP,
    shouldShow as shouldShowCMP,
} from '@root/src/web/components/StickyBottomBanner/CMP';
import { ReaderRevenueBanner } from '@root/src/web/components/StickyBottomBanner/ReaderRevenueBanner';

type Props = {
    isSignedIn?: boolean;
    countryCode?: string;
    CAPI: CAPIBrowserType;
};

export const StickyBottomBanner = ({
    isSignedIn,
    countryCode,
    CAPI,
}: Props) => {
    const [showCMP, setShowCMP] = useState<boolean | null>(null);

    useEffect(() => {
        const callShouldShow = () => setShowCMP(shouldShowCMP());

        if (CAPI.config.cmpUi) {
            callShouldShow();
        }
    }, [CAPI.config.cmpUi]);

    // Don't render anything until we know whether we can show the CMP
    if (showCMP === null) {
        return null;
    }

    // Temporary flag to toggle RR banner while it is in development
    const showRRBanner = false;

    return (
        <>
            {showCMP ? (
                <CMP />
            ) : (
                showRRBanner && (
                    <ReaderRevenueBanner
                        isSignedIn={isSignedIn}
                        countryCode={countryCode}
                        contentType={CAPI.contentType}
                        sectionName={CAPI.sectionName}
                        shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
                        isMinuteArticle={CAPI.pageType.isMinuteArticle}
                        isPaidContent={CAPI.pageType.isPaidContent}
                        isSensitive={CAPI.config.isSensitive}
                        tags={CAPI.tags}
                        contributionsServiceUrl={CAPI.contributionsServiceUrl}
                    />
                )
            )}
        </>
    );
};
