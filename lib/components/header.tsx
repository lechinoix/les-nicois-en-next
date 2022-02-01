import { ROUTES } from '~/config/routes';
import Dropdown from './ui/dropdown';
import type { Sport } from '~/config/types';
import PictoSport from './picto/pictoSport';
import { iconFillColor } from '~/config/constants';

type PropsType = { sports: Sport[] }

export default ({ sports }: PropsType) => (
	<nav
		className="fixed bg-white h-20 flex items-center z-10 mx-auto w-full px-10 shadow-lg justify-between"
	>
		<a href={ROUTES.HOME} className="block">
			<span className="text-2xl font-extralight whitespace-nowrap"> Our Little Adventures </span>
		</a>
		<Dropdown title="Sports">
			{!!sports && sports.map((sport: Sport) => (
				<a
					href={`/sport/${sport.slug}`}
					className="flex text-gray-800 block px-4 py-2 text-sm justify-start items-center hover:bg-gray-100"
					role="menuitem"
				>
					<div className="w-7 h-7 rounded-full border border-gray-300 p-1 flex justify-center mr-2">
						<PictoSport sportSlug={sport.slug} fill={iconFillColor} />
					</div>
					<p>{sport.name}</p>
				</a>
			))}
		</Dropdown>
	</nav>
)
