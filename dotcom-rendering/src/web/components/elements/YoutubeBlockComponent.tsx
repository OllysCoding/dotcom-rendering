import React from 'react';
import { css } from 'emotion';

import { palette, space } from '@guardian/src-foundations';
import { body } from '@guardian/src-foundations/typography';
import { SvgAlertRound } from '@guardian/src-icons';
import { YoutubeAtom } from '@guardian/atoms-rendering';
import { Display, Design } from '@guardian/types';

import { trackVideoInteraction } from '@root/src/web/browser/ga/ga';
import { record } from '@root/src/web/browser/ophan/ophan';

import { Caption } from '@root/src/web/components/Caption';

type Props = {
	id: string;
	mediaTitle?: string;
	altText?: string;
	display: Display;
	design: Design;
	assetId: string;
	channelId: string;
	expired: boolean;
	pillar: Theme;
	role: RoleType;
	hideCaption?: boolean;
	overrideImage?: string;
	posterImage?: {
		url: string;
		width: number;
	}[];
	adTargeting?: AdTargeting;
	isMainMedia?: boolean;
	height?: number;
	width?: number;
	duration?: number; // in seconds
	origin?: string;
};

const expiredOverlayStyles = (overrideImage: string) => css`
	height: 0px;
	position: relative;
	background-image: url(${overrideImage});
	background-size: cover;
	background-position: 49% 49%;
	background-repeat: no-repeat;
	padding-bottom: 56%;
	color: ${palette.neutral[100]};
	background-color: ${palette.neutral[20]};
`;

const expiredTextWrapperStyles = css`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding-top: ${space[4]}px;
	padding-bottom: ${space[4]}px;
	padding-left: ${space[1]}px;
	padding-right: ${space[12]}px;
	color: ${palette.neutral[100]};
	background-color: ${palette.neutral[20]};
`;

const expiredSVGWrapperStyles = css`
	padding-right: ${space[1]}px;
	svg {
		width: ${space[12]}px;
		height: ${space[12]}px;
		fill: ${palette.neutral[100]};
	}
`;

export const YoutubeBlockComponent = ({
	id,
	assetId,
	mediaTitle,
	altText,
	display,
	design,
	pillar,
	hideCaption,
	overrideImage,
	posterImage,
	expired,
	role,
	adTargeting,
	isMainMedia,
	height = 259,
	width = 460,
	duration,
	origin,
}: Props) => {
	const shouldLimitWidth =
		!isMainMedia &&
		(role === 'showcase' || role === 'supporting' || role === 'immersive');

	if (expired) {
		return (
			<figure
				className={css`
					margin-top: 16px;
					margin-bottom: 16px;
				`}
			>
				<div
					className={
						overrideImage && expiredOverlayStyles(overrideImage)
					}
				>
					<div className={expiredTextWrapperStyles}>
						<div className={expiredSVGWrapperStyles}>
							<SvgAlertRound />
						</div>
						<p
							className={css`
								${body.medium({
									lineHeight: 'tight',
								})}
							`}
						>
							This video has been removed. This could be because
							it launched early, our rights have expired, there
							was a legal issue, or for another reason.
						</p>
					</div>
				</div>
				{!hideCaption && (
					<Caption
						display={display}
						design={design}
						captionText={mediaTitle || ''}
						pillar={pillar}
						displayCredit={false}
						shouldLimitWidth={shouldLimitWidth}
					/>
				)}
			</figure>
		);
	}

	const ophanTracking = (trackingEvent: string) => {
		if (!id) return;
		record({
			video: {
				id: `gu-video-youtube-${id}`,
				eventType: `video:content:${trackingEvent}`,
			},
		});
	};
	const gaTracking = (trackingEvent: string) => {
		if (!id) return;
		trackVideoInteraction({
			trackingEvent,
			elementId: id,
		});
	};

	return (
		<div data-chromatic="ignore">
			<YoutubeAtom
				assetId={assetId}
				overrideImage={
					overrideImage
						? [
								{
									srcSet: [
										{
											src: overrideImage,
											width: 500, // we do not have width for overlayImage so set a random number
										},
									],
								},
						  ]
						: undefined
				}
				posterImage={
					posterImage
						? [
								{
									srcSet: posterImage.map((img) => ({
										src: img.url,
										width: img.width,
									})),
								},
						  ]
						: undefined
				}
				role={role}
				alt={altText || mediaTitle || ''}
				adTargeting={adTargeting}
				height={height}
				width={width}
				title={mediaTitle}
				duration={duration}
				eventEmitters={[ophanTracking, gaTracking]}
				pillar={pillar}
				origin={process.env.NODE_ENV === 'development' ? '' : origin}
			/>
			{!hideCaption && (
				<Caption
					display={display}
					design={design}
					captionText={mediaTitle || ''}
					pillar={pillar}
					displayCredit={false}
					shouldLimitWidth={shouldLimitWidth}
				/>
			)}
		</div>
	);
};
