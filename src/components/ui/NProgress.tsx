import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nprogress from 'nprogress';

export default function NProgress() {
	const router = useRouter();

	useEffect(() => {
		const delay = 500;
		let timer: NodeJS.Timer;
		const load = () => {
			timer = setTimeout(function () {
				nprogress.start();
			}, delay);
		};
		const stop = () => {
			clearTimeout(timer);
			nprogress.done();
		};
		router.events.on('routeChangeStart', () => load());
		router.events.on('routeChangeComplete', () => stop());
		router.events.on('routeChangeError', () => stop());
	}, [router.events]);

	return null;
}
