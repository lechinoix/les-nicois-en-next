type PropsType = {
	color: string;
	url: string;
	label: string;
}

export default ({ color, url, label }: PropsType) => (
	<a href={url} className={`bg-${color} px-5 py-2 text-white inline-block rounded`} aria-current="page">
		{label}
	</a>
)
