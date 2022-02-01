import { LoaderFunction, useLoaderData } from 'remix';
import { getAdventureById } from '~/services/adventureService';
import { extractIdAndSlug } from '~/utils/url';
import Container from '~/components/container';
import type { Adventure, Comment } from '~/config/types';
import AdventurePage, { links as adventurePageLinks } from './_components/adventurePage';
import CommentForm from '~/components/comments/commentForm';
import CommentBox from '~/components/comments/commentBox';
import uniqBy from 'lodash/uniqBy.js';
import { useEffect, useState } from 'react';

type LoaderDataType = {
	adventure: Adventure;
}

export const links = adventurePageLinks;

export const loader: LoaderFunction = async ({ params }): Promise<LoaderDataType> => {
	if (!params.fullId) throw new Error('Could not find fullId url param')

	const { id } = extractIdAndSlug(params.fullId)
	const adventure = await getAdventureById(id);
	return { adventure }
}


export default () => {
	const { adventure } = useLoaderData<LoaderDataType>()

	const [comments, setComments] = useState<Comment[]>([]);
	const [isCreatingComment, setIsCreatingComment] = useState<boolean>(false);

	useEffect(() => {
		setComments(uniqBy([...comments, ...adventure.comments], 'id').filter(
			(comment: Comment) => !comment.blocked
		))
	}, [adventure])

	const openCommentCreation = () => {
		setIsCreatingComment(true);
	};

	const onCommentSave = (comment: Comment) => {
		setIsCreatingComment(false);
		setComments([...comments, comment]);
	};

		return (
		<>
			<AdventurePage adventure={adventure} />
			<Container>
				<div className="w-full mt-10">
					<h2 className="text-2xl">Commentaires</h2>
					{comments.length > 0 &&
						<>
							{comments.map(comment => (
								<div className="my-5">
									<CommentBox comment={comment} adventureId={adventure.id} />
								</div>
							))}
						</>
					}
					{!isCreatingComment ?
						<button
							className="block px-3 py-2 border border-gray-600 text-gray-600 rounded-md mt-5"
							onClick={openCommentCreation}>Commenter</button
						>
					:
						<CommentForm adventureId={adventure.id} onSuccess={onCommentSave} />
					}
				</div>
			</Container>
		</>
	)
}
