import Link from 'next/link';
import { ComponentProps } from 'react';

type ClickableProps = ComponentProps<'button'> & ComponentProps<'a'>;

export interface Props extends ClickableProps {
	out?: boolean;
	to?: string;
}

export default function Clickable({ out, to, ...props }: Props) {
	const isLink = typeof to !== 'undefined';
	const Clickable = isLink ? 'a' : 'button';
	const content = (
		<Clickable
			target={out ? '_blank' : undefined}
			rel={out ? 'noopener noreferrer' : undefined}
			{...props}
		/>
	);
	if (isLink) {
		return <Link href={to!}>{content}</Link>;
	}
	return content;
}
