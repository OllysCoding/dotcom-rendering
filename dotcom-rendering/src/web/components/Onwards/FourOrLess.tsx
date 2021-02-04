/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Design } from '@guardian/types';

import { Card } from '@frontend/web/components/Card/Card';
import { UL } from '@frontend/web/components/Card/components/UL';
import { LI } from '@frontend/web/components/Card/components/LI';

type Props = {
	content: TrailType[];
};

const decidePercentage = (length: number) => {
	switch (length) {
		case 1:
			return '100%';
		case 2:
			return '50%';
		case 3:
			return '33%';
		case 4:
		default:
			return '25%';
	}
};

export const FourOrLess = ({ content }: Props) => {
	const percentage = decidePercentage(content.length);

	return (
		<>
			<UL direction="row" bottomMargin={true}>
				{content.map((trail, index) => (
					<LI
						padSides={true}
						showDivider={index > 0}
						showTopMarginWhenStacked={index > 0}
						percentage={percentage}
					>
						<Card
							linkTo={trail.url}
							format={{
								display: trail.display,
								design: trail.design,
								theme: trail.pillar,
							}}
							headlineText={trail.headline}
							headlineSize="medium"
							byline={trail.byline}
							showByline={trail.showByline}
							showQuotes={trail.design === Design.Comment}
							webPublicationDate={trail.webPublicationDate}
							kickerText={trail.kickerText}
							showPulsingDot={trail.isLiveBlog}
							showSlash={true}
							showClock={false}
							imageUrl={trail.image}
							mediaType={trail.mediaType}
							mediaDuration={trail.mediaDuration}
							commentCount={trail.commentCount}
							starRating={trail.starRating}
						/>
					</LI>
				))}
			</UL>
		</>
	);
};
