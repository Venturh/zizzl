import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

type Props = {
	title: string;
	description?: string;
};

export default function Seo({ title, description = 'No description provided' }: Props) {
	const { asPath } = useRouter();
	const url = `${
		process.env.NODE_ENV !== 'production'
			? 'http://localhost:1337'
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	}${asPath}`;
	return (
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
	);
}
