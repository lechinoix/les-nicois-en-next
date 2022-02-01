import type { PicturePosition } from '~/config/constants';
import { getCoverPositionStyle } from '~/services/coverPictureService';
import type { Picture } from '~/config/types';

type PropsType = {
	picture: Picture | null;
	position: PicturePosition | null;
	href: string;
	title: string;
	onClick: (() => void) | null;
}

const chooseFormatUrlFromPicture = (picture: Picture) =>
	picture.formats.medium ? picture.formats.medium.url : picture.url;

export default ({ picture,	position = null,	href = '#',	title = '',	onClick }: PropsType) => (
	<a
		href={href}
		onClick={onClick || (() => null)}
		className="
			block relative w-full h-full
			overflow-hidden bg-gray-300
		"
	>
		<div
			className="
					absolute w-full h-full
					flex justify-center
					bg-gray-900 bg-opacity-20
					px-5
				"
		>
			<strong className="block text-white font-bold text-2xl text-center self-center">
				{title}
			</strong>
		</div>
		{picture &&
			<img
				className={`object-cover ${getCoverPositionStyle(position)} h-full w-full`}
				src={chooseFormatUrlFromPicture(picture)}
				alt={picture.alternativeText}
			/>
		}
	</a>
)