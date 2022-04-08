import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { object, string } from 'zod';

import Form from 'components/ui/Form';
import FormInput from 'components/ui/Input';
import AppLayout from 'components/layouts/AppLayout';
import ThemeSwitch from 'components/ui/ThemeToggle';

import { useFormValidation } from 'hooks/useForm';
import { preloadQuery } from 'lib/apollo';

import { MeDocument, useEditUserMutation, useMeQuery } from 'types/graphql';

const imageRegex =
	'^https?://(www.|)((a|p)bs.twimg.com/(profile_images|sticky/default_profile_images)/(.*).(jpg|png|jpeg|webp)|avatars.githubusercontent.com/u/[^s]+|github.com/identicons/[^s]+|cdn.discordapp.com/avatars/[^s]+/[^s]+.(jpg|png|jpeg|webp)|api.multiavatar.com)';

export const editAccountSchema = object({
	name: string().nonempty().min(3),
	image: string().regex(new RegExp(imageRegex)).nonempty(),
});

export default function Account() {
	const { push } = useRouter();
	const { data: user } = useMeQuery();
	const [submit, { error }] = useEditUserMutation({
		onCompleted: () => push('/dashboard'),
	});

	const form = useFormValidation({
		schema: editAccountSchema,
	});
	return (
		<AppLayout title="Settings">
			<div className="flex flex-col w-full max-w-md p-3 mx-auto space-y-3 rounded-md shadow-sm dark:shadow-none bg-secondary ring ring-accent-primary">
				<div className="space-y-4">
					<h2 className="text-xl font-medium">General</h2>
					<ThemeSwitch />
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-medium">Account</h2>
					<Form
						submitButtonText="Save"
						form={form}
						onSubmit={({ name, image }) => submit({ variables: { name, image } })}
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
			</div>
		</AppLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
	preloadQuery(ctx, { query: MeDocument });
