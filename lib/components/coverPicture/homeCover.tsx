import type { PicturePosition } from '~/config/constants';
import { getCoverPositionStyle } from '~/services/coverPictureService';
import type { Picture } from '~/config/types';

type PropsType = {
	picture: Picture | null;
	position: PicturePosition | null;
}

const chooseFormatUrlFromPicture = (picture: Picture) =>
	picture.formats.xlarge ? picture.formats.xlarge.url : picture.url;

const HomeCover = ({ picture, position = null }: PropsType) => (
	<div className="relative w-full flex bg-gray-400 min-h-80 h-1/3" style={{maxHeight: '35rem'}}>
		<div className="absolute w-full h-full flex justify-end pb-8 pr-10 bg-gray-900 bg-opacity-10 z-10">
			<strong className="block text-white text-3xl text-right font-light self-end">
				Bienvenue sur le blog d&apos;aventures
				<br />
				d&apos;Ambre et Nico !
			</strong>
		</div>
		{picture && (
			<img
				className="w-full max-w-full object-cover"
				style={{ objectPosition: getCoverPositionStyle(position) }}
				src={chooseFormatUrlFromPicture(picture)}
				alt={picture.alternativeText}
			/>
		)}
	</div>
)

export default HomeCover
