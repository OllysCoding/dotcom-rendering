import { Display, Design, Special, Pillar } from '@guardian/types';
import type { Format } from '@guardian/types';
import {
	neutral,
	text,
	specialReport,
	opinion,
	brandAltBackground,
	border,
} from '@guardian/src-foundations';

import { pillarPalette } from '@root/src/lib/pillars';

const WHITE = neutral[100];
const BLACK = text.primary;

const textHeadline = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	switch (format.display) {
		case Display.Immersive:
			switch (format.design) {
				case Design.PrintShop:
					return BLACK;
				default:
					return WHITE;
			}
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Review:
				case Design.Recipe:
				case Design.Feature:
					return pillarPalette[format.theme].dark;
				case Design.Interview:
					return WHITE;
				default:
					return BLACK;
			}
		}
		default:
			return BLACK;
	}
};

const textSeriesTitle = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	switch (format.display) {
		case Display.Immersive:
			return WHITE;
		case Display.Showcase:
		case Display.Standard:
			switch (format.design) {
				case Design.MatchReport:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return BLACK;
	}
};

const textSectionTitle = textSeriesTitle;

const textByline = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	switch (format.display) {
		case Display.Immersive:
			return WHITE;
		case Display.Showcase:
		case Display.Standard:
			switch (format.design) {
				case Design.Interview:
					return BLACK;
				default:
					return pillarPalette[format.theme].main;
			}
		default:
			return pillarPalette[format.theme].main;
	}
};

const textTwitterHandle = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textCaption = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	switch (format.design) {
		case Design.PhotoEssay:
			return pillarPalette[format.theme].dark;
		default:
			return text.supporting;
	}
};

const textCaptionLink = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const textSubMeta = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return pillarPalette[format.theme].main;
};

const textSubMetaLabel = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textSubMetaLink = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return text.supporting;
};

const textSyndicationButton = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return text.supporting;
};

const textArticleLink = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[400];
	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const textArticleLinkHover = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	switch (format.theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
			return pillarPalette[format.theme].dark;
		default:
			return pillarPalette[format.theme].main;
	}
};

const backgroundArticle = (format: Format): string => {
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === Design.Comment) return opinion[800];
	if (format.theme === Special.SpecialReport) return specialReport[800];
	return 'transparent';
};

const backgroundSeriesTitle = (format: Format): string => {
	if (format.theme === Special.SpecialReport)
		return brandAltBackground.primary;
	switch (format.display) {
		case Display.Immersive:
			return pillarPalette[format.theme].main;
		case Display.Showcase:
		case Display.Standard:
		default:
			return 'transparent';
	}
};

const backgroundSectionTitle = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			return pillarPalette[format.theme].main;
		case Display.Showcase:
		case Display.Standard:
		default:
			return 'transparent';
	}
};

const backgroundAvatar = (format: Format): string => {
	switch (format.theme) {
		case Special.SpecialReport:
			return specialReport[800];
		case Pillar.Opinion:
			return pillarPalette[Pillar.Opinion].main;
		default:
			return pillarPalette[format.theme].bright;
	}
};

const fillCommentCount = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillShareIcon = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const fillCaptionTriangle = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[300];
	return pillarPalette[format.theme].main;
};

const borderSyndicationButton = (): string => {
	return border.secondary;
};

const borderSubNav = (format: Format): string => {
	return pillarPalette[format.theme].main;
};

const borderArticleLink = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[400];
	return border.secondary;
};

const borderArticleLinkHover = (format: Format): string => {
	if (format.theme === Special.SpecialReport) return specialReport[100];
	return pillarPalette[format.theme].main;
};

export const decidePalette = (format: Format): Palette => {
	return {
		text: {
			headline: textHeadline(format),
			seriesTitle: textSeriesTitle(format),
			sectionTitle: textSectionTitle(format),
			byline: textByline(format),
			twitterHandle: textTwitterHandle(format),
			caption: textCaption(format),
			captionLink: textCaptionLink(format),
			subMeta: textSubMeta(format),
			subMetaLabel: textSubMetaLabel(format),
			subMetaLink: textSubMetaLink(format),
			syndicationButton: textSyndicationButton(format),
			articleLink: textArticleLink(format),
			articleLinkHover: textArticleLinkHover(format),
		},
		background: {
			article: backgroundArticle(format),
			seriesTitle: backgroundSeriesTitle(format),
			sectionTitle: backgroundSectionTitle(format),
			avatar: backgroundAvatar(format),
		},
		fill: {
			commentCount: fillCommentCount(format),
			shareIcon: fillShareIcon(format),
			captionTriangle: fillCaptionTriangle(format),
		},
		border: {
			syndicationButton: borderSyndicationButton(),
			subNav: borderSubNav(format),
			articleLink: borderArticleLink(format),
			articleLinkHover: borderArticleLinkHover(format),
		},
	};
};