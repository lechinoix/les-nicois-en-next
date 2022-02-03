import type { Sport } from '~/config/types';
import { ROUTES } from '~/config/routes';
import BurgerIcon from './burgerIcon';
import { useCallback, useEffect, useRef, useState } from 'react';

import './NewHeader.module.css';
import Image from 'next/image';

type PropsType = { sports: Sport[] };

const NewHeader = ({ sports }: PropsType) => {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null)

	const toggleMenu = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const closeMenu = (event: Event) => {
		if (event.target instanceof Element && buttonRef?.current !== null && buttonRef.current.contains(event.target)) return;
		setIsOpen(false);
	};

	useEffect(() => {
    document.body.addEventListener("click", closeMenu);

    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, []);

	return (
		<nav className="absolute bg-linear-b-w py-5 z-10 mx-auto w-full px-5" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.5) 95%, rgba(0, 0, 0, 0))'}}>
			<div className="flex justify-between items-center">
				<a href={ROUTES.HOME} className="flex items-center">
					<Image width="45rem" height="38rem" src="/img/les-nicois.png" alt="Un dessin d'Ambre et Nicolas grimpant" />
					<span className="text-2xl text-white font-extralight ml-4"> Les Niçois en Vadrouille </span>
				</a>
				<BurgerIcon isOpen={isOpen} onClick={toggleMenu} ratio={3} ref={buttonRef} />
			</div>
			<div className="flex flex-col items-end">
				{isOpen && (
					<div className="pt-3">
						{sports.map(sport => (
							<a
								href={`/sport/${sport.slug}`}
								className="flex text-white px-4 py-2 text-sm justify-start items-center uppercase"
								role="menuitem"
								key={sport.id}
							>
								<p>{sport.name} ({sport.adventures.length})</p>
							</a>
						))}
					</div>
				)}
			</div>
		</nav>
	)
}

export default NewHeader
