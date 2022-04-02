import clsx from 'clsx';
import React, { ReactChild } from 'react';
import Skeleton from './Skeleton';

type ListProps = {
	children: ReactChild[] | ReactChild;
	title?: string;
	loading?: boolean;
	className?: string;
};
type ListItemsProps = {
	label: string | number | React.ReactElement;
	description?: string | number;
	value?: string | number;
	children?: React.ReactNode;
};

export default function List({ children, className, title, loading }: ListProps) {
	if (loading) {
		return (
			<div className={clsx('p-2 space-y-4 rounded-lg bg-secondary', className)}>
				<Skeleton className="w-1/3" height={24} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
				<Skeleton height={32} color="accent" />
			</div>
		);
	}

	return (
		<dl className={clsx('px-2 rounded-lg bg-secondary', className)}>
			{title && (
				<h3 className="sticky top-0 z-0 py-4 text-lg font-semibold bg-secondary">{title}</h3>
			)}
			{children}
		</dl>
	);
}

export function ListItem({ label, value, description, children }: ListItemsProps) {
	return (
		<div className="flex justify-between items-center py-2.5">
			<dt className="flex items-center">
				<span className="text-sm text-secondary">{label}</span>
				<span className="ml-2 text-xs text-secondarys">{description}</span>
			</dt>
			<dd className="text-sm sm:col-span-2 sm:mt-0 text-primary">{children || value}</dd>
		</div>
	);
}

export function getValidChildren(children: React.ReactNode) {
	return React.Children.toArray(children).filter((child) =>
		React.isValidElement(child),
	) as React.ReactElement[];
}
