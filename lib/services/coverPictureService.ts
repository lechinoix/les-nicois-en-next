import { PicturePosition } from '~/config/constants';

const DEFAULT_POSITION = 'center center';

const postitionToStyle = {
	[PicturePosition.CENTER]: DEFAULT_POSITION,
	[PicturePosition.BOTTOM]: 'center bottom',
	[PicturePosition.LEFT]: 'left center',
	[PicturePosition.BOTTOM_LEFT]: 'left bottom',
	[PicturePosition.TOP_LEFT]: 'left top',
	[PicturePosition.RIGHT]: 'right center',
	[PicturePosition.BOTTOM_RIGHT]: 'right bottom',
	[PicturePosition.TOP_RIGHT]: 'right top',
	[PicturePosition.TOP]: 'center top'
};

export const getCoverPositionStyle = (position: PicturePosition | null): string => {
	if (!position) return DEFAULT_POSITION;
	return postitionToStyle[position];
};
