import { ExclamationIcon, CheckIcon, InformationCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { createElement } from 'react';

type Props = {
	type: '' | 'success' | 'error' | 'info';
	title: string;
	description?: string;
};

const icons = {
	success: CheckIcon,
	error: ExclamationIcon,
	info: InformationCircleIcon,
};

const colors = {
	success: 'text-success-primary',
	error: 'text-error-primary',
	info: 'text-primary',
};

export default function Alert({ type, title, description }: Props) {
	const Icon = () => createElement(icons[type], { className: clsx('w-6 h-6', colors[type]) });

	return (
		<div className="p-3 rounded-md bg-secondary">
			<div className="flex">
				<div className="flex-shrink-0">
					<Icon />
				</div>
				<div className="ml-3">
					<h3 className="text-sm font-medium text-primary">{title}</h3>
					{description && (
						<div className="mt-2 text-sm text-secondary">
							<p>{description}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
