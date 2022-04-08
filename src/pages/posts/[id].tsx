import Link from 'next/link';
import { GetServerSideProps } from 'next';

import AppLayout from 'components/layouts/AppLayout';
import Button from 'components/ui/Button';

import { preloadAuthenticatedRoute } from 'utils/redirects';
import { PostDocument, usePostQuery } from 'types/graphql';
import { useRouter } from 'next/router';

export default function Posts() {
	const { query } = useRouter();
	const id = query.id as string;
	const {
		data: { post },
	} = usePostQuery({ variables: { id } });

	return (
		<AppLayout title="Posts">
			<div className="divide-y-2 divide-accent-primary ">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl tracking-tight font-extrabold text-primary sm:text-4xl">
						{post.title}
					</h2>
				</div>
				<div className="mt-6 pt-6  text-secondary">
					<p>{post.text}</p>
				</div>
			</div>
		</AppLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.params;
	return await preloadAuthenticatedRoute(ctx, {
		query: PostDocument,
		variables: { id },
	});
};
