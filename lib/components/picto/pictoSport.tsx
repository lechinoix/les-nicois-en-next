import { Sports } from '~/config/constants';
import HikeBoot from '../icons/sport/hikeBoot';
import RockClimbing from '../icons/sport/rockClimbing';
import SkiBoot from '../icons/sport/skiBoot';

const DEFAULT_ICON = HikeBoot;

const sportToPicto = {
	[Sports.HIKING]: HikeBoot,
	[Sports.ALPINISM]: RockClimbing,
	[Sports.SPELEO]: RockClimbing,
	[Sports.SKI_ALPIN]: SkiBoot,
	[Sports.ESCALADE_COUENNE]: RockClimbing,
	[Sports.ESCALADE_GRANDE_VOIE]: RockClimbing,
	[Sports.SKI_DE_RANDO]: SkiBoot
};


type PropsType = {
	sportSlug: Sports;
	fill: string;
}

export default ({ sportSlug, fill = '' }: PropsType) => {
	const Picto = sportToPicto.hasOwnProperty(sportSlug) ? sportToPicto[sportSlug] : DEFAULT_ICON;

	return (
		<Picto fill={fill} />
	)
}

