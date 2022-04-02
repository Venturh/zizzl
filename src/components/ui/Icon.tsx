import { createElement } from 'react';

type Props = {
	className: string;
	element: any;
};

export default function Icon({ className, element }: Props) {
	return createElement(element, { className, 'aria-hidden': true });
}
