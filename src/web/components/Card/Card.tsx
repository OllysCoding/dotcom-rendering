import React from 'react';
import { css } from 'emotion';

import { palette } from '@guardian/src-foundations';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { CardHeadline } from '@frontend/web/components/CardHeadline';
import { Avatar } from '@frontend/web/components/Avatar';
import { Flex } from '@frontend/web/components/Flex';
import { Hide } from '@frontend/web/components/Hide';
import { MediaMeta } from '@frontend/web/components/MediaMeta';
import { CardCommentCount } from '@frontend/web/components/CardCommentCount';

import { formatCount } from '@root/src/web/lib/formatCount';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { CardLayout } from './components/CardLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { AvatarContainer } from './components/AvatarContainer';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { CardFooter } from './components/CardFooter';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardAge } from './components/CardAge';

type CoveragesType = {
    image: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
    content: {
        small: CardPercentageType;
        medium: CardPercentageType;
        large: CardPercentageType;
        jumbo: CardPercentageType;
    };
};

const coverages: CoveragesType = {
    // coverages is how we set the image size relative to the space given
    // to the headline. These percentages are passed to flex-basis inside the
    // wrapper components
    image: {
        small: '25%',
        medium: '50%',
        large: '67%',
        jumbo: '75%',
    },
    content: {
        small: '75%',
        medium: '50%',
        large: '33%',
        jumbo: '25%',
    },
};

const StarRatingComponent: React.FC<{ rating: number }> = ({ rating }) => (
    <>
        <Hide when="above" breakpoint="desktop">
            <div className={starWrapper}>
                <StarRating rating={rating} size="small" />
            </div>
        </Hide>
        <Hide when="below" breakpoint="desktop">
            <div className={starWrapper}>
                <StarRating rating={rating} size="medium" />
            </div>
        </Hide>
    </>
);

const starWrapper = css`
    background-color: ${palette.brandYellow.main};
    position: absolute;
    bottom: 0;
    margin-top: 2px;
`;

export const Card = ({
    linkTo,
    pillar,
    designType,
    headlineText,
    headlineSize,
    showQuotes,
    byline,
    isLiveBlog,
    showByline,
    webPublicationDate,
    imageUrl,
    imagePosition,
    imageSize,
    standfirst,
    avatar,
    showClock,
    mediaType,
    mediaDuration,
    kickerText,
    showPulsingDot,
    showSlash,
    commentCount,
    starRating,
}: CardType) => {
    // Decide how we position the image on the card
    let imageCoverage: CardPercentageType | undefined;
    let contentCoverage: CardPercentageType | undefined;
    if (imageSize && imagePosition !== 'top') {
        // We only specifiy an explicit width for the image when
        // we're positioning left or right, not top. Top positioned
        // images flow naturally
        imageCoverage = coverages.image[imageSize];
        contentCoverage = coverages.content[imageSize];
    }

    const { long: longCount, short: shortCount } = formatCount(commentCount);

    return (
        <CardLink linkTo={linkTo} designType={designType} pillar={pillar}>
            <TopBar topBarColour={palette[pillar].main}>
                <CardLayout imagePosition={imagePosition}>
                    <>
                        {imageUrl && (
                            <ImageWrapper percentage={imageCoverage}>
                                <img
                                    src={imageUrl}
                                    alt=""
                                    role="presentation"
                                />
                                <>
                                    {starRating && (
                                        <StarRatingComponent
                                            rating={starRating}
                                        />
                                    )}
                                </>
                            </ImageWrapper>
                        )}
                        <ContentWrapper percentage={contentCoverage}>
                            <Flex>
                                <HeadlineWrapper>
                                    <CardHeadline
                                        headlineText={headlineText}
                                        designType={designType}
                                        pillar={pillar}
                                        size={headlineSize}
                                        showQuotes={showQuotes}
                                        // kickerText={
                                        //     designType === 'Live'
                                        //         ? 'Live'
                                        //         : kickerText
                                        // }
                                        showPulsingDot={
                                            designType === 'Live' ||
                                            showPulsingDot
                                        }
                                        showSlash={
                                            designType === 'Live' || showSlash
                                        }
                                        byline={byline}
                                        showByline={showByline}
                                    />
                                </HeadlineWrapper>
                                <>
                                    {avatar && (
                                        <Hide when="above" breakpoint="tablet">
                                            <AvatarContainer>
                                                <Avatar
                                                    imageSrc={avatar.src}
                                                    imageAlt={avatar.alt}
                                                    pillar={pillar}
                                                />
                                            </AvatarContainer>
                                        </Hide>
                                    )}
                                </>
                            </Flex>
                            <div>
                                {standfirst && (
                                    <StandfirstWrapper>
                                        {standfirst}
                                    </StandfirstWrapper>
                                )}
                                {avatar && (
                                    <Hide when="below" breakpoint="tablet">
                                        <AvatarContainer>
                                            <Avatar
                                                imageSrc={avatar.src}
                                                imageAlt={avatar.alt}
                                                pillar={pillar}
                                            />
                                        </AvatarContainer>
                                    </Hide>
                                )}
                                <CardFooter
                                    designType={designType}
                                    age={
                                        webPublicationDate ? (
                                            <CardAge
                                                designType={designType}
                                                pillar={pillar}
                                                webPublicationDate={
                                                    webPublicationDate
                                                }
                                                showClock={showClock}
                                            />
                                        ) : (
                                            undefined
                                        )
                                    }
                                    mediaMeta={
                                        designType === 'Media' && mediaType ? (
                                            <MediaMeta
                                                pillar={pillar}
                                                mediaType={mediaType}
                                                mediaDuration={mediaDuration}
                                            />
                                        ) : (
                                            undefined
                                        )
                                    }
                                    commentCount={
                                        longCount && shortCount ? (
                                            <CardCommentCount
                                                designType={designType}
                                                pillar={pillar}
                                                long={longCount}
                                                short={shortCount}
                                            />
                                        ) : (
                                            undefined
                                        )
                                    }
                                />
                            </div>
                        </ContentWrapper>
                    </>
                </CardLayout>
            </TopBar>
        </CardLink>
    );
};
