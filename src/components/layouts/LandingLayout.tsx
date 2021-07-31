import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Navigation from '../Navigation';

type Props = {
	children: React.ReactNode;
	title: string;
	description: string;
};

export default function LandingLayout({ title, description, children }: Props) {
	const { asPath } = useRouter();
	const url = `${
		process.env.NODE_ENV !== 'production'
			? 'http://localhost:1337'
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	}${asPath}`;
	return (
		<>
			<NextSeo
				title={title}
				description={description}
				canonical={url}
				twitter={{
					cardType: 'summary_large_image',
					handle: 'venturh94',
					site: 'venturh94',
				}}
				openGraph={{
					title,
					description,
					url,

					type: 'website',
				}}
			/>
			<main className="mx-auto space-y-6 text-base lg:text-lg ">
				<Navigation />
				<div className="flex flex-col flex-auto w-full h-full max-w-sm mx-auto lg:max-w-5xl">
					{children}
				</div>
			</main>
		</>
	);
}
