import { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import Clickable from './Clickable';

type Props = {
	menuItems: { text: string; to?: string; action?: () => void }[];
	children?: React.ReactChild;
	additionalItem?: React.ReactNode;
};

export default function Dropdown({
	children,
	menuItems,
	additionalItem,
}: Props) {
	return (
		<Menu as="div" className="relative inline-block text-left ">
			{({ open }) => (
				<>
					<div>
						<Menu.Button className="flex items-center focus:outline-none ">
							<span className="sr-only">Open options</span>
							{children || (
								<DotsVerticalIcon
									className="w-5 h-5 rounded-full hover:ring-4 hover:ring-accent hover:bg-accent focus:outline-none"
									aria-hidden="true"
								/>
							)}
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right rounded-md shadow-lg bg-primary ring-1 ring-accent ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									<div className="block w-full px-4 py-2 text-sm text-left">
										{additionalItem}
									</div>
								</Menu.Item>
								{menuItems.map(({ text, action, to }) => (
									<Menu.Item key={text}>
										{({ active }) => (
											<Clickable
												to={to}
												onClick={() => (action ? action() : null)}
												className={clsx(
													{ 'bg-secondary': active },
													'block w-full text-left px-4 py-2 text-sm',
												)}
											>
												{text}
											</Clickable>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
}
