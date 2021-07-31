import { ComponentProps } from 'react';

interface Props extends ComponentProps<'div'> {
	title?: string;
	description?: string;
}

export default function BlockContainer({
	title,
	description,
	children,
}: Props) {
	return (
		<div className="flex flex-col w-full max-w-md p-3 mx-auto space-y-3 rounded-md shadow-sm dark:shadow-none bg-secondary ring ring-accent">
			<div className="space-y-2">
				<h1 className="text-5xl font-semibold">{title}</h1>
				<h2 className="text-2xl text-secondary">{description}</h2>
				{children}
			</div>
		</div>
	);
}
