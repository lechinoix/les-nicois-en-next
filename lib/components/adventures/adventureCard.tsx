import { getCoverPicture } from '~/services/adventureService';
import type { Adventure, Picture } from '~/config/types';
import { useEffect, useState } from 'react';

type PropsType = { adventure: Adventure }

export default ({ adventure }: PropsType) => {
	const [coverPicture, setCoverPicture] = useState<Picture | null>()

	useEffect(() => {
		setCoverPicture(getCoverPicture(adventure))
	}, [adventure])

	return (
		<div className="flex my-5">
			<div className="w-40 h-24 overflow-hidden rounded-xl flex-shrink-0">
				{coverPicture &&
					<img
						className="object-cover w-full"
						src={coverPicture.formats.thumbnail.url}
						alt={coverPicture.alternativeText}
					/>
				}
			</div>
			<div className="ml-3">
				<strong>{adventure.title}</strong>
				{adventure.cotation &&
					<div>Cotation: {adventure.cotation}</div>
				}
				{adventure.orientation &&
					<div>Orientation: {adventure.orientation}</div>
				}
				{adventure.short_description &&
					<p>{adventure.short_description}</p>
				}
			</div>
		</div>
	)
}
