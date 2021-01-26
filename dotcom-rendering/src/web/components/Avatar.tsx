import React from 'react';
import { css, cx } from 'emotion';

import { Pillar } from '@guardian/types';

import { pillarPalette } from '@frontend/lib/pillars';

const contributorImage = css`
	border-radius: 100%;
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const pillarBackground = (pillar: Theme = Pillar.Opinion) =>
	css`
		background-color: ${pillar === Pillar.Opinion
			? pillarPalette[pillar].main
			: pillarPalette[pillar].bright};
	`;

export const Avatar: React.FC<{
	imageSrc: string;
	imageAlt: string;
	pillar: Theme;
}> = ({ imageSrc, imageAlt, pillar }) => {
	return (
		<img
			src={imageSrc}
			alt={imageAlt}
			className={cx(pillarBackground(pillar), contributorImage)}
		/>
	);
};
