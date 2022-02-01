import config from '~/config/env';
import { nanoid } from 'nanoid';
import type { Comment } from '~/config/types';

type CommentPayload = {
	name: string;
	mail: string;
	content: string;
	adventureId: number;
};

const formatCommentPayloadFromAdventureForm = (input: CommentPayload) => ({
	authorId: nanoid(),
	authorName: input.name,
	authorEmail: input.mail,
	content: input.content,
	related: [
		{
			refId: input.adventureId,
			ref: 'adventure',
			field: 'comments'
		}
	]
});

export const postComment = async (input: CommentPayload): Promise<Comment> => {
	const res = await fetch(`${config.BASE_API_URL}/comments/adventure:${input.adventureId}`, {
		method: 'POST',
		body: JSON.stringify(formatCommentPayloadFromAdventureForm(input)),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!res.ok) throw new Error(res.statusText);

	return await res.json();
};

export const reportComment = async (adventureId: number, commentId: string): Promise<boolean> => {
	const res = await fetch(
		`${config.BASE_API_URL}/comments/adventure:${adventureId}/comment/${commentId}/report-abuse`,
		{
			method: 'POST',
			body: JSON.stringify({
				reason: 'OTHER',
				content: 'Asked for deletion'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	if (!res.ok) throw new Error(res.statusText);

	return await res.json();
};
