import clsx from 'clsx';
import Clickable from './Clickable';

type Props = {
	to: string;
	out?: boolean;
	inherit?: boolean;
	underline?: boolean;
	active?: boolean;
	children: React.ReactNode;
	className?: string;
};
export default function Link({
	to,
	out,
	children,
	className,
	underline,
	active,
}: Props) {
	return (
		<Clickable
			className={clsx(className, {
				underline: underline,
				'text-brand hover:text-brand': active,
				'hover:text-brand text-primary': !active,
			})}
			to={to}
			out={out}
		>
			{children}
		</Clickable>
	);
}
