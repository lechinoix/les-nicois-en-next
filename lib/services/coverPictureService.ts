import { PicturePosition } from '~/config/constants';

const DEFAULT_POSITION = 'object-center';

const postitionToStyle = {
	[PicturePosition.CENTER]: DEFAULT_POSITION,
	[PicturePosition.BOTTOM]: 'object-bottom',
	[PicturePosition.LEFT]: 'object-left',
	[PicturePosition.BOTTOM_LEFT]: 'object-left-bottom',
	[PicturePosition.TOP_LEFT]: 'object-left-top',
	[PicturePosition.RIGHT]: 'object-right',
	[PicturePosition.BOTTOM_RIGHT]: 'object-right-bottom',
	[PicturePosition.TOP_RIGHT]: 'object-right-top',
	[PicturePosition.TOP]: 'object-top'
};

export const getCoverPositionStyle = (position: PicturePosition | null): string => {
	if (!position) return DEFAULT_POSITION;
	return postitionToStyle[position];
};
