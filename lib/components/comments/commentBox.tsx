import { reportComment } from '~/services/commentService';
import type { Comment } from '~/config/types';
import { formatFrenchDate } from '~/utils/date';
import { useEffect, useState } from 'react';

type PropsType = {
	comment: Comment;
	adventureId: number;
}

const CommentBox = ({ comment, adventureId }: PropsType) => {
	const [initials, setInitials] = useState<string>()
	useEffect(() => {
		setInitials(comment.authorName
			.split(' ')
			.slice(0, 2)
			.map((word) => word.charAt(0).toUpperCase())
			.join('')
		)
	}, [comment])

	const [reportSucceeded, setReportSucceeded] = useState<boolean>(false);
	const [reportFailed, setReportFailed] = useState<boolean>(false);

	const reportCommentAction = async () => {
		setReportFailed(false);
		setReportSucceeded(false);
		try {
			await reportComment(adventureId, comment.id);
			setReportSucceeded(true);
		} catch (e) {
			console.error(e);
			setReportFailed(true);
		}
	};

	return (
		<>
			<div className="flex h-8">
				<div className="text-l w-8 h-8 flex items-center justify-center border border-gray-300">
					{initials}
				</div>
				<div className="bg-gray-300 flex justify-between items-center flex-grow px-2 text-gray-500 text-xs">
					<div>{comment.authorName}</div>
					<div>{formatFrenchDate(comment.created_at)}</div>
				</div>
			</div>
			<div className="flex mx-4 my-3 flex-col">
				<p>{comment.content}</p>
				<button onClick={reportCommentAction} className="text-gray-400 text-xs self-start mt-2"
					>Demander la suppression</button
				>
				{reportSucceeded &&
					<p className="text-xs text-green-600">Votre demande a été prise en compte</p>
				}
				{reportFailed &&
					<p className="text-xs text-red-600">Votre demande n&apos;a pas pu être prise en compte</p>
				}
			</div>
		</>
	)
}

export default CommentBox
