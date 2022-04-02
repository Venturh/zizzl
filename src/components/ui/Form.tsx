import { ComponentProps } from 'react';
import clsx from 'clsx';
import { FormProvider, UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';

import Button from './Button';

interface ErrorProps {
	title: string;
	error?: Error;
}

export interface FormProps<T extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	error?: ErrorProps;
	form: UseFormReturn<T>;
	onSubmit?: SubmitHandler<T>;
	submitButtonText?: string;
	headless?: boolean;
}

export default function Form<T extends FieldValues>({
	form,
	name,
	onSubmit,
	children,
	error,
	submitButtonText,
	headless = false,
	className,
	...rest
}: FormProps<T>) {
	const { isSubmitting } = form.formState;
	return (
		<>
			{error && <ErrorMessage {...error} />}
			<FormProvider {...form}>
				<form onSubmit={onSubmit && form.handleSubmit(onSubmit)} {...rest}>
					<fieldset className={(clsx('flex flex-col h-full'), className)} disabled={isSubmitting}>
						{children}
					</fieldset>
					{!headless && (
						<Button className="w-full mt-4" type="submit" loading={isSubmitting}>
							{submitButtonText}
						</Button>
					)}
				</form>
			</FormProvider>
		</>
	);
}

export function ErrorMessage({ title, error }: ErrorProps) {
	if (!error) return null;

	return (
		<div className="p-4 text-sm text-black rounded-lg space-y-1 bg-opacity-10 bg-error">
			<h3 className="font-medium">{title}</h3>
			<div>{error.message}</div>
		</div>
	);
}
