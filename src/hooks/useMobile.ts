import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 1024;

function getIsMobile() {
	if (typeof window !== 'undefined') {
		const width = window.innerWidth;
		return width ? width < DESKTOP_BREAKPOINT : undefined;
	} else return undefined;
}

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(getIsMobile());

	useEffect(() => {
		const handleWindowResize = () => setIsMobile(getIsMobile());
		if (!window) handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return isMobile;
}

export default useIsMobile;
