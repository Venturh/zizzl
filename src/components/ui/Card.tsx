import clsx from 'clsx';
import React from 'react';
import Skeleton from './Skeleton';

export type CardItem = {
	main?: string | React.ReactNode;
	second?: string | React.ReactNode;
	color?: 'error' | 'success';
	children?: React.ReactChild | React.ReactChild[];
	loading?: boolean;
};

export default function Card({ main, second, children, color, loading }: CardItem) {
	const colors = new Map([
		['error', 'text-error-secondary'],
		['success', 'text-success-secondary'],
	]);
	return (
		<div
			className={clsx(
				{ 'space-y-4': !main },
				'py-4 px-3 rounded-lg shadow sm:p-4 bg-secondary w-full h-full',
			)}
		>
			{loading ? (
				<>
					<Skeleton height={75} />
				</>
			) : main && second ? (
				<>
					<dd className="text-sm truncate text-secondary">{second}</dd>
					<dt className={clsx('mt-1 font-semibold leading-6', colors.get(color) ?? 'text-primary')}>
						{main}
					</dt>
				</>
			) : (
				children
			)}
		</div>
	);
}
