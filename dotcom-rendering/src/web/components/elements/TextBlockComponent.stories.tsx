import React from 'react';
import { css } from 'emotion';

import { Design, Display, Pillar } from '@guardian/types';
import type { Format } from '@guardian/types';

import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { decidePalette } from '@root/src/web/lib/decidePalette';

const html =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const quotedHtml =
	'<p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const shortHtml =
	'Since its arrival on Netflix last month, The Queen’s Gambit has attracted a staggering <a href="https://www.theguardian.com/tv-and-radio/2020/nov/26/the-queens-gambit-netflix-most-watched-series-hit-chess">62 million</a> viewers – making it the streaming service’s most-watched scripted limited series.';
const differentWrapperTags =
	'<span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p></span>';
const aListHtml =
	'<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat.</li><li>Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</li></ul>';
const badMarkup =
	'<html>\n <head></head>\n <body>\n  <p>In its <a href="https://www.admiral.com/magazine/guides/home/the-jargon-free-guide-to-bicycle-insurance" title="">guide to protecting your bike</a>, the insurer Admiral cites the Kryptonite New York M18 U-lock as being good quality. It costs <a href="http://go.theguardian.com/?id=114047X1572903&amp;url=https%3A%2F%2Fwww.wiggle.co.uk%2Fkryptonite-new-york-m18-u-lock&amp;sref=https://www.theguardian.com/money/2020/jul/18/bike-theft-uk-cycle-sales-best-locks-insurance-bicycle.json?dcr" title="">£82.99 at Wiggle.co.uk</a>. Add a <a href="http://go.theguardian.com/?id=114047X1572903&amp;url=https%3A%2F%2Fwww.wiggle.co.uk%2Fkryptonite-kryptoflex-7-foot-cable-bike-lock%2F&amp;sref=https://www.theguardian.com/money/2020/jul/18/bike-theft-uk-cycle-sales-best-locks-insurance-bicycle.json?dcr" title="">cable</a> for another tenner, so you can loop it through the wheels and secure them, too.</p>\n </body>\n</html>';
const htmlWithDot =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit.<br><span data-dcr-style="bullet"></span> Etiam porta mauris nec sagittis luctus.</p>';

const containerStyles = css`
	max-width: 620px;
	margin: 20px;
`;

export default {
	component: TextBlockComponent,
	title: 'Components/TextBlockComponent',
};

const format: Format = {
	theme: Pillar.News,
	design: Design.Article,
	display: Display.Standard,
};

export const defaultStory = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={html}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
defaultStory.story = { name: 'default' };

export const DropCap = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={html}
				forceDropCap={true}
				format={{
					theme: Pillar.Culture,
					design: Design.Article,
					display: Display.Immersive,
				}}
				palette={decidePalette({
					...format,
					display: Display.Immersive,
					theme: Pillar.Culture,
				})}
				isFirstParagraph={false}
			/>
		</div>
	);
};
DropCap.story = { name: 'with drop cap' };

export const QuotedDropCap = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={quotedHtml}
				forceDropCap={false}
				format={{
					theme: Pillar.Opinion,
					design: Design.Comment,
					display: Display.Standard,
				}}
				palette={decidePalette({
					...format,
					design: Design.Comment,
					theme: Pillar.Opinion,
				})}
				isFirstParagraph={true}
			/>
		</div>
	);
};
QuotedDropCap.story = { name: 'with quoted drop cap' };

export const ShortText = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={shortHtml}
				forceDropCap={true}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
ShortText.story = { name: 'with text less than 200 characters' };

export const NoTags = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={differentWrapperTags}
				forceDropCap={true}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
NoTags.story = { name: 'with no p tags' };

export const FeatureDropCap = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={html}
				forceDropCap={false}
				format={{
					theme: Pillar.Culture,
					design: Design.Feature,
					display: Display.Standard,
				}}
				palette={decidePalette({
					...format,
					design: Design.Feature,
					theme: Pillar.Culture,
				})}
				isFirstParagraph={true}
			/>
		</div>
	);
};
FeatureDropCap.story = { name: 'with design of Feature' };

export const AList = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={aListHtml}
				forceDropCap={true}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
AList.story = { name: 'with a list' };

export const BadMarkup = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={badMarkup}
				forceDropCap={false}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
BadMarkup.story = { name: 'with a bad markup' };

export const SubSupscript = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={
					'<p><strong>P<sub>kj</sub> = (1-r<sub>j</sub>)C<sup>kj</sup> + r<sub>j</sub>(C<sub>kj</sub> + q<sub>kj</sub> - p<sub>kj</sub>)</strong></p><p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>'
				}
				forceDropCap={false}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
SubSupscript.story = { name: 'with a sub and sup' };

export const dotStory = () => {
	return (
		<div className={containerStyles}>
			<TextBlockComponent
				html={htmlWithDot}
				format={{
					theme: Pillar.News,
					design: Design.Article,
					display: Display.Standard,
				}}
				palette={decidePalette(format)}
				isFirstParagraph={false}
			/>
		</div>
	);
};
dotStory.story = { name: 'With Dot' };
