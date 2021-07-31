import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { object, string } from 'yup';
import Form from 'components/Form';
import FormInput from 'components/Input';
import { AppLayout } from 'components/layouts/AppLayout';
import { useFormValidation } from 'utils/form';
import { preloadQuery } from 'lib/apollo';
import { MeDocument, useMeQuery } from 'generated';
import { ThemeSwitch } from 'components/ThemeToggle';

const imageRegex =
	'^https?://(www.|)((a|p)bs.twimg.com/(profile_images|sticky/default_profile_images)/(.*).(jpg|png|jpeg|webp)|avatars.githubusercontent.com/u/[^s]+|github.com/identicons/[^s]+|cdn.discordapp.com/avatars/[^s]+/[^s]+.(jpg|png|jpeg|webp)|api.multiavatar.com)';

export const editAccountSchema = object({
	name: string().required().min(3),
	pictureUrl: string().required().matches(new RegExp(imageRegex)),
});

export default function Account() {
	const { push } = useRouter();
	const { data: user } = useMeQuery();
	// const [submit, { error }] = useEditUserMutation({
	// 	onCompleted: () => push('/app'),
	// });

	const form = useFormValidation({
		schema: editAccountSchema,
	});
	return (
		<AppLayout>
			<div>
				<div className="space-y-4">
					<h2 className="text-xl font-medium">General</h2>
					<ThemeSwitch />
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-medium">Account</h2>
					<Form
						name="Save"
						form={form}
						onSubmit={({ name, pictureUrl }) =>
							// submit({ variables: { name, pictureUrl } })
							{}
						}
						// error={{ title: 'Updating failed', error }}
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
								{...form.register('pictureUrl')}
							/>
						</div>
					</Form>
				</div>
			</div>
		</AppLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
	preloadQuery({ query: MeDocument });
