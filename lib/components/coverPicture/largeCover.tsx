import type { PicturePosition } from '~/config/constants';
import { getCoverPositionStyle } from '~/services/coverPictureService';
import type { Picture } from '~/config/types';
import Image from 'next/image';

const EMPTY_HREF = '#';

type PropsType = {
	picture: Picture | null;
	position: PicturePosition | null;
	title: string;
	href?: string;
	onClick?: (() => void)| null;
	priority?: boolean;
}

const chooseFormatUrlFromPicture = (picture: Picture) =>
	picture.formats.xlarge ? picture.formats.xlarge.url : picture.url;


const LargeCover = ({ picture, position = null, title = '', href = EMPTY_HREF, onClick, priority = false }: PropsType) => (
	<a
		href={href}
		onClick={onClick || (() => null)}
		className={`relative w-full h-96 flex bg-gray-400 ${
			href === EMPTY_HREF && onClick !== null ? 'cursor-default' : 'cursor-pointser'
		}`}
	>
		<div className="absolute w-full h-full flex justify-center z-10">
			<strong
				className="
						block text-white text-5xl text-center
						py-3 px-2 self-center
						bg-gray-900 bg-opacity-10 bg-clip-border
						border-t-2 border-b-2 border-white
					"
			>
				{title}
			</strong>
		</div>
		{picture &&
			<Image
				layout="fill"
				objectPosition={getCoverPositionStyle(position)}
				objectFit="cover"
				src={chooseFormatUrlFromPicture(picture)}
				alt={picture.alternativeText}
				priority={priority}
				className="z-0"
			/>
		}
	</a>
)

export default LargeCover
