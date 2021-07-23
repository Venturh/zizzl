import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import { ThemeProvider } from 'next-themes';

import '../globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}
export default MyApp;
