import React from 'react';
import { css } from 'emotion';

import {
	neutral,
	background,
	brandAltBackground,
	brandBackground,
	brandLine,
	brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { GuardianLines } from '@root/src/web/components/GuardianLines';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { MostViewedRightIsland } from '@root/src/web/components/MostViewedRightIsland';
import { SubMeta } from '@root/src/web/components/SubMeta';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/web/components/ArticleHeadlinePadding';
import { ArticleStandfirst } from '@root/src/web/components/ArticleStandfirst';
import { Header } from '@root/src/web/components/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '@root/src/web/components/AdSlot';
import { Border } from '@root/src/web/components/Border';
import { GridItem } from '@root/src/web/components/GridItem';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Discussion } from '@frontend/web/components/Discussion';
import { Placeholder } from '@frontend/web/components/Placeholder';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { parse } from '@frontend/lib/slot-machine-flags';
import { getAgeWarning } from '@root/src/lib/age-warning';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '@root/src/web/lib/layoutHelpers';
import {
	Stuck,
	SendToBack,
	BannerWrapper,
} from '@root/src/web/layouts/lib/stickiness';
import { Display, Design } from '@guardian/types';

const gridTemplateWide = css`
	grid-template-areas:
		'title  border  headline     right-column'
		'.      border  standfirst   right-column'
		'lines  border  media        right-column'
		'meta   border  media        right-column'
		'meta   border  body         right-column'
		'.      border  .            right-column';
`;

const gridTemplateWidePreFurnished = css`
	grid-template-areas:
		'title  border  preFurniture right-column'
		'.      border  headline     right-column'
		'.      border  standfirst   right-column'
		'lines  border  media        right-column'
		'meta   border  media        right-column'
		'meta   border  body         right-column'
		'.      border  .            right-column';
`;

const gridTemplateLeftCol = css`
	grid-template-areas:
		'preFurniture  right-column'
		'title         right-column'
		'headline      right-column'
		'standfirst    right-column'
		'media         right-column'
		'lines         right-column'
		'meta          right-column'
		'body          right-column'
		'.             right-column';
`;

const gridTemplateLeftColPreFurnished = css`
	grid-template-areas:
		'title         right-column'
		'headline      right-column'
		'standfirst    right-column'
		'media         right-column'
		'lines         right-column'
		'meta          right-column'
		'body          right-column'
		'.             right-column';
`;

const gridTemplateDesktop = css`
	grid-template-areas:
		'title'
		'headline'
		'standfirst'
		'media'
		'lines'
		'meta'
		'body';
`;
const gridTemplateDesktopPreFurnished = css`
	grid-template-areas:
		'preFurniture'
		'title'
		'headline'
		'standfirst'
		'media'
		'lines'
		'meta'
		'body';
`;

const gridTemplateTablet = css`
	grid-template-areas:
		'media'
		'title'
		'headline'
		'standfirst'
		'lines'
		'meta'
		'body';
`;
const gridTemplateTabletPreFurnished = css`
	grid-template-areas:
		'preFurniture'
		'media'
		'title'
		'headline'
		'standfirst'
		'lines'
		'meta'
		'body';
`;

const layoutGrid = (hasPreFurniture?: boolean) =>
	css`
		/* IE Fallback */
		display: flex;
		flex-direction: column;
		${until.leftCol} {
			margin-left: 0px;
		}
		${from.leftCol} {
			margin-left: 151px;
		}
		${from.wide} {
			margin-left: 230px;
		}

		@supports (display: grid) {
			display: grid;
			width: 100%;
			margin-left: 0;

			grid-column-gap: 10px;

			${from.wide} {
				grid-template-columns:
					219px /* Left Column (220 - 1px border) */
					1px /* Vertical grey border */
					1fr /* Main content */
					300px; /* Right Column */

				${hasPreFurniture
					? gridTemplateWidePreFurnished
					: gridTemplateWide}
			}

			${until.wide} {
				grid-template-columns:
					140px /* Left Column */
					1px /* Vertical grey border */
					1fr /* Main content */
					300px; /* Right Column */

				${hasPreFurniture
					? gridTemplateWidePreFurnished
					: gridTemplateWide}
			}

			${until.leftCol} {
				grid-template-columns:
					1fr /* Main content */
					300px; /* Right Column */
				${hasPreFurniture
					? gridTemplateLeftColPreFurnished
					: gridTemplateLeftCol}
			}

			${until.desktop} {
				grid-template-columns: 1fr; /* Main content */
				${hasPreFurniture
					? gridTemplateDesktopPreFurnished
					: gridTemplateDesktop}
			}

			${until.tablet} {
				grid-column-gap: 0px;

				grid-template-columns: 1fr; /* Main content */
				${hasPreFurniture
					? gridTemplateTabletPreFurnished
					: gridTemplateTablet}
			}
		}
	`;

const StandardGrid = ({
	children,
	design,
	CAPI,
}: {
	children: React.ReactNode;
	design: Design;
	CAPI: CAPIType;
}) => (
	<div
		className={layoutGrid(design === Design.MatchReport && !!CAPI.matchUrl)}
	>
		{children}
	</div>
);

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const articleWidth = css`
	${from.desktop} {
		width: 620px;
	}
`;

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const starWrapper = css`
	margin-bottom: 18px;
	margin-top: 6px;
	background-color: ${brandAltBackground.primary};
	display: inline-block;

	${until.phablet} {
		padding-left: 20px;
		margin-left: -20px;
	}
	${until.leftCol} {
		padding-left: 0px;
		margin-left: -0px;
	}

	padding-left: 10px;
	margin-left: -10px;
`;

const ageWarningMargins = css`
	margin-top: 12px;
	margin-left: -10px;
	margin-bottom: 6px;

	${from.tablet} {
		margin-left: -20px;
	}

	${from.leftCol} {
		margin-left: -10px;
		margin-top: 0;
	}
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	display: Display;
	design: Design;
	pillar: Theme;
}

export const StandardLayout = ({
	CAPI,
	NAV,
	display,
	design,
	pillar,
}: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

	const showBodyEndSlot =
		parse(CAPI.slotMachineFlags || '').showBodyEnd ||
		CAPI.config.switches.slotBodyEnd;

	// TODO:
	// 1) Read 'forceEpic' value from URL parameter and use it to force the slot to render
	// 2) Otherwise, ensure slot only renders if `CAPI.config.shouldHideReaderRevenue` equals false.

	const seriesTag = CAPI.tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

	const showMatchStats = design === Design.MatchReport && CAPI.matchUrl;

	const showComments = CAPI.isCommentable;

	const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

	const { branding } = CAPI.commercialProperties[CAPI.editionId];
	return (
		<>
			<div data-print-layout="hide">
				<Stuck>
					<Section
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
					>
						<HeaderAdSlot
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							display={display}
						/>
					</Section>
				</Stuck>
				<SendToBack>
					<Section
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Header
							edition={CAPI.editionId}
							idUrl={CAPI.config.idUrl}
							mmaUrl={CAPI.config.mmaUrl}
						/>
					</Section>

					<Section
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
						backgroundColour={brandBackground.primary}
					>
						<Nav
							pillar={getCurrentPillar(CAPI)}
							nav={NAV}
							display={display}
							subscribeUrl={
								CAPI.nav.readerRevenueLinks.header.subscribe
							}
							edition={CAPI.editionId}
						/>
					</Section>

					{NAV.subNavSections && (
						<Section
							backgroundColour={background.primary}
							padded={false}
							sectionId="sub-nav-root"
						>
							<SubNav
								subNavSections={NAV.subNavSections}
								currentNavLink={NAV.currentNavLink}
								pillar={pillar}
							/>
						</Section>
					)}

					<Section
						backgroundColour={background.primary}
						padded={false}
						showTopBorder={false}
					>
						<GuardianLines count={4} pillar={pillar} />
					</Section>
				</SendToBack>
			</div>

			<Section data-print-layout="hide" showTopBorder={false}>
				<StandardGrid design={design} CAPI={CAPI}>
					<GridItem area="title">
						<ArticleTitle
							display={display}
							design={design}
							tags={CAPI.tags}
							sectionLabel={CAPI.sectionLabel}
							sectionUrl={CAPI.sectionUrl}
							guardianBaseURL={CAPI.guardianBaseURL}
							pillar={pillar}
							badge={CAPI.badge}
						/>
					</GridItem>
					<GridItem area="border">
						<Border />
					</GridItem>
					<GridItem area="preFurniture">
						<div className={maxWidth}>
							{design === Design.MatchReport && CAPI.matchUrl && (
								<Placeholder rootId="match-nav" height={230} />
							)}
						</div>
					</GridItem>
					<GridItem area="headline">
						<div className={maxWidth}>
							<ArticleHeadlinePadding design={design}>
								{age && (
									<div className={ageWarningMargins}>
										<AgeWarning age={age} />
									</div>
								)}
								<ArticleHeadline
									display={display}
									headlineString={CAPI.headline}
									design={design}
									pillar={pillar}
									tags={CAPI.tags}
									byline={CAPI.author.byline}
								/>
								{age && (
									<AgeWarning
										age={age}
										isScreenReader={true}
									/>
								)}
							</ArticleHeadlinePadding>
						</div>
						{CAPI.starRating || CAPI.starRating === 0 ? (
							<div className={starWrapper}>
								<StarRating
									rating={CAPI.starRating}
									size="large"
								/>
							</div>
						) : (
							<></>
						)}
					</GridItem>
					<GridItem area="standfirst">
						<ArticleStandfirst
							display={display}
							design={design}
							pillar={pillar}
							standfirst={CAPI.standfirst}
						/>
					</GridItem>
					<GridItem area="media">
						<div className={maxWidth}>
							<MainMedia
								display={display}
								design={design}
								elements={CAPI.mainMediaElements}
								pillar={pillar}
								adTargeting={adTargeting}
								host={host}
							/>
						</div>
					</GridItem>
					<GridItem area="lines">
						<div className={maxWidth}>
							<div className={stretchLines}>
								<GuardianLines
									count={decideLineCount(design)}
									pillar={pillar}
									effect={decideLineEffect(design, pillar)}
								/>
							</div>
						</div>
					</GridItem>
					<GridItem area="meta">
						<div className={maxWidth}>
							<ArticleMeta
								branding={branding}
								display={display}
								design={design}
								pillar={pillar}
								pageId={CAPI.pageId}
								webTitle={CAPI.webTitle}
								author={CAPI.author}
								tags={CAPI.tags}
								primaryDateline={CAPI.blocks[0].primaryDateLine}
								secondaryDateline={
									CAPI.blocks[0].secondaryDateLine
								}
							/>
						</div>
					</GridItem>
					<GridItem area="body">
						<ArticleContainer>
							<main className={articleWidth}>
								<ArticleBody
									pillar={pillar}
									blocks={CAPI.blocks}
									display={display}
									design={design}
									adTargeting={adTargeting}
									host={host}
								/>
								{showMatchStats && <div id="match-stats" />}

								{showBodyEndSlot && <div id="slot-body-end" />}
								<GuardianLines
									data-print-layout="hide"
									count={4}
									pillar={pillar}
								/>
								<SubMeta
									pillar={pillar}
									subMetaKeywordLinks={
										CAPI.subMetaKeywordLinks
									}
									subMetaSectionLinks={
										CAPI.subMetaSectionLinks
									}
									pageId={CAPI.pageId}
									webUrl={CAPI.webURL}
									webTitle={CAPI.webTitle}
									showBottomSocialButtons={
										CAPI.showBottomSocialButtons
									}
									badge={CAPI.badge}
								/>
							</main>
						</ArticleContainer>
					</GridItem>
					<GridItem area="right-column">
						<div
							className={css`
								padding-top: 6px;
								height: 100%;
								${from.desktop} {
									/* above 980 */
									margin-left: 20px;
									margin-right: -20px;
								}
								${from.leftCol} {
									/* above 1140 */
									margin-left: 0px;
									margin-right: 0px;
								}
							`}
						>
							<RightColumn>
								<AdSlot position="right" display={display} />
								{!isPaidContent ? (
									<MostViewedRightIsland />
								) : (
									<></>
								)}
							</RightColumn>
						</div>
					</GridItem>
				</StandardGrid>
			</Section>

			<Section
				data-print-layout="hide"
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
			>
				<AdSlot
					data-print-layout="hide"
					position="merchandising-high"
					display={display}
				/>
			</Section>

			{!isPaidContent && (
				<>
					{/* Onwards (when signed OUT) */}
					<div
						data-print-layout="hide"
						id="onwards-upper-whensignedout"
					/>
					{showOnwardsLower && (
						<Section
							data-print-layout="hide"
							sectionId="onwards-lower-whensignedout"
						/>
					)}

					{showComments && (
						<Section data-print-layout="hide" sectionId="comments">
							<Discussion
								discussionApiUrl={CAPI.config.discussionApiUrl}
								shortUrlId={CAPI.config.shortUrlId}
								isCommentable={CAPI.isCommentable}
								pillar={pillar}
								discussionD2Uid={CAPI.config.discussionD2Uid}
								discussionApiClientHeader={
									CAPI.config.discussionApiClientHeader
								}
								enableDiscussionSwitch={false}
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
								beingHydrated={false}
								display={display}
							/>
						</Section>
					)}

					{/* Onwards (when signed IN) */}
					<div
						data-print-layout="hide"
						id="onwards-upper-whensignedin"
					/>
					{showOnwardsLower && (
						<Section
							data-print-layout="hide"
							sectionId="onwards-lower-whensignedin"
						/>
					)}

					<Section
						data-print-layout="hide"
						sectionId="most-viewed-footer"
					/>
				</>
			)}

			<Section
				data-print-layout="hide"
				padded={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
			>
				<AdSlot position="merchandising" display={display} />
			</Section>

			{NAV.subNavSections && (
				<Section
					data-print-layout="hide"
					padded={false}
					sectionId="sub-nav-root"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						pillar={pillar}
					/>
					<GuardianLines count={4} pillar={pillar} />
				</Section>
			)}

			<Section
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
			>
				<Footer
					pageFooter={CAPI.pageFooter}
					pillar={pillar}
					pillars={NAV.pillars}
				/>
			</Section>

			<BannerWrapper data-print-layout="hide" />
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
