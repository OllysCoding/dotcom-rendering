import React from 'react';

import { Flex } from '@root/src/lofi/components/Flex';
import { RightColumn } from '@root/src/lofi/components/RightColumn';
import { ArticleContainer } from '@root/src/lofi/components/ArticleContainer';
import { Section } from '@root/src/lofi/components/Section';

import { LeftColumn } from './LeftColumn';

export default {
    component: LeftColumn,
    title: 'Components/LeftColumn',
};

export const PartialRightBorder = () => {
    return (
        <Section>
            <Flex>
                <LeftColumn
                    showPartialRightBorder={true}
                    showRightBorder={false}
                >
                    <>
                        The border to my right is only partial, it does not
                        stretch the whole height
                    </>
                </LeftColumn>
                <ArticleContainer>
                    <img
                        src="https://via.placeholder.com/600x500.png?text=Placeholder%20to%20push%20content%20down"
                        alt="Fill"
                    />
                </ArticleContainer>
                <RightColumn>
                    <>Right column content</>
                </RightColumn>
            </Flex>
        </Section>
    );
};
PartialRightBorder.story = { name: 'Partial right border' };

export const RightBorder = () => {
    return (
        <Section>
            <Flex>
                <LeftColumn>
                    <>The border to my right should stretch the whole height</>
                </LeftColumn>
                <ArticleContainer>
                    <img
                        src="https://via.placeholder.com/600x500.png?text=Placeholder%20to%20push%20content%20down"
                        alt="Fill"
                    />
                </ArticleContainer>
                <RightColumn>
                    <>Right column content</>
                </RightColumn>
            </Flex>
        </Section>
    );
};
RightBorder.story = { name: 'Full right border' };