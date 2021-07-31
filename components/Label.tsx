import clsx from 'clsx';
import { useState } from 'react';

type Props = {
	children: React.ReactNode;
	variant?: 'brand' | 'default' | 'border' | 'cool';
	className?: string;
	small?: boolean;
};

export default function Label({ children, variant, small, className }: Props) {
	return (
		<div
			className={clsx(
				'text-xs rounded-md leading-5 flex items-center',
				{
					'bg-brand text-brand-contrast': variant === 'brand',
					'bg-primary text-primary p-1': variant === 'default',
					'border border-accent': variant === 'border',
					'text-brand-darker bg-brand-lighter dark:text-black dark:bg-brand':
						variant === 'cool',
					'py-0.5 px-1.5 sm:px-2': !small,
					'py-0.5 px-1': small,
				},
				className,
			)}
		>
			{children}
		</div>
	);
}

type LabelsProps = {
	labels: string[];
	variant: Props['variant'];
	max?: number;
	small?: boolean;
};

export function Labels({ labels, variant, max = 3, small }: LabelsProps) {
	const [show, setShow] = useState(false);
	return (
		<div className="flex items-center">
			{labels.slice(0, max).map((field) => (
				<span key={field}>
					<Label className="mr-2" small={small} variant={variant}>
						{field}
					</Label>
				</span>
			))}
			{labels.length > 3 && (
				<span
					className="cursor-pointer"
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
				>
					<Label small={small} variant={variant}>
						+ {labels.length - max}
					</Label>
				</span>
			)}
			<div className="flex ml-2 space-x-2 ">
				{show &&
					labels.slice(max, labels.length).map((field) => (
						<Label key={field} variant={variant} small={small}>
							{field}
						</Label>
					))}
			</div>
		</div>
	);
}
