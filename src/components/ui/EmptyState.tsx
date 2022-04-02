import { ButtonIcon } from './Button';
import Card from './Card';
import { ClickableProps } from './Clickable';

export interface EmptyStateProps extends ClickableProps {
	icon?: React.ReactNode;
	title: string;
}

export default function EmptyState({ icon, title }: EmptyStateProps) {
	return (
		<Card>
			<div className="w-full h-full p-2 mx-auto text-center rounded-lg focus:outline-none bg-secondary">
				{icon && (
					<ButtonIcon className="w-8 h-8 mx-auto md:w-12 md:h-12 text-secondary">{icon}</ButtonIcon>
				)}
				<span className="block mt-2 text-sm font-medium text-primary">{title}</span>
			</div>
		</Card>
	);
}
export function SmallEmptyState({ icon, title, ...props }: EmptyStateProps) {
	return (
		<div className="flex items-center w-full h-full px-4 py-3 rounded-lg focus:outline-none bg-secondary">
			{icon && <ButtonIcon className="w-6 h-6 text-secondary">{icon}</ButtonIcon>}
			<span className="block ml-4 text-sm font-medium text-primary">{title}</span>
		</div>
	);
}
