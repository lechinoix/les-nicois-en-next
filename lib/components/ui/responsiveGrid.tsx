type PropsType = { items: { component: any; props: any; key: string }[] };

const ResponsiveGrid = ({ items }: PropsType) => (
	<div className="grid gap-4 md:grid-cols-3">
		{items.map(item => (
			<div className="relative" style={{ paddingBottom: '50%' }} key={item.key}>
				<div className="absolute w-full h-full">
					<item.component {...item.props} />
				</div>
			</div>
		))}
	</div>
)

export default ResponsiveGrid
