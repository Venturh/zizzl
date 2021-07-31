import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from 'lib/apollo';

import '../../public/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialClientState);
	return (
		<Provider session={pageProps.session}>
			<ApolloProvider client={client}>
				<ThemeProvider attribute="class">
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</Provider>
	);
}
export default MyApp;
