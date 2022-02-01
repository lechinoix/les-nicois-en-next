	import { iconFillColor } from '~/config/constants';

	type PropsType = React.PropsWithChildren<{ label: string }>;

	export default ({ label = '', children }: PropsType) => (
		<div className="flex flex-col items-center flex-shrink-0 w-16 mx-5 md:mx-10" style={{maxWidth: '5rem'}}>
			<div className="h-10 w-10 md:w-14 md:h-14">
				{children}
			</div>
			<p className="pt-2 text-xs text-center font-sans" style={{color: iconFillColor}}>{label}</p>
		</div>
	)
