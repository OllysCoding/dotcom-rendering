import React from 'react';

import { Pillar } from '@guardian/types';

import { Avatar } from './Avatar';

export default {
	component: Avatar,
	title: 'Components/Avatar',
};

const imageSrc173 =
	'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=173&quality=85&auto=format&fit=max&s=be5b0d3f3aa55682e4930057fc3929a3';
const imageSrc300 =
	'https://i.guim.co.uk/img/uploads/2017/10/06/Leah-Harper,-L.png?width=300&quality=85&auto=format&fit=max&s=4530b8769ac9f0b655d77a155ea13852';
const imageSrc300Sport =
	'https://i.guim.co.uk/img/uploads/2018/05/25/Sid_Lowe,_L.png?width=300&quality=85&auto=format&fit=max&s=4e058df05bd09dd029abe3d23bddb27c';

export const defaultStory = () => (
	<div style={{ width: '136px', height: '136px' }}>
		<Avatar
			imageSrc={imageSrc173}
			imageAlt="The alt of the image"
			pillar={Pillar.Opinion}
		/>
	</div>
);
defaultStory.story = { name: 'Medium, Opinion (Rich Links)' };

export const largeStory = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			imageSrc={imageSrc300}
			imageAlt="The alt of the image"
			pillar={Pillar.Lifestyle}
		/>
	</div>
);
largeStory.story = { name: 'Large, Lifestyle (Byline image - Desktop)' };

export const largeStoryNews = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			imageSrc={imageSrc300}
			imageAlt="The alt of the image"
			pillar={Pillar.News}
		/>
	</div>
);
largeStoryNews.story = { name: 'Large, News (Byline image - Desktop)' };

export const largeStoryCulture = () => (
	<div style={{ width: '140px', height: '140px' }}>
		<Avatar
			imageSrc={imageSrc300}
			imageAlt="The alt of the image"
			pillar={Pillar.Culture}
		/>
	</div>
);
largeStoryCulture.story = { name: 'Large, Culture (Byline image - Desktop)' };

export const smallStory = () => (
	<div style={{ width: '60px', height: '60px' }}>
		<Avatar
			imageSrc={imageSrc300Sport}
			imageAlt="The alt of the image"
			pillar={Pillar.Sport}
		/>
	</div>
);
smallStory.story = { name: 'Small, Sport (Byline image - Mobile)' };
