import clsx from 'clsx';
import Clickable, { Props as ClickableProps } from './Clickable';

interface Props extends ClickableProps {}

export default function IconButton({
	onClick,
	children,
	className,
	...props
}: Props) {
	return (
		<Clickable
			onClick={onClick}
			className={clsx(
				'flex items-center rounded-full hover:ring-4 hover:ring-accent hover:bg-accent focus:outline-none',
				className,
			)}
			{...props}
		>
			{children}
		</Clickable>
	);
}
