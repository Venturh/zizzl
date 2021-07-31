import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { object, string } from 'yup';

import Form from 'components/Form';
import FormInput from 'components/Input';
import { AppLayout } from 'components/layouts/AppLayout';
import { ThemeSwitch } from 'components/ThemeToggle';

import { useFormValidation } from 'utils/form';
import { preloadQuery } from 'lib/apollo';

import { MeDocument, useEditUserMutation, useMeQuery } from 'types/graphql';
import BlockContainer from 'components/BlockContainer';

const imageRegex =
	'^https?://(www.|)((a|p)bs.twimg.com/(profile_images|sticky/default_profile_images)/(.*).(jpg|png|jpeg|webp)|avatars.githubusercontent.com/u/[^s]+|github.com/identicons/[^s]+|cdn.discordapp.com/avatars/[^s]+/[^s]+.(jpg|png|jpeg|webp)|api.multiavatar.com)';

export const editAccountSchema = object({
	name: string().required().min(3),
	image: string().required().matches(new RegExp(imageRegex)),
});

export default function Account() {
	const { push } = useRouter();
	const { data: user } = useMeQuery();
	const [submit, { error }] = useEditUserMutation({
		onCompleted: () => push('/app'),
	});

	const form = useFormValidation({
		schema: editAccountSchema,
	});
	return (
		<AppLayout>
			<BlockContainer title="Settings">
				<div className="space-y-4">
					<h2 className="text-xl font-medium">General</h2>
					<ThemeSwitch />
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-medium">Account</h2>
					<Form
						buttonText="Save"
						form={form}
						onSubmit={({ name, image }) =>
							submit({ variables: { name, image } })
						}
						error={{ title: 'An error occurred', error }}
					>
						<div className="space-y-6">
							<FormInput
								label="Name"
								defaultValue={user?.me?.name ?? undefined}
								type="text"
								autoComplete="text"
								autoFocus
								{...form.register('name')}
							/>
							<FormInput
								label="Github/Discord Avatar URL"
								defaultValue={user?.me?.image ?? undefined}
								type="text"
								{...form.register('image')}
							/>
						</div>
					</Form>
				</div>
			</BlockContainer>
		</AppLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
	preloadQuery({ query: MeDocument });
