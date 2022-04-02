import clsx from 'clsx';

type Props = {
	height?: number;
	width?: number;
	color?: 'accent' | 'secondary';
	count?: number;
	className?: string;
};

const colors = { accent: 'bg-accent-primary', secondary: 'bg-secondary' };

export default function Skeleton({ height = 32, width, color = 'accent', className }: Props) {
	return (
		<div
			style={{
				height: height ? `${height}px` : className ? undefined : '100%',
				width: width ? `${width}px` : className ? undefined : '100%',
			}}
			className={clsx('rounded-lg animate-pulse', colors[color], className)}
		/>
	);
}

export function SkeletonText({ height = 16, color, count = 1 }: Props) {
	return (
		<div className="space-y-2">
			{Array.from(Array(count).keys()).map((_, i) => (
				<div
					key={i}
					style={{ height: `${height}px` }}
					className={clsx('w-full rounded-lg animate-pulse bg-secondary', colors[color])}
				/>
			))}
		</div>
	);
}
