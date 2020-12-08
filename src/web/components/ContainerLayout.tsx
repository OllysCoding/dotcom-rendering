import React from 'react';
import { css, cx } from 'emotion';

import { Section } from '@root/src/web/components/Section';
import { LeftColumn } from '@root/src/web/components/LeftColumn';
import { ContainerTitle } from '@root/src/web/components/ContainerTitle';
import { Hide } from '@root/src/web/components/Hide';
import { Flex } from '@root/src/web/components/Flex';

import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

type Props = {
    title?: string;
    fontColour?: string;
    description?: string;
    url?: string;
    sectionId?: string;
    sideBorders?: boolean;
    centralBorder?: 'partial' | 'full';
    showTopBorder?: boolean;
    padSides?: boolean;
    padContent?: boolean;
    verticalMargins?: boolean;
    backgroundColour?: string;
    borderColour?: string;
    leftContent?: JSXElements;
    children?: React.ReactNode;
};

const Container = ({
    children,
    padded,
    verticalMargins,
}: {
    children: React.ReactNode;
    padded: boolean;
    verticalMargins: boolean;
}) => {
    const containerStyles = css`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        width: 100%;
    `;

    const margins = css`
        margin-top: ${space[2]}px;
        /*
           Keep spacing at the bottom of the container consistent at 36px, regardless of
           breakpoint, based on chat with Harry Fisher
        */
        margin-bottom: ${space[9]}px;
        ${from.wide} {
            margin-right: 68px;
        }
    `;

    const padding = css`
        padding: 0 10px;

        ${from.mobileLandscape} {
            padding: 0 20px;
        }
    `;
    return (
        <div
            className={cx(
                containerStyles,
                padded && padding,
                verticalMargins && margins,
            )}
        >
            {children}
        </div>
    );
};

export const ContainerLayout = ({
    title,
    fontColour,
    description,
    url,
    sectionId,
    sideBorders = false,
    centralBorder,
    showTopBorder = false,
    padSides = true,
    padContent = true,
    verticalMargins = true,
    borderColour,
    backgroundColour,
    children,
    leftContent,
}: Props) => (
    <Section
        sectionId={sectionId}
        showSideBorders={sideBorders}
        showTopBorder={showTopBorder}
        padded={padSides}
        borderColour={borderColour}
        backgroundColour={backgroundColour}
    >
        <Flex>
            <LeftColumn
                showRightBorder={centralBorder === 'full'}
                borderColour={borderColour}
                showPartialRightBorder={centralBorder === 'partial'}
            >
                <>
                    <ContainerTitle
                        title={title}
                        fontColour={fontColour}
                        description={description}
                        url={url}
                    />
                    {leftContent}
                </>
            </LeftColumn>
            <Container padded={padContent} verticalMargins={verticalMargins}>
                <Hide when="above" breakpoint="leftCol">
                    <ContainerTitle
                        title={title}
                        fontColour={fontColour}
                        description={description}
                        url={url}
                    />
                </Hide>
                {children}
            </Container>
        </Flex>
    </Section>
);