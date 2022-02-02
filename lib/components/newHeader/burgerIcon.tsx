import React from "react"

type PropsType = {
	isOpen: boolean,
	onClick: (el: any) => void,
	ratio: number
}

const BurgerIcon = React.forwardRef<HTMLButtonElement, PropsType>((({ isOpen = false, ratio = 3, onClick }, ref) => (
	<button ref={ref} className={`burger-icon ${isOpen ? 'opened' : ''}`} onClick={onClick} style={{'--ratio': ratio} as React.CSSProperties}>
		<span />
		<span />
		<span />
	</button>
)))

BurgerIcon.displayName = 'BurgerIcon'

export default BurgerIcon
