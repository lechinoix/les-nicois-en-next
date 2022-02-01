	import type { PicturePosition } from '~/config/constants';
	import { getCoverPositionStyle } from '~/services/coverPictureService';
	import type { Picture } from '~/config/types';

	const EMPTY_HREF = '#';

	type PropsType = {
		picture: Picture | null;
		position: PicturePosition | null;
		title: string;
		href?: string;
		onClick?: (() => void)| null
	}

	const chooseFormatUrlFromPicture = (picture: Picture) =>
		picture.formats.xlarge ? picture.formats.xlarge.url : picture.url;


export default ({ picture, position = null, title = '', href = EMPTY_HREF, onClick }: PropsType) => (
	<a
		href={href}
		onClick={onClick || (() => null)}
		className={`relative w-full h-96 flex bg-gray-400 ${
			href === EMPTY_HREF && onClick !== null ? 'cursor-default' : 'cursor-pointser'
		}`}
	>
		<div className="absolute w-full h-full flex justify-center">
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
			<img
				className={`w-full max-w-full object-cover ${getCoverPositionStyle(position)}`}
				src={chooseFormatUrlFromPicture(picture)}
				alt={picture.alternativeText}
			/>
		}
	</a>
)
