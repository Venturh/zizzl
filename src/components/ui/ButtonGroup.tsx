import { ComponentProps } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import Menu, { MenuItem } from './Menu';
import Button from './Button';
import IconButton from './IconButton';
import clsx from 'clsx';

interface Props extends ComponentProps<'button'> {
	items: MenuItem[];
	color?: 'accent' | 'secondary';
}

export default function ButtonGroup({ items, disabled, color = 'secondary' }: Props) {
	return (
		<span className="relative inline-flex rounded-lg">
			<Button
				color={color}
				variant="solid"
				className={clsx(
					'text-sm font-normal rounded-l-md border',
					color === 'accent' ? 'border-bg-secondary' : 'border-accent-primary',
				)}
				onClick={() => items[0].action!(items[0])}
				type="button"
				rounded={false}
				leftIcon={items[0].icon}
				disabled={disabled}
			>
				{items[0].text}
			</Button>
			<Menu disabled={disabled} menuItems={items.slice(1)}>
				<IconButton
					color={color}
					variant="solid"
					ariaLabel="down"
					icon={<ChevronDownIcon />}
					className={clsx(
						'h-full rounded-r-md border',
						color === 'accent' ? 'border-bg-secondary' : 'border-accent-primary',
					)}
					rounded={false}
					disabled={disabled}
				/>
			</Menu>
		</span>
	);
}
