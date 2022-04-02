import { ComponentProps } from 'react';
import clsx from 'clsx';
import { Color, Size } from './Button';
import IconButton from './IconButton';
import { XIcon } from '@heroicons/react/outline';

interface BadeProps extends ComponentProps<'span'> {
	size?: Size;
	variant?: 'subtle' | 'solid' | 'outline';
	color?: Color;
	onRemove?: () => void;
}

const sizes = {
	// xxs: 'px-1 py-[1px] text-xs rounded',
	xs: 'px-2 py-0.5 text-xs rounded',
	sm: 'px-2 py-0.5 text-xs md:text-sm rounded',
	md: 'px-2.5 py-0.5 text-sm md:text-base rounded-lg',
	lg: 'px-3 py-0.5 text-sm md:text-base rounded-lg',
};

const subtle = {
	brand: 'bg-brand-primary bg-opacity-10 text-brand-primary text-opacity-80',
	success: 'bg-success-primary bg-opacity-10 text-success-primary',
	error: 'bg-error-primary bg-opacity-10 text-error-primary',
	warning: 'bg-warning-primary bg-opacity-10 text-warning-primary',
	primary: 'bg-text-primary bg-opacity-10 text-text-primary',
	accent: 'bg-accent-primary bg-opacity-10 text-text-primary',
};

const solid = {
	brand: 'bg-brand-primary  text-black dark:text-white text-opacity-80',
	success: 'bg-success-secondary text-white',
	error: 'bg-error-primary text-black dark:text-white',
	warning: 'bg-warning-primary text-black dark:text-white',
	primary: 'bg-primary text-black dark:text-white text-opacity-80',
	accent: 'bg-accent-primary  text-black dark:text-white text-opacity-80',
};

const outline = {
	brand: 'bg-transparent border border-brand-primary text-brand-primary',
	success: 'bg-transparent border border-success-primary text-success-primary',
	error: 'bg-transparent border border-error-primary text-error-primary',
	warning: 'bg-transparent border border-warning-primary text-warning-primary',
	primary: 'bg-transparent border border-text-primary text-text-primary',
	accent: 'bg-transparent border border-accent-primary text-accent-primary',
};

const variants = {
	subtle,
	solid,
	outline,
};

export default function Badge({
	size = 'sm',
	color = 'brand',
	variant = 'solid',
	children,
	className,
	onRemove,
	...rest
}: BadeProps) {
	return (
		<span
			className={clsx(
				'inline-flex items-center space-x-2 font-medium',
				sizes[size],
				variants[variant][color],
				className,
			)}
			{...rest}
		>
			<span className="truncate">{children}</span>
			{onRemove && (
				<IconButton
					ariaLabel="remove"
					color="secondary"
					size="xs"
					className="w-2 h-2"
					icon={<XIcon />}
					fullRounded
					onClick={onRemove}
				/>
			)}
		</span>
	);
}
