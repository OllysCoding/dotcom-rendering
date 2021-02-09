import React from 'react';
import { css } from 'emotion';

import { Design } from '@guardian/types';
import { Lines } from '@guardian/src-ed-lines';
import { from } from '@guardian/src-foundations/mq';

type Props = {
	design: Design;
	age?: JSX.Element;
	mediaMeta?: JSX.Element;
	commentCount?: JSX.Element;
	isFullCardImage?: boolean;
};

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const fullCardImageLayout = css`
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	margin-right: -1px;
	${from.tablet} {
		margin-bottom: -2px;
	}
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

const linesWrapperStyles = css`
	/* Fill the container */
	flex-grow: 1;
	/* Push the lines down to align with the bottom of the card */
	margin-top: 5px;
`;

export const CardFooter = ({
	design,
	age,
	mediaMeta,
	commentCount,
	isFullCardImage,
}: Props) => {
	if (
		!isFullCardImage &&
		(design === Design.Comment || design === Design.GuardianView)
	) {
		return (
			<footer className={spaceBetween}>
				{age}
				<div className={linesWrapperStyles}>
					<Lines count={4} />
				</div>
				{commentCount}
			</footer>
		);
	}

	if (design === Design.Media) {
		return (
			<footer className={spaceBetween}>
				{mediaMeta}
				{/* Show age if we have it otherwise try for commentCount */}
				{age || commentCount}
			</footer>
		);
	}

	if (age) {
		return (
			<footer
				className={isFullCardImage ? fullCardImageLayout : spaceBetween}
			>
				{age}
				{commentCount}
			</footer>
		);
	}

	return (
		<footer className={flexEnd}>
			<>{commentCount}</>
		</footer>
	);
};
