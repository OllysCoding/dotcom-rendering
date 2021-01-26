import React from 'react';
import { css, cx } from 'emotion';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space, neutral, brandAltBackground } from '@guardian/src-foundations';

import { Hide } from '@frontend/web/components/Hide';
import { Display, Design } from '@guardian/types';

type Props = {
	display: Display;
	design: Design;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	pillar: Theme;
	badge?: BadgeType;
	isSpecial?: boolean;
};

const sectionLabelLink = css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const rowBelowLeftCol = css`
	display: flex;
	flex-direction: column;
	${until.leftCol} {
		flex-direction: row;
	}
`;

const marginBottom = css`
	margin-bottom: 5px;
`;

const yellowBackground = css`
	background-color: ${brandAltBackground.primary};
	padding-left: 2px;
`;

const pillarColours = pillarMap(
	(pillar) =>
		css`
			color: ${pillarPalette[pillar].main};
		`,
);

const primaryStyle = css`
	font-weight: 700;
	${headline.xxxsmall({ fontWeight: 'bold' })};
	${from.leftCol} {
		${headline.xxsmall({ fontWeight: 'bold' })};
	}

	padding-right: ${space[2]}px;
`;

const invertedStyle = (pillar: Theme) => css`
	font-weight: 700;
	${headline.xxxsmall({ fontWeight: 'bold' })};
	${from.leftCol} {
		${headline.xxsmall({ fontWeight: 'bold' })};
	}
	color: ${neutral[100]};
	background-color: ${pillarPalette[pillar].main};

	/* Handle text wrapping onto a new line */
	white-space: pre-wrap;
	box-shadow: -6px 0 0 ${pillarPalette[pillar].main};
	box-decoration-break: clone;
	line-height: 28px;
	${from.leftCol} {
		line-height: 28px;
	}

	padding-right: ${space[3]}px;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;
	padding-left: ${space[3]}px;
	${from.mobileLandscape} {
		padding-left: ${space[5]}px;
	}
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
`;

const whiteFont = css`
	font-weight: 700;
	${headline.xxxsmall({ fontWeight: 'bold' })};
	${from.leftCol} {
		${headline.xxsmall({ fontWeight: 'bold' })};
	}
	color: ${neutral[100]};
`;

const blackText = css`
	color: ${neutral[0]};
`;

const secondaryStyle = css`
	${headline.xxxsmall({ fontWeight: 'regular' })};
	display: block;
`;

export const SeriesSectionLink = ({
	display,
	design,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	pillar,
	badge,
	isSpecial,
}: Props) => {
	// If we have a tag, use it to show 2 section titles
	const tag = tags.find(
		(thisTag) =>
			thisTag.type === 'Blog' ||
			thisTag.type === 'Series' ||
			thisTag.title === 'The Observer',
	);

	const hasSeriesTag = tag && tag.type === 'Series';

	switch (display) {
		case Display.Immersive: {
			switch (design) {
				case Design.Comment:
				case Design.GuardianView: {
					if (tag) {
						// We have a tag, we're not immersive, show both series and section titles
						return (
							// Sometimes the tags/titles are shown inline, sometimes stacked
							<div className={cx(!badge && rowBelowLeftCol)}>
								<a
									href={`${guardianBaseURL}/${tag.id}`}
									className={cx(
										sectionLabelLink,
										primaryStyle,
										whiteFont,
									)}
									data-component="series"
									data-link-name="article series"
								>
									<span>{tag.title}</span>
								</a>

								<Hide when="below" breakpoint="tablet">
									<a
										href={`${guardianBaseURL}/${sectionUrl}`}
										className={cx(
											sectionLabelLink,
											secondaryStyle,
											whiteFont,
										)}
										data-component="section"
										data-link-name="article section"
									>
										<span>{sectionLabel}</span>
									</a>
								</Hide>
							</div>
						);
					}
					// There's no tag so fallback to section title
					return (
						<div className={marginBottom}>
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								className={cx(
									sectionLabelLink,
									primaryStyle,
									whiteFont,
								)}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</div>
					);
				}
				default: {
					if (hasSeriesTag) {
						if (!tag) return null; // Just to keep ts happy
						return (
							<a
								href={`${guardianBaseURL}/${tag.id}`}
								className={cx(
									sectionLabelLink,
									pillarColours[pillar],
									invertedStyle(pillar),
								)}
								data-component="series"
								data-link-name="article series"
							>
								<span>{tag.title}</span>
							</a>
						);
					}
					// Immersives show nothing at all if there's no series tag
					return null;
				}
			}
		}
		case Display.Showcase:
		case Display.Standard:
		default: {
			if (tag) {
				// We have a tag, we're not immersive, show both series and section titles
				return (
					// Sometimes the tags/titles are shown inline, sometimes stacked
					<div className={cx(!badge && rowBelowLeftCol)}>
						<a
							href={`${guardianBaseURL}/${tag.id}`}
							className={cx(
								sectionLabelLink,
								design === Design.MatchReport
									? blackText
									: pillarColours[pillar],
								primaryStyle,
								isSpecial && yellowBackground,
							)}
							data-component="series"
							data-link-name="article series"
						>
							<span>{tag.title}</span>
						</a>

						<Hide when="below" breakpoint="tablet">
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								className={cx(
									sectionLabelLink,
									design === Design.MatchReport
										? blackText
										: pillarColours[pillar],
									secondaryStyle,
								)}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</Hide>
					</div>
				);
			}
			// There's no tag so fallback to section title
			return (
				<a
					href={`${guardianBaseURL}/${sectionUrl}`}
					className={cx(
						sectionLabelLink,
						design === Design.MatchReport
							? blackText
							: pillarColours[pillar],
						primaryStyle,
					)}
					data-component="section"
					data-link-name="article section"
				>
					<span>{sectionLabel}</span>
				</a>
			);
		}
	}
};
