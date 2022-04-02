import clsx from 'clsx';
import Clickable, { ClickableProps } from './Clickable';

interface Props extends ClickableProps {
	inherit?: boolean;
	underline?: boolean;
	active?: boolean;
}
export default function Link({ href, out, children, className, underline, active }: Props) {
	return (
		<Clickable
			className={clsx(className, {
				underline: underline,
				'text-brand-primary hover:text-brand-primary': active,
				'text-primary hover:text-brand-primary': !active,
			})}
			href={href}
			out={out}
		>
			{children}
		</Clickable>
	);
}
