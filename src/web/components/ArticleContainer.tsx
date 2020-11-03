import React from 'react';
import { css, cx } from 'emotion';
import { from, until } from '@guardian/src-foundations/mq';
import { labelStyles } from '@root/src/web/components/AdSlot';

const articleContainer = css`
    ${until.leftCol} {
        /* below 1140 */
        padding-left: 0;
    }

    flex-grow: 1;

    /* Due to MainMedia using position: relative, this seems to effect the rendering order
    To mitigate we use z-index
    TODO: find a cleaner solution */
    z-index: 1;
`;

const articleAdStyles = css`
    .ad-slot {
        width: 300px;
        margin: 12px auto;
        min-width: 160px;
        min-height: 274px;
        text-align: center;
        position: relative;
    }
    .ad-slot--mostpop {
        ${from.desktop} {
            margin: 0;
            width: auto;
        }
    }
    .ad-slot--inline {
        ${from.tablet} {
            margin-right: -100px;
            width: auto;
            float: right;
            margin-top: 4px;
            margin-left: 20px;
        }
        ${from.desktop} {
            width: auto;
            float: right;
            margin: 0;
            margin-top: 4px;
            margin-left: 20px;
        }
    }
    .ad-slot--offset-right {
        ${from.desktop} {
            float: right;
            width: auto;
            margin-right: -318px;
        }

        ${from.wide} {
            margin-right: -398px;
        }
    }
    .ad-slot--outstream {
        ${from.tablet} {
            margin-left: 0;
            width: 100%;

            .ad-slot__label {
                margin-left: 35px;
                margin-right: 35px;
            }
        }
    }
    .ad-slot--im {
        float: left;
        width: 130px;

        ${from.mobileLandscape} {
            width: 220px;
        }

        &:not(.ad-slot--rendered) {
            width: 0;
            height: 0;
        }

        &.ad-slot--rendered {
            margin: 5px 10px 6px 0;
            ${from.mobileLandscape} {
                margin-bottom: 12px;
                margin-right: 20px;
            }
        }
    }
    ${labelStyles};
`;

type Props = {
    children: JSXElements;
};

export const ArticleContainer = ({ children }: Props) => {
    return (
        <main className={cx(articleContainer, articleAdStyles)}>
            {children}
        </main>
    );
};
