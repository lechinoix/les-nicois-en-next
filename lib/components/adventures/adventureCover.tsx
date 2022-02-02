import { CoverTypes } from '~/config/constants';
import LargeCover from '../coverPicture/largeCover';
import HomeCover from '../coverPicture/homeCover';
import SmallCover from '../coverPicture/smallCover';
import type { Adventure } from '~/config/types';
import { ROUTES } from '~/config/routes';
import { slugify } from '~/utils/string';
import { getCoverPicture } from '~/services/adventureService';

const mapTypeToComponent = {
	[CoverTypes.LARGE]: LargeCover,
	[CoverTypes.HOME]: HomeCover,
	[CoverTypes.SMALL]: SmallCover
};

type PropsType = {
	adventure: Adventure;
	coverType: CoverTypes;
	onClick?: (() => void) | null;
}

const AdventureCover = ({ adventure, coverType = CoverTypes.LARGE, onClick = null }: PropsType) => {
	const position = adventure.cover_picture?.position;
	const picture = getCoverPicture(adventure);
	const title = adventure.title;
	const href = onClick !== null
			? ''
			: `${ROUTES.ADVENTURES.BY_ID}${adventure.id}_${slugify(adventure.title)}`

	const CoverTypeComponent = mapTypeToComponent[coverType];

	return (
		<CoverTypeComponent picture={picture} position={position} title={title} href={href} onClick={onClick} />
	)
}

export default AdventureCover
