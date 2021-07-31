import { ComponentProps, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props extends ComponentProps<'input'> {
	label: string;
}

export function Error({ name }: { name?: string }) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;
	const error = errors[name];

	return <div className="text-sm text-error">{error && error.message}</div>;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, type, ...rest }, ref) => {
		return (
			<label className="space-y-2">
				<span className="text-sm font-medium text-secondary">{label}</span>
				<input
					className="w-full px-4 py-2 border rounded-md border-accent bg-bg-secondary text-primary focus:border-brand focus:ring-brand disabled:opacity-60 disabled:bg-accent disabled:bg-opacity-20"
					type={type}
					ref={ref}
					{...rest}
				/>

				<Error name={rest.name} />
			</label>
		);
	},
);

Input.displayName = 'Input';

export default Input;
