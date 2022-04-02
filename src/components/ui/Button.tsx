import clsx from 'clsx';
import { cloneElement, ComponentProps, forwardRef, isValidElement } from 'react';
import Clickable, { ClickableProps } from './Clickable';

export type Color = 'brand' | 'success' | 'error' | 'warning' | 'accent' | 'primary' | 'secondary';
export type Variant = 'solid' | 'ghost' | 'outline' | 'link' | 'oppacity';
export type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type Position = 'left' | 'center';

export interface ButtonProps extends ClickableProps {
	size?: Size;
	variant?: Variant;
	color?: Color;
	circle?: boolean;
	rounded?: boolean;
	position?: Position;
	leftIcon?: React.ReactElement;
	rightIcon?: React.ReactElement;
	loading?: boolean;
	label?: string;
}

const Button = forwardRef<any, ButtonProps>(
	(
		{
			children,
			color = 'brand',
			variant = 'oppacity',
			rounded = true,
			size = 'md',
			loading = false,
			circle = false,
			position = 'center',
			leftIcon,
			rightIcon,
			className,
			label,
			type = 'button',
			...rest
		}: ButtonProps,
		ref,
	) => {
		return (
			<Clickable
				ref={ref}
				type={type}
				className={clsx(
					'flex-shrink-0 font-medium truncate disabled:opacity-50 focus:outline-xxs disabled:pointer-events-xxs',
					circle ? sizesCircle[size] : sizes[size],
					variants[variant][color],
					positions[position],
					label ? 'flex flex-col' : 'inline-flex items-center',
					{ 'rounded-md': rounded },
					className,
				)}
				{...rest}
			>
				<>
					{label && (
						<label htmlFor={rest.name} className="block text-xs font-medium text-secondary">
							{label}
						</label>
					)}
					<div className={clsx('flex items-center', { 'mt-1': label })}>
						{leftIcon && (
							<ButtonIcon
								className={clsx('mr-1.5 -ml-0.5', leadingIconClasses[size])}
								aria-hidden="true"
							>
								{leftIcon}
							</ButtonIcon>
						)}
						{children}
						{rightIcon && (
							<ButtonIcon
								className={clsx('mr-1.5 -ml-0.5', trailingIconClasses[size])}
								aria-hidden="true"
							>
								{rightIcon}
							</ButtonIcon>
						)}
						{loading && (
							<svg
								className="w-4 h-4 ml-2 fill-current animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									className="opacity-100"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						)}
					</div>
				</>
			</Clickable>
		);
	},
);

export default Button;
Button.displayName = 'Button';

export function ButtonIcon({ children, className, ...rest }: ComponentProps<'span'>) {
	const element = children;
	const _children = isValidElement(element)
		? cloneElement(element as any, {
				'aria-hidden': true,
				focusable: false,
		  })
		: null;
	return (
		<span
			className={clsx(
				'inline-flex flex-shrink-0 justify-center items-center text-currentColor',
				className,
			)}
			{...rest}
		>
			{_children}
		</span>
	);
}

const sizes = {
	xxs: 'p-1 text-xs',
	xs: 'px-1.5 py-1 text-xs ',
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-sm',
	lg: 'px-4 py-2 text-base',
};
const sizesCircle = {
	xxs: '',
	xs: 'p-1 text-sm rounded-full',
	sm: 'p-1.5 text-sm rounded-full',
	md: 'p-2 text-sm rounded-full',
	lg: 'p-2 text-base rounded-full',
};

export const solid = {
	brand:
		'text-white dark:text-black bg-brand-primary hover:bg-brand-secondary shadow-sm focus:ring-1 focus:ring-brand-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-brand-primary',
	success:
		'text-white dark:text-black bg-success-primary hover:bg-success-secondary shadow-sm focus:ring-1 focus:ring-success-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-success-primary',
	error:
		'text-white dark:text-black bg-error-primary hover:bg-error-secondary shadow-sm focus:ring-1 focus:ring-error-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-error-primary',
	warning:
		'text-white dark:text-black bg-warning-primary hover:bg-warning-secondary shadow-sm focus:ring-1 focus:ring-warning-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-warning-primary',
	accent:
		'bg-accent-primary hover:bg-accent-secondary shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-accent-primary',
	primary:
		'text-white dark:text-black bg-text-primary hover:bg-text-secondary shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-text-primary',
	secondary:
		'text-primary bg-bg-secondary hover:bg-accent-secondary shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-bg-secondary',
};

export const outline = {
	brand:
		'bg-transparent border border-brand-primary text-brand-primary hover:bg-opacity-10 hover:bg-brand-primary focus:ring-1 focus:ring-currentColor',
	success:
		'bg-transparent border border-success-primary text-success-primary hover:bg-opacity-10 hover:bg-success-primary focus:ring-1 focus:ring-currentColor',
	error:
		'bg-transparent border border-error-primary text-error-primary hover:bg-opacity-10 hover:bg-error-primary focus:ring-1 focus:ring-currentColor',
	warning:
		'bg-transparent border border-warning-primary text-warning-primary hover:bg-opacity-10 hover:bg-warning-primary focus:ring-1 focus:ring-currentColor',

	accent:
		'bg-transparent border border-accent-primary text-primary hover:bg-opacity-10 hover:bg-accent-primary focus:ring-1 focus:ring-brand-primary',
	primary:
		'bg-transparent border border-text-primary text-primary hover:bg-opacity-10 hover:bg-text-primary focus:ring-1 focus:ring-currentColor',
	secondary:
		'bg-transparent border border-text-primary text-primary hover:bg-opacity-10 hover:bg-text-primary focus:ring-1 focus:ring-currentColor',
};
export const ghost = {
	brand:
		'bg-transparent text-brand-primary hover:bg-opacity-10 hover:bg-brand-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	success:
		'bg-transparent text-success-primary hover:bg-opacity-10 hover:bg-success-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	error:
		'bg-transparent text-error-primary hover:bg-opacity-10 hover:bg-error-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	warning:
		'bg-transparent text-warning-primary hover:bg-opacity-10 hover:bg-warning-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	primary:
		'bg-transparent text-text-primary hover:bg-opacity-10 hover:bg-text-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	accent:
		'bg-transparent text-text-primary hover:bg-opacity-10 hover:bg-accent-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
	secondary:
		'bg-transparent text-text-primary hover:bg-opacity-10 hover:bg-text-primary focus:ring-1 focus:ring-currentColor disabled:hover:bg-transparent',
};

const link = {
	brand: 'bg-transparent text-brand-primary hover:underline',
	success: 'bg-transparent text-success-primary hover:underline',
	error: 'bg-transparent text-error-primary hover:underline',
	warning: 'bg-transparent text-warning-primary hover:underline',
	primary: 'bg-transparent text-text-primary hover:underline',
	accent: 'bg-transparent text-secondary hover:underline',
	secondary: 'bg-transparent text-text-primary hover:underline',
};

const oppacity = {
	brand:
		'text-brand-primary bg-brand-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-brand-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	success:
		'text-success-primary bg-success-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-success-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	error:
		'text-error-primary bg-error-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-error-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	warning:
		'text-warning-primary bg-warning-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-warning-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	accent:
		'text-accent-primary bg-text-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	primary:
		'text-primary bg-text-primary bg-opacity-20 hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
	secondary:
		'text-secondary bg-bg-secondary bg-opacity-20  hover:bg-opacity-10 shadow-sm focus:ring-1 focus:ring-accent-primary ring-offset-2 ring-offset-bg-primary disabled:hover:bg-opacity-20',
};

export const variants = {
	solid,
	ghost,
	outline,
	link,
	oppacity,
};

const leadingIconClasses = {
	xs: '-ml-0.5 mr-1 h-3.5 w-3.5',
	sm: '-ml-0.5 mr-1.5 h-4 w-4',
	md: '-ml-0.5 mr-1.5 h-4 w-4',
	lg: '-ml-1 mr-1.5 h-5 w-5',
};
const trailingIconClasses = {
	xs: 'ml-1 -mr-0.5 h-3.5 w-3.5',
	sm: 'ml-1.5 -mr-0.5 h-4 w-4 ',
	md: 'ml-1.5 -mr-0.5 h-4 w-4 order-2',
	lg: 'ml-1.5 -mr-1 h-5 w-5 order-last',
};

const positions = {
	left: 'justify-start',
	center: 'justify-center',
};
