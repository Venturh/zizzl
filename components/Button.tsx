import clsx from 'clsx';
import Clickable, { Props as ClickableProps } from './Clickable';

export interface Props extends ClickableProps {
	variant?: 'brand' | 'accent' | 'error' | 'success' | 'outline' | 'inherit';
	loading?: boolean;
}

export default function Button({
	children,
	to,
	variant = 'brand',
	loading = false,
	className,
	...props
}: Props) {
	return (
		<Clickable
			className={clsx(
				className,
				'inline-flex justify-center items-center px-4 py-2 text-sm font-medium border border-tansparent rounded-md shadow-sm focus:outline-none',
				{
					'bg-brand text-brand-contrast hover:bg-brand-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand':
						variant === 'brand',
					'text-brand focus:ring-1 focus:ring-text-primary':
						variant === 'inherit',
					'text-primary bg-accent hover:bg-black hover:text-white ':
						variant === 'accent',
					'text-primary bg-primary ring-1 ring-accent hover:ring-black dark:hover:ring-white':
						variant === 'outline',
					'text-error bg-secondary hover:bg-error hover:text-white focus:ring-1 focus:ring-error ring-1 ring-accent ':
						variant === 'error',
					'text-success bg-secondary hover:bg-success hover:text-black focus:ring-1 focus:ring-success ring-1 ring-accent ':
						variant === 'success',
				},
			)}
			to={to}
			{...props}
		>
			{children}
			{loading && (
				<svg
					className="w-5 h-5 ml-2 fill-current animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path fill="none" d="M0 0h24v24H0z" />
					<path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
				</svg>
			)}
		</Clickable>
	);
}
