import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	id?: string;
	children: React.ReactElement;
};

export default function MobilePortal({ id = 'mobile-side', children }: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return mounted ? (
		<>
			<div className="hidden lg:block">{children}</div>
			<div className="lg:hidden">{createPortal(children, document.getElementById(id))}</div>
		</>
	) : null;
}
