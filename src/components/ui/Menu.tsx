import React, { forwardRef, Fragment, useRef, useState } from 'react';
import clsx from 'clsx';
import { Transition, Menu as DropdownMenu } from '@headlessui/react';

import Clickable from './Clickable';
import Modal, { ModalProps } from './Modal';
import useIsMobile from 'hooks/useMobile';

export type MenuItem = {
	text: string;
	value?: string | boolean | number;
	to?: string;
	checked?: boolean;
	active?: boolean;
	disabled?: boolean;
	icon?: React.ReactElement;
	action?: (item: string | boolean | number | MenuItem) => void;
	indexAction?: (i: number) => void;
	desktopHidden?: boolean;
	mobileHidden?: boolean;
};

export interface MenuProps extends Omit<ModalProps, 'open' | 'setOpen'> {
	menuItems?: MenuItem[];
	children?: React.ReactElement;
	additionalItem?: React.ReactNode;
	mobileModal?: boolean;
	position?: 'bottom-right' | 'bottom-left';
	disabled?: boolean;
	modal?: boolean;
}

const Menu = forwardRef<any, MenuProps>(
	(
		{
			children,
			menuItems,
			additionalItem,
			position = 'bottom-right',
			mobileModal = false,
			modal = false,
			disabled = false,
			...rest
		}: MenuProps,
		_,
	) => {
		const node = useRef<HTMLDivElement>(null);
		const [open, setOpen] = useState(false);
		const isMobile = useIsMobile();

		if (!modal && !isMobile) {
			return (
				<DropdownMenu as="div" className="relative">
					<DropdownMenu.Button as={'div'} className="flex items-center h-full cursor-pointer">
						{children}
					</DropdownMenu.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<DropdownMenu.Items
							static
							className="absolute right-0 z-10 w-56 mt-4 text-sm origin-top-right border rounded-md shadow-lg max-h-96 focus:outline-none ring-1 ring-opacity-5 border-accent-primary bg-secondary ring-accent-primary"
						>
							<MenuItems additionalItem={additionalItem} menuItems={menuItems!} />
						</DropdownMenu.Items>
					</Transition>
				</DropdownMenu>
			);
		} else {
			return (
				<DropdownMenu as="div" className="relative inline-block text-left">
					<div className="flex items-center" onClick={() => setOpen(!open)} ref={node}>
						{children}
					</div>
					<DropdownMenu.Items static>
						{open && (
							<Modal
								open={open}
								setOpen={(o) => {
									setOpen(false);
								}}
								{...rest}
							>
								<div className="p-1 rounded-2xl bg-secondary">
									<MenuItems
										setOpen={() => setOpen(false)}
										additionalItem={additionalItem}
										menuItems={menuItems!}
									/>
								</div>
							</Modal>
						)}
					</DropdownMenu.Items>
				</DropdownMenu>
			);
		}
	},
);

export function MenuItems({
	menuItems,
	additionalItem,
	setOpen,
}: {
	menuItems: MenuItem[];
	additionalItem?: React.ReactNode;
	setOpen?: (o: boolean) => void;
}) {
	function itemAction(item: MenuItem, i?: number) {
		if (setOpen) setOpen(false);
		if (item?.indexAction !== undefined) item?.indexAction(i!);
		else if (!!item?.action) item?.action(item.value || item.text);
		else return undefined;
	}

	return (
		<div className="w-full py-1">
			{additionalItem && (
				<DropdownMenu.Item>
					<div
						className={clsx(
							'flex justify-between items-center py-2 px-4 w-full font-normal outline-none hover:bg-accent-secondary focus:bg-accent-secondary',
						)}
					>
						{additionalItem}
					</div>
				</DropdownMenu.Item>
			)}
			{menuItems &&
				menuItems.map((item, i) => (
					<DropdownMenu.Item disabled={item.disabled} key={i}>
						{({ active }) => (
							<Clickable
								disabled={item.disabled}
								className={clsx(
									'flex items-center py-2 px-4 space-x-4 w-full font-normal outline-none  disabled:cursor-not-allowed hover:bg-accent-secondary focus:bg-accent-secondary',
									{ 'bg-accent-primary': active },
									{ 'hidden md:flex': item.mobileHidden },
									{ 'flex md:hidden': item.desktopHidden },
								)}
								href={item?.to}
								onClick={() => {
									!item.to ? itemAction(item, i) : undefined;
								}}
							>
								{item.icon && <span className="w-5 text-primary">{item.icon}</span>}
								<span className="">{item.text}</span>
							</Clickable>
						)}
					</DropdownMenu.Item>
				))}
		</div>
	);
}

export default Menu;
Menu.displayName = 'Menu';
