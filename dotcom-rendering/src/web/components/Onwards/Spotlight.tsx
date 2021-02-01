/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Design, Display } from '@guardian/types';

import { Card } from '@frontend/web/components/Card/Card';

type Props = {
	content: TrailType[];
};

export const Spotlight = ({ content }: Props) => (
	<Card
		linkTo={content[0].url}
		format={{
			display: Display.Standard,
			design: content[0].design,
			theme: content[0].pillar,
		}}
		headlineText={content[0].headline}
		headlineSize="large"
		byline={content[0].byline}
		showByline={content[0].showByline}
		showQuotes={content[0].design === Design.Comment}
		webPublicationDate={content[0].webPublicationDate}
		kickerText={content[0].kickerText}
		showPulsingDot={content[0].isLiveBlog}
		showSlash={true}
		showClock={false}
		imageUrl={content[0].image}
		mediaType={content[0].mediaType}
		mediaDuration={content[0].mediaDuration}
		commentCount={content[0].commentCount}
		imagePosition="right"
		imageSize="jumbo"
	/>
);
