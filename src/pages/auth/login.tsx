import { GetServerSideProps } from 'next';
import { NextAuthOptions } from 'next-auth';
import { signIn } from 'next-auth/react';
import z from 'zod';

import LandingLayout from 'components/layouts/LandingLayout';
import Form from 'components/ui/Form';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import { unauthenticatedRoute } from 'utils/redirects';
import { useFormValidation } from 'hooks/useForm';
import { useMeQuery } from 'types/graphql';

const title = 'Sign in';
const description = 'Welcome back.';

const loginSchema = z.object({
	email: z.string().nonempty().email(),
});

function Login({}: NextAuthOptions) {
	const form = useFormValidation({
		schema: loginSchema,
	});

	const { data } = useMeQuery();

	return (
		<LandingLayout title={title} description={description}>
			<div className="w-full max-w-md pt-12 m-auto space-y-4">
				<div className="flex flex-col w-full max-w-sm p-3 mx-auto space-y-3 rounded-lg shadow-sm ring dark:shadow-none bg-secondary ring-accent-primary">
					<div className="space-y-2">
						<h1 className="text-5xl font-semibold">{title}</h1>
						<h2 className="text-2xl text-secondary">{description}</h2>
					</div>
					<Form
						name="login"
						submitButtonText="Login"
						form={form}
						onSubmit={({ email }) => signIn('email', { email })}
						disabled={true}
					>
						<Input
							disabled
							label="Email"
							type="email"
							autoComplete="email"
							{...form.register('email')}
						/>
					</Form>

					<div className="relative mt-6">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-accent-primary"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 text-secondary">Or continue with</span>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<Button
							className="w-full"
							variant="outline"
							onClick={() => signIn('github', { callbackUrl: '/portfolio' })}
						>
							<div className="inline-flex space-x-4">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
									<path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
								</svg>
								<span>Sign in with Github</span>
							</div>
						</Button>
						<Button
							className="w-full"
							variant="outline"
							onClick={() => signIn('discord', { callbackUrl: '/portfolio' })}
						>
							<div className="inline-flex space-x-4">
								<svg
									className="w-5 h-5"
									viewBox="0 0 71 71"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M60.1045 13.8978C55.5792 11.8214 50.7265 10.2916 45.6527 9.41542C45.5603 9.39851 45.468 9.44077 45.4204 9.52529C44.7963 10.6353 44.105 12.0834 43.6209 13.2216C38.1637 12.4046 32.7345 12.4046 27.3892 13.2216C26.905 12.0581 26.1886 10.6353 25.5617 9.52529C25.5141 9.44359 25.4218 9.40133 25.3294 9.41542C20.2584 10.2888 15.4057 11.8186 10.8776 13.8978C10.8384 13.9147 10.8048 13.9429 10.7825 13.9795C1.57795 27.7309 -0.943561 41.1443 0.293408 54.3914C0.299005 54.4562 0.335386 54.5182 0.385761 54.5576C6.45866 59.0174 12.3413 61.7249 18.1147 63.5195C18.2071 63.5477 18.305 63.5139 18.3638 63.4378C19.7295 61.5728 20.9469 59.6063 21.9907 57.5383C22.0523 57.4172 21.9935 57.2735 21.8676 57.2256C19.9366 56.4931 18.0979 55.6 16.3292 54.5858C16.1893 54.5041 16.1781 54.304 16.3068 54.2082C16.679 53.9293 17.0513 53.6391 17.4067 53.3461C17.471 53.2926 17.5606 53.2813 17.6362 53.3151C29.2558 58.6202 41.8354 58.6202 53.3179 53.3151C53.3935 53.2785 53.4831 53.2898 53.5502 53.3433C53.9057 53.6363 54.2779 53.9293 54.6529 54.2082C54.7816 54.304 54.7732 54.5041 54.6333 54.5858C52.8646 55.6197 51.0259 56.4931 49.0921 57.2228C48.9662 57.2707 48.9102 57.4172 48.9718 57.5383C50.038 59.6034 51.2554 61.5699 52.5959 63.435C52.6519 63.5139 52.7526 63.5477 52.845 63.5195C58.6464 61.7249 64.529 59.0174 70.6019 54.5576C70.6551 54.5182 70.6887 54.459 70.6943 54.3942C72.1747 39.0791 68.2147 25.7757 60.1968 13.9823C60.1772 13.9429 60.1437 13.9147 60.1045 13.8978ZM23.7259 46.3253C20.2276 46.3253 17.3451 43.1136 17.3451 39.1693C17.3451 35.225 20.1717 32.0133 23.7259 32.0133C27.308 32.0133 30.1626 35.2532 30.1066 39.1693C30.1066 43.1136 27.28 46.3253 23.7259 46.3253ZM47.3178 46.3253C43.8196 46.3253 40.9371 43.1136 40.9371 39.1693C40.9371 35.225 43.7636 32.0133 47.3178 32.0133C50.9 32.0133 53.7545 35.2532 53.6986 39.1693C53.6986 43.1136 50.9 46.3253 47.3178 46.3253Z" />
								</svg>
								<span>Sign in with Discord</span>
							</div>
						</Button>
						{/* <Button
							variant="outline"
							onClick={() =>
								signIn('credentials', {
									email: 'demo@demo.co',
									password: 'demo',
									callbackUrl: '/dashboard',
								})
							}
						>
							Demo
						</Button> */}
					</div>
				</div>
			</div>
		</LandingLayout>
	);
}

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export default Login;
