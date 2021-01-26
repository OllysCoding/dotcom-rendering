import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
	it('gets the correct zindex for group and sibling', () => {
		expect(getZIndex('stickyAdWrapper')).toBe('z-index: 9;');
		expect(getZIndex('headerWrapper')).toBe('z-index: 8;');
		expect(getZIndex('headerLinks')).toBe('z-index: 7;');
		expect(getZIndex('TheGuardian')).toBe('z-index: 6;');
		expect(getZIndex('articleHeadline')).toBe('z-index: 5;');
		expect(getZIndex('immersiveBlackBox')).toBe('z-index: 4;');
		expect(getZIndex('bodyArea')).toBe('z-index: 3;');
		expect(getZIndex('rightColumnArea')).toBe('z-index: 2;');
		expect(getZIndex('mainMedia')).toBe('z-index: 1;');
	});
});
