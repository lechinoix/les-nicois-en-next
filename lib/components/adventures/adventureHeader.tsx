	import type { Adventure } from '~/config/types';
	import { CoverTypes, iconFillColor } from '~/config/constants';
	import AdventureCover from '~/components/adventures/adventureCover';
	import PictoSport from '../picto/pictoSport';
	import Picto from '../picto/index';
	import StrongArm from '../icons/various/strength';
	import Container from '~/components/container';
	import Mountain from '../icons/various/mountain';
	import SandClock from '../icons/various/sandClock';
	import Compass from '../icons/various/compass';
import { PropsWithChildren } from 'react';

	type PropsType = PropsWithChildren<{
		adventure: Adventure;
		onClick?: (() => void);
	}>

const AdventureHeader = ({ adventure, onClick = () => null, children }: PropsType) => (
	<div>
		<AdventureCover adventure={adventure} onClick={onClick} coverType={CoverTypes.LARGE} />
		<Container>
			<div className="flex flex-col justify-center py-7">
				<div className="flex flex-wrap gap-y-7 justify-center">
					{adventure?.places?.length > 0 &&
						<Picto label={adventure.places[0].name}>
							<Mountain fill={iconFillColor} />
						</Picto>
					}
					{adventure?.sports?.length > 0 &&
						<Picto label={adventure.sports[0].name}>
							<PictoSport sportSlug={adventure.sports[0].slug} fill={iconFillColor} />
						</Picto>
					}
					{adventure?.cotation &&
						<Picto label={adventure.cotation}>
							<StrongArm fill={iconFillColor} />
						</Picto>
					}
					{adventure?.number_of_days &&
						<Picto label={`${adventure.number_of_days} jour(s)`}>
							<SandClock fill={iconFillColor} />
						</Picto>
					}
					{adventure?.orientation &&
						<Picto label={adventure.orientation}>
							<Compass fill={iconFillColor} />
						</Picto>
					}
				</div>
				{children}
			</div>
		</Container>
	</div>
)

export default AdventureHeader
