import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props extends ComponentProps<'input'> {
	label?: string;
	inset?: boolean;
	trailingText?: string;
	leadingText?: string;
	as?: 'input' | 'textarea';
}

export function Error({ name, padding }: { name?: string; padding?: boolean }) {
	const {
		formState: { errors },
	} = useFormContext();

	const error = errors[name!];

	if (error) {
		return (
			<div
				className={clsx('text-xs truncate text-error-secondary', {
					'py-2 px-4': padding,
				})}
			>
				{error.message}
			</div>
		);
	} else return <></>;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
	({ label, type, trailingText, leadingText, inset = true, as = 'input', ...rest }, ref) => {
		const Tag = as;
		const wrapperClass =
			'w-full px-4 py-2 rounded-lg disabled:bg-opacity-20 focus-within:border-brand-primary focus-within:ring-brand-primary disabled:opacity-60 disabled:bg-accent-primary border border-accent-primary border bg-secondary text-primary';

		return (
			<div className={inset ? wrapperClass : undefined}>
				{label && (
					<label htmlFor={rest.name} className="block text-xs font-medium text-secondary">
						{label}
					</label>
				)}
				<div className="relative mt-1 rounded-lg shadow-sm">
					{leadingText && (
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<span className="sm:text-sm text-secondary">{leadingText}</span>
						</div>
					)}
					<Tag
						className={clsx(
							inset
								? 'resize-none block p-0 w-full border-0 focus:ring-0 sm:text-sm bg-secondary placeholder-accent-primary'
								: wrapperClass,
							{ 'pl-7': leadingText },
							{ 'pr-7': trailingText },
						)}
						type={type}
						//@ts-ignore
						ref={ref}
						id={rest.name}
						{...rest}
					/>
					{trailingText && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<span className="sm:text-sm text-secondary" id="price-currency">
								{trailingText}
							</span>
						</div>
					)}
				</div>
				<Error name={rest.name} />
			</div>
		);
	},
);

Input.displayName = 'Input';

export default Input;
