
import { postComment } from '~/services/commentService';
import type { Comment } from '~/config/types';
// import { form, field } from 'svelte-forms';
// import { email, required } from 'svelte-forms/validators';

type PropsType = {
	adventureId: number;
	onSuccess: (comment: Comment) => void;
}

export default ({ adventureId, onSuccess }: PropsType) => {
	// const name = field('name', '', [required()]);
	// const emailInput = field('emailInput', '', [email(), required()]);
	// const content = field('content', '', [required()]);
	// const commentForm = form(name, emailInput, content);

	// let errorOnSave = false;

	// const formatPayloadFromForm = () => ({
	// 	name: $name.value,
	// 	mail: $emailInput.value,
	// 	content: $content.value,
	// 	adventureId
	// });

	// const submitForm = async () => {
	// 	errorOnSave = false;
	// 	await commentForm.validate();
	// 	if (!$commentForm.valid) return;

	// 	try {
	// 		const comment = await postComment(formatPayloadFromForm());
	// 		onSuccess(comment);
	// 	} catch (e) {
	// 		console.error(e);
	// 		errorOnSave = true;
	// 	}
	// };

	return (
		<section className="flex flex-col items-start">
			{/* <label for="name">Name</label>
			{#if $commentForm.hasError('name.required')}
				<div className="text-red-600 text-sm">Entrez votre nom / prénom (ou pseudo)</div>
			{/if}
			<input type="text" bind:value={$name.value} id="name" className="border mb-5" />
			<label for="email">Email</label>
			{#if $commentForm.hasError('emailInput.not_an_email') || $commentForm.hasError('emailInput.required')}
				<div className="text-red-600 text-sm">L'email est obligatoire</div>
			{/if}
			<input type="email" bind:value={$emailInput.value} id="email" className="border mb-5" />
			<label for="content">Votre commentaire</label>
			{#if $commentForm.hasError('content.required')}
				<div className="text-red-600 text-sm">Le texte ne peut pas être vide</div>
			{/if}
			<textarea bind:value={$content.value} id="content" className="border mb-5" />

			{#if errorOnSave}
				<div className="text-red-600 text-sm">Une erreur est survenue, réssayez plus tard</div>
			{/if}
			<button on:click={submitForm} className="border px-5 py-2 bg-gray-200">Send</button> */}
		</section>
	)
}
