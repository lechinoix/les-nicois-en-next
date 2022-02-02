import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren<{}>) => (
	<div className="my-5 container mx-auto max-w-4xl px-5">
		{children}
	</div>
)

export default Container
