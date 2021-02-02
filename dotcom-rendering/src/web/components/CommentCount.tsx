import React from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import { formatCount } from '@root/src/web/lib/formatCount';
import CommentIcon from '@frontend/static/icons/comment.svg';

type Props = {
	palette: Palette;
	isCommentable: boolean;
	commentCount: number;
	setIsExpanded: Function;
};

const containerStyles = (palette: Palette) => css`
	display: flex;
	align-self: flex-end;
	flex-direction: column;
	${textSans.medium()};
	font-weight: bold;
	color: ${palette.fill.commentCount};
	padding-top: 5px;
`;

const iconContainerStyles = css`
	height: 15px;
	margin: 0;
	text-align: right;
	margin-bottom: -2px;
	svg {
		height: 18px;
		width: 18px;
	}
`;

const iconStyles = (palette: Palette) => css`
	fill: ${palette.fill.commentCount};
`;

const longStyles = css`
	display: block;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

const linkStyles = css`
	color: inherit;
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
	:visited {
		color: inherit;
	}
`;

export const CommentCount = ({
	isCommentable,
	commentCount,
	palette,
	setIsExpanded,
}: Props) => {
	if (!isCommentable) return null;

	const { short, long } = formatCount(commentCount);

	return (
		<div className={containerStyles(palette)} data-cy="comment-counts">
			<a
				href="#comments"
				className={linkStyles}
				aria-label={`${short} Comments`}
				onClick={() => setIsExpanded(true)}
			>
				<div className={iconContainerStyles}>
					<CommentIcon className={iconStyles(palette)} />
				</div>
				<div
					data-testid="long-comment-count"
					className={longStyles}
					aria-hidden="true"
				>
					{long}
				</div>
				<div
					data-testid="short-comment-count"
					className={shortStyles}
					aria-hidden="true"
				>
					{short}
				</div>
			</a>
		</div>
	);
};
