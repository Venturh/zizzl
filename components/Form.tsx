import { ComponentProps } from 'react';
import {
	FormProvider,
	UseFormReturn,
	FieldValues,
	SubmitHandler,
} from 'react-hook-form';
import Button from './Button';

interface ErrorProps {
	title: string;
	error?: Error;
}

interface Props<T extends FieldValues>
	extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	error?: ErrorProps;
	form: UseFormReturn<T>;
	onSubmit?: SubmitHandler<T>;
}

export default function Form<T extends FieldValues>({
	form,
	name,
	onSubmit,
	children,
	error,
	...rest
}: Props<T>) {
	const { isSubmitting } = form.formState;
	return (
		<>
			{error && <ErrorMessage {...error} />}

			<FormProvider {...form}>
				<form
					className="flex flex-col w-full"
					onSubmit={onSubmit && form.handleSubmit(onSubmit)}
					{...rest}
				>
					<fieldset className="flex flex-col space-y-2" disabled={isSubmitting}>
						{children}
					</fieldset>
					<Button className="mt-4" type="submit" loading={isSubmitting}>
						{name}
					</Button>
				</form>
			</FormProvider>
		</>
	);
}

export function ErrorMessage({ title, error }: ErrorProps) {
	if (!error) return null;

	return (
		<div className="p-4 space-y-1 text-sm text-black rounded-md bg-opacity-10 bg-error">
			<h3 className="font-medium">{title}</h3>
			<div>{error.message}</div>
		</div>
	);
}
