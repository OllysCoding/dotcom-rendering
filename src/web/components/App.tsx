import React, { useState, useEffect, Suspense } from 'react';
import { useAB } from '@guardian/ab-react';
import { tests } from '@frontend/web/experiments/ab-tests';

import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { ShareCount } from '@frontend/web/components/ShareCount';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { RichLinkComponent } from '@frontend/web/components/elements/RichLinkComponent';
import { CalloutBlockComponent } from '@root/src/web/components/elements/CalloutBlockComponent';
import { YoutubeBlockComponent } from '@root/src/web/components/elements/YoutubeBlockComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { SlotBodyEnd } from '@frontend/web/components/SlotBodyEnd';
import { Links } from '@frontend/web/components/Links';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { GetMatchNav } from '@frontend/web/components/GetMatchNav';
import { Discussion } from '@frontend/web/components/Discussion';
import { StickyBottomBanner } from '@root/src/web/components/StickyBottomBanner/StickyBottomBanner';
import { SignInGateSelector } from '@root/src/web/components/SignInGate/SignInGateSelector';

import { incrementWeeklyArticleCount } from '@guardian/automat-client';
import {
    QandaAtom,
    GuideAtom,
    ProfileAtom,
    TimelineAtom,
    ChartAtom,
} from '@guardian/atoms-rendering';

import { AudioAtomWrapper } from '@frontend/web/components/AudioAtomWrapper';

import { Portal } from '@frontend/web/components/Portal';
import { Hydrate } from '@frontend/web/components/Hydrate';
import { Lazy } from '@frontend/web/components/Lazy';
import { Placeholder } from '@root/src/web/components/Placeholder';

import { decidePillar } from '@root/src/web/lib/decidePillar';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { loadScript } from '@root/src/web/lib/loadScript';
import { initPerf } from '@root/src/web/browser/initPerf';
import { getCookie } from '@root/src/web/browser/cookie';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getUser } from '@root/src/web/lib/getUser';
import { getBrazeUuid } from '@root/src/web/lib/getBrazeUuid';
import { FocusStyleManager } from '@guardian/src-foundations/utils';
import { incrementAlreadyVisited } from '@root/src/web/lib/alreadyVisited';
import { incrementDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';
import { getArticleCountConsent } from '@frontend/web/lib/contributions';
import { ReaderRevenueDevUtils } from '@root/src/web/lib/readerRevenueDevUtils';
import { Display } from '@root/src/lib/display';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';

import {
    cmp,
    onConsentChange,
    getConsentFor,
} from '@guardian/consent-management-platform';
import { injectPrivacySettingsLink } from '@root/src/web/lib/injectPrivacySettingsLink';
import {
    submitComponentEvent,
    OphanComponentEvent,
} from '../browser/ophan/ophan';
import { trackPerformance } from '../browser/ga/ga';

// *******************************
// ****** Dynamic imports ********
// *******************************
const MostViewedRightWrapper = React.lazy(() => {
    const { start, end } = initPerf('MostViewedRightWrapper');
    start();
    return import(
        /* webpackChunkName: "MostViewedRightWrapper" */ '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper'
    ).then((module) => {
        end();
        return { default: module.MostViewedRightWrapper };
    });
});
const OnwardsUpper = React.lazy(() => {
    const { start, end } = initPerf('OnwardsUpper');
    start();
    return import(
        /* webpackChunkName: "OnwardsUpper" */ '@frontend/web/components/Onwards/OnwardsUpper'
    ).then((module) => {
        end();
        return { default: module.OnwardsUpper };
    });
});
const OnwardsLower = React.lazy(() => {
    const { start, end } = initPerf('OnwardsLower');
    start();
    return import(
        /* webpackChunkName: "OnwardsLower" */ '@frontend/web/components/Onwards/OnwardsLower'
    ).then((module) => {
        end();
        return { default: module.OnwardsLower };
    });
});
const GetMatchStats = React.lazy(() => {
    const { start, end } = initPerf('GetMatchStats');
    start();
    return import(
        /* webpackChunkName: "GetMatchStats" */ '@frontend/web/components/GetMatchStats'
    ).then((module) => {
        end();
        return { default: module.GetMatchStats };
    });
});

type Props = { CAPI: CAPIBrowserType; NAV: NavType };

const componentEventHandler = (
    componentType: any,
    id: any,
    action: any,
) => () => {
    const componentEvent: OphanComponentEvent = {
        component: {
            componentType,
            id,
            products: [],
            labels: [],
        },
        action,
    };
    submitComponentEvent(componentEvent);
};

export const App = ({ CAPI, NAV }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>();
    const [
        shouldHideSupportMessaging,
        setShouldHideSupportMessaging,
    ] = useState<boolean>();
    const [user, setUser] = useState<UserProfile>();
    const [asyncBrazeUuid, setAsyncBrazeUuid] = useState<
        Promise<string | null>
    >();
    const [countryCode, setCountryCode] = useState<string>();
    // This is an async version of the countryCode state value defined above.
    // This can be used where you've got logic which depends on countryCode but
    // don't want to block on it becoming available, as you would with the
    // non-async version (this is the case in the banner picker where some
    // banners need countryCode but we don't want to block all banners from
    // executing their canShow logic until countryCode is available):
    const [asyncCountryCode, setAsyncCountryCode] = useState<Promise<string>>();

    const pageViewId = window.guardian?.config?.ophan?.pageViewId;

    // *******************************
    // ** Setup AB Test Tracking *****
    // *******************************
    const ABTestAPI = useAB();
    useEffect(() => {
        const allRunnableTests = ABTestAPI.allRunnableTests(tests);
        ABTestAPI.trackABTests(allRunnableTests);
        ABTestAPI.registerImpressionEvents(allRunnableTests);
        ABTestAPI.registerCompleteEvents(allRunnableTests);
    }, [ABTestAPI]);

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    useEffect(() => {
        setShouldHideSupportMessaging(
            getCookie('gu_hide_support_messaging') === 'true',
        );
    }, []);

    useEffect(() => {
        const callGetUser = async () => {
            setUser(await getUser(CAPI.config.discussionApiUrl));
        };
        if (isSignedIn) {
            callGetUser();
        }
    }, [isSignedIn, CAPI.config.discussionApiUrl]);

    useEffect(() => {
        // Don't do anything until isSignedIn is defined as we only want to set
        // asyncBrazeUuid once
        if (isSignedIn === undefined) {
            return;
        }

        if (isSignedIn) {
            setAsyncBrazeUuid(getBrazeUuid(CAPI.config.idApiUrl));
        } else {
            setAsyncBrazeUuid(Promise.resolve(null));
        }
    }, [isSignedIn, CAPI.config.idApiUrl]);

    useEffect(() => {
        const callFetch = () => {
            const countryCodePromise = getCountryCode();
            setAsyncCountryCode(countryCodePromise);
            countryCodePromise.then((cc) => setCountryCode(cc || ''));
        };
        callFetch();
    }, []);

    useEffect(() => {
        incrementAlreadyVisited();
    }, []);

    // Log an article view using the Slot Machine client lib
    // This function must be called once per article serving.
    // We should monitor this function call to ensure it only happens within an
    // article pages when other pages are supported by DCR.
    useEffect(() => {
        const incrementArticleCountsIfConsented = async () => {
            if (await getArticleCountConsent()) {
                incrementDailyArticleCount();
                incrementWeeklyArticleCount();
            }
        };
        incrementArticleCountsIfConsented();
    }, []);

    // Ensure the focus state of any buttons/inputs in any of the Source
    // components are only applied when navigating via keyboard.
    // READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
    useEffect(() => {
        FocusStyleManager.onlyShowFocusOnTabs();
    }, []);

    useEffect(() => {
        // Used internally only, so only import each function on demand
        const loadAndRun = <K extends keyof ReaderRevenueDevUtils>(key: K) => (
            asExistingSupporter: boolean,
        ) =>
            import(
                /* webpackChunkName: "readerRevenueDevUtils" */ '@frontend/web/lib/readerRevenueDevUtils'
            )
                .then((utils) =>
                    utils[key](
                        asExistingSupporter,
                        CAPI.shouldHideReaderRevenue,
                    ),
                )
                /* eslint-disable no-console */
                .catch((error) =>
                    console.log('Error loading readerRevenueDevUtils', error),
                );
        /* eslint-enable no-console */

        if (window && window.guardian) {
            window.guardian.readerRevenue = {
                changeGeolocation: loadAndRun('changeGeolocation'),
                showMeTheEpic: loadAndRun('showMeTheEpic'),
                showMeTheBanner: loadAndRun('showMeTheBanner'),
                showNextVariant: loadAndRun('showNextVariant'),
                showPreviousVariant: loadAndRun('showPreviousVariant'),
            };
        }
    }, [CAPI.shouldHideReaderRevenue]);

    // kick off the CMP...
    useEffect(() => {
        // the UI is injected automatically into the page,
        // and is not a react component, so it's
        // handled in here.
        if (CAPI.config.switches.consentManagement && countryCode) {
            const pubData = {
                browserId: getCookie('bwid') || undefined,
                pageViewId,
            };
            injectPrivacySettingsLink(); // manually updates the footer DOM because it's not hydrated

            // keep this in sync with CONSENT_TIMING in static/src/javascripts/boot.js in frontend
            // mark: CONSENT_TIMING
            let recordedConsentTime = false;
            onConsentChange(() => {
                if (!recordedConsentTime) {
                    recordedConsentTime = true;
                    cmp.willShowPrivacyMessage().then((willShow) => {
                        trackPerformance(
                            'consent',
                            'acquired',
                            willShow ? 'new' : 'existing',
                        );
                    });
                }
            });

            cmp.init({
                country: countryCode,
                pubData,
            });
        }
    }, [countryCode, CAPI.config.switches.consentManagement, pageViewId]);

    // ************************
    // *   Google Analytics   *
    // ************************
    useEffect(() => {
        onConsentChange((state: any) => {
            const consentGiven = getConsentFor('google-analytics', state);
            if (consentGiven) {
                loadScript('https://www.google-analytics.com/analytics.js');
                loadScript(window.guardian.gaPath);
            } else {
                (window as any).ga = null;
            }
        });
    }, []);

    const pillar = decidePillar(CAPI);
    const display: Display = decideDisplay(CAPI);
    const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

    return (
        // Do you need to Hydrate or do you want a Portal?
        //
        // Hydrate: If your component is server rendered and you're hydrating it with
        // more data or making it interactive on the client and you do not need to access
        // global application state.
        //
        // Portal: If your component is not server rendered but a pure client-side component
        // and/or you want to access global application state, you want to use a Portal.
        //
        // Note: Both require a 'root' element that needs to be server rendered.
        <React.StrictMode>
            <Portal root="reader-revenue-links-header">
                <ReaderRevenueLinks
                    urls={CAPI.nav.readerRevenueLinks.header}
                    edition={CAPI.editionId}
                    dataLinkNamePrefix="nav2 : "
                    inHeader={true}
                    pageViewId={pageViewId}
                />
            </Portal>
            <Hydrate root="links-root">
                <Links userId={user ? user.userId : undefined} />
            </Hydrate>
            <Hydrate root="edition-root">
                <EditionDropdown
                    edition={CAPI.editionId}
                    dataLinkName="nav2 : topbar : edition-picker: toggle"
                />
            </Hydrate>
            <Portal root="share-count-root">
                <ShareCount
                    ajaxUrl={CAPI.config.ajaxUrl}
                    pageId={CAPI.pageId}
                />
            </Portal>
            {CAPI.youtubeMainMediaBlockElement.map((youtubeBlock, index) => (
                <Hydrate
                    key={index}
                    root="youtube-block-main-media"
                    index={youtubeBlock.youtubeIndex}
                >
                    <YoutubeBlockComponent
                        display={display}
                        designType={CAPI.designType}
                        element={youtubeBlock}
                        pillar={pillar}
                        hideCaption={false}
                        // eslint-disable-next-line jsx-a11y/aria-role
                        role="inline"
                        adTargeting={adTargeting}
                        isMainMedia={false}
                        overlayImage={youtubeBlock.overrideImage}
                        duration={youtubeBlock.duration}
                        origin={CAPI.config.host}
                    />
                </Hydrate>
            ))}
            {CAPI.youtubeBlockElement.map((youtubeBlock, index) => (
                <Hydrate
                    key={index}
                    root="youtube-block"
                    index={youtubeBlock.youtubeIndex}
                >
                    <YoutubeBlockComponent
                        display={display}
                        designType={CAPI.designType}
                        element={youtubeBlock}
                        pillar={pillar}
                        hideCaption={false}
                        // eslint-disable-next-line jsx-a11y/aria-role
                        role="inline"
                        adTargeting={adTargeting}
                        isMainMedia={false}
                        overlayImage={youtubeBlock.overrideImage}
                        duration={youtubeBlock.duration}
                        origin={CAPI.config.host}
                    />
                </Hydrate>
            ))}
            {NAV.subNavSections && (
                <Hydrate root="sub-nav-root">
                    <>
                        <SubNav
                            subNavSections={NAV.subNavSections}
                            currentNavLink={NAV.currentNavLink}
                            pillar={pillar}
                        />
                    </>
                </Hydrate>
            )}
            {CAPI.matchUrl && (
                <Portal root="match-nav">
                    <GetMatchNav matchUrl={CAPI.matchUrl} />
                </Portal>
            )}
            {CAPI.richLinks.map((link, index) => (
                <Portal
                    key={index}
                    root="rich-link"
                    richLinkIndex={link.richLinkIndex}
                >
                    <RichLinkComponent
                        element={link}
                        pillar={pillar}
                        ajaxEndpoint={CAPI.config.ajaxUrl}
                        richLinkIndex={index}
                    />
                </Portal>
            ))}
            {CAPI.callouts.map((callout) => (
                <Hydrate root="callout" index={callout.calloutIndex}>
                    <CalloutBlockComponent callout={callout} pillar={pillar} />
                </Hydrate>
            ))}
            {CAPI.chartAtoms.map((chart) => (
                <Hydrate root="chart-atom" index={chart.chartIndex}>
                    <ChartAtom id={chart.id} html={chart.html} />
                </Hydrate>
            ))}
            {CAPI.audioAtoms.map((audioAtom) => (
                <Hydrate root="audio-atom" index={audioAtom.audioIndex}>
                    <AudioAtomWrapper
                        id={audioAtom.id}
                        trackUrl={audioAtom.trackUrl}
                        kicker={audioAtom.kicker}
                        title={audioAtom.title}
                        pillar={pillar}
                        contentIsNotSensitive={!CAPI.config.isSensitive}
                        aCastisEnabled={CAPI.config.switches.acast}
                        readerCanBeShownAds={!CAPI.isAdFreeUser}
                    />
                </Hydrate>
            ))}
            {CAPI.qandaAtoms.map((qandaAtom) => (
                <Hydrate root="qanda-atom" index={qandaAtom.qandaIndex}>
                    <QandaAtom
                        id={qandaAtom.id}
                        title={qandaAtom.title}
                        html={qandaAtom.html}
                        image={qandaAtom.img}
                        credit={qandaAtom.credit}
                        pillar={pillar}
                        likeHandler={componentEventHandler(
                            'QANDA_ATOM',
                            qandaAtom.id,
                            'LIKE',
                        )}
                        dislikeHandler={componentEventHandler(
                            'QANDA_ATOM',
                            qandaAtom.id,
                            'DISLIKE',
                        )}
                        expandCallback={componentEventHandler(
                            'QANDA_ATOM',
                            qandaAtom.id,
                            'EXPAND',
                        )}
                    />
                </Hydrate>
            ))}
            {CAPI.guideAtoms.map((guideAtom) => (
                <Hydrate root="guide-atom" index={guideAtom.guideIndex}>
                    <GuideAtom
                        id={guideAtom.id}
                        title={guideAtom.title}
                        html={guideAtom.html}
                        image={guideAtom.img}
                        credit={guideAtom.credit}
                        pillar={pillar}
                        likeHandler={componentEventHandler(
                            'GUIDE_ATOM',
                            guideAtom.id,
                            'LIKE',
                        )}
                        dislikeHandler={componentEventHandler(
                            'GUIDE_ATOM',
                            guideAtom.id,
                            'DISLIKE',
                        )}
                        expandCallback={componentEventHandler(
                            'GUIDE_ATOM',
                            guideAtom.id,
                            'EXPAND',
                        )}
                    />
                </Hydrate>
            ))}
            {CAPI.profileAtoms.map((profileAtom) => (
                <Hydrate root="profile-atom" index={profileAtom.profileIndex}>
                    <ProfileAtom
                        id={profileAtom.id}
                        title={profileAtom.title}
                        html={profileAtom.html}
                        image={profileAtom.img}
                        credit={profileAtom.credit}
                        pillar={pillar}
                        likeHandler={componentEventHandler(
                            'PROFILE_ATOM',
                            profileAtom.id,
                            'LIKE',
                        )}
                        dislikeHandler={componentEventHandler(
                            'PROFILE_ATOM',
                            profileAtom.id,
                            'DISLIKE',
                        )}
                        expandCallback={componentEventHandler(
                            'PROFILE_ATOM',
                            profileAtom.id,
                            'EXPAND',
                        )}
                    />
                </Hydrate>
            ))}
            {CAPI.timelineAtoms.map((timelineAtom) => (
                <Hydrate
                    root="timeline-atom"
                    index={timelineAtom.timelineIndex}
                >
                    <TimelineAtom
                        id={timelineAtom.id}
                        title={timelineAtom.title}
                        events={timelineAtom.events}
                        description={timelineAtom.description}
                        pillar={pillar}
                        likeHandler={componentEventHandler(
                            'TIMELINE_ATOM',
                            timelineAtom.id,
                            'LIKE',
                        )}
                        dislikeHandler={componentEventHandler(
                            'TIMELINE_ATOM',
                            timelineAtom.id,
                            'DISLIKE',
                        )}
                        expandCallback={componentEventHandler(
                            'TIMELINE_ATOM',
                            timelineAtom.id,
                            'EXPAND',
                        )}
                    />
                </Hydrate>
            ))}
            <Portal root="most-viewed-right">
                <Lazy margin={100}>
                    <Suspense fallback={<></>}>
                        <MostViewedRightWrapper pillar={pillar} />
                    </Suspense>
                </Lazy>
            </Portal>
            {CAPI.matchUrl && (
                <Portal root="match-stats">
                    <Lazy margin={300}>
                        <Suspense fallback={<Placeholder height={800} />}>
                            <GetMatchStats matchUrl={CAPI.matchUrl} />
                        </Suspense>
                    </Lazy>
                </Portal>
            )}
            <Portal root="slot-body-end">
                <SlotBodyEnd
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
            </Portal>
            <Portal
                root={
                    isSignedIn
                        ? 'onwards-upper-whensignedin'
                        : 'onwards-upper-whensignedout'
                }
            >
                <Lazy margin={300}>
                    <Suspense fallback={<></>}>
                        <OnwardsUpper
                            ajaxUrl={CAPI.config.ajaxUrl}
                            hasRelated={CAPI.hasRelated}
                            hasStoryPackage={CAPI.hasStoryPackage}
                            isAdFreeUser={CAPI.isAdFreeUser}
                            pageId={CAPI.pageId}
                            isPaidContent={CAPI.config.isPaidContent || false}
                            showRelatedContent={CAPI.config.showRelatedContent}
                            keywordIds={CAPI.config.keywordIds}
                            contentType={CAPI.contentType}
                            tags={CAPI.tags}
                            edition={CAPI.editionId}
                            pillar={pillar}
                        />
                    </Suspense>
                </Lazy>
            </Portal>
            <Portal
                root={
                    isSignedIn
                        ? 'onwards-lower-whensignedin'
                        : 'onwards-lower-whensignedout'
                }
            >
                <Lazy margin={300}>
                    <Suspense fallback={<></>}>
                        <OnwardsLower
                            ajaxUrl={CAPI.config.ajaxUrl}
                            hasStoryPackage={CAPI.hasStoryPackage}
                            tags={CAPI.tags}
                            pillar={pillar}
                        />
                    </Suspense>
                </Lazy>
            </Portal>
            <Portal root="sign-in-gate">
                <SignInGateSelector isSignedIn={isSignedIn} CAPI={CAPI} />
            </Portal>
            <Hydrate root="comments">
                <Discussion
                    discussionApiUrl={CAPI.config.discussionApiUrl}
                    shortUrlId={CAPI.config.shortUrlId}
                    isCommentable={CAPI.isCommentable}
                    pillar={pillar}
                    user={user}
                    discussionD2Uid={CAPI.config.discussionD2Uid}
                    discussionApiClientHeader={
                        CAPI.config.discussionApiClientHeader
                    }
                    enableDiscussionSwitch={CAPI.config.enableDiscussionSwitch}
                    isAdFreeUser={CAPI.isAdFreeUser}
                    shouldHideAds={CAPI.shouldHideAds}
                    beingHydrated={true}
                    display={display}
                />
            </Hydrate>
            <Portal root="most-viewed-footer">
                <MostViewedFooter
                    pillar={pillar}
                    sectionName={CAPI.sectionName}
                    ajaxUrl={CAPI.config.ajaxUrl}
                    display={display}
                />
            </Portal>
            <Portal root="reader-revenue-links-footer">
                <Lazy margin={300}>
                    <ReaderRevenueLinks
                        urls={CAPI.nav.readerRevenueLinks.footer}
                        edition={CAPI.editionId}
                        dataLinkNamePrefix="footer : "
                        inHeader={false}
                        pageViewId={pageViewId}
                    />
                </Lazy>
            </Portal>
            <Portal root="bottom-banner">
                <StickyBottomBanner
                    isSignedIn={isSignedIn}
                    asyncCountryCode={asyncCountryCode}
                    CAPI={CAPI}
                    asyncBrazeUuid={asyncBrazeUuid}
                    shouldHideSupportMessaging={shouldHideSupportMessaging}
                />
            </Portal>
        </React.StrictMode>
    );
};
