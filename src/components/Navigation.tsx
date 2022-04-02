/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useSession, signout } from 'next-auth/client';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';

import Link from './ui/Link';
import { ThemeSwitch } from './ThemeToggle';
import Dropdown from './ui/Menu';

export default function Navigation() {
	const [session, loading] = useSession();

	const dropdownItems = [
		{ text: 'Settings', to: '/settings' },
		{ text: 'Sign Out', action: () => signout() },
	];
	return (
		<Disclosure as="nav" className="">
			{({ open }) => (
				<>
					<div className="max-w-sm mx-auto sm:max-w-6xl">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 right-0 flex items-center space-x-1 sm:hidden">
								<Dropdown additionalItem={<ThemeSwitch />} menuItems={dropdownItems}>
									<div className="flex  space-x-0.5">
										{session?.user?.image && (
											<img className="w-6 rounded-full" src={session?.user!.image} alt="userImg" />
										)}
									</div>
								</Dropdown>
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block w-6 h-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block w-6 h-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex items-center flex-1 px-2 sm:items-stretch sm:justify-between">
								<Link href="/" className="text-2xl text-brand">
									zizzl
								</Link>
								<div className="items-center hidden space-x-4 sm:flex">
									<NavItems />
									<Dropdown additionalItem={<ThemeSwitch />} menuItems={dropdownItems}>
										<div className="flex  space-x-0.5">
											{session?.user?.image && (
												<img
													className="w-6 rounded-full"
													src={session?.user!.image}
													alt="userImg"
												/>
											)}
										</div>
									</Dropdown>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<NavItems />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

function NavItems() {
	const items = [
		{ name: 'Pricing', to: '/pricing' },
		{ name: 'About', to: '/about' },
		{ name: 'Login', to: '/auth/login', showIfAuth: false },
		{ name: 'Dashboard', to: '/dashboard', showIfAuth: true },
	];

	const [session] = useSession();
	const { pathname } = useRouter();

	function handleShow(showIfAuth: boolean | undefined) {
		if (showIfAuth === undefined) return;
		if (session?.user === undefined) {
			if (showIfAuth) return 'hidden';
		} else {
			if (!showIfAuth) return 'hidden';
		}
	}

	return (
		<div className="p-4 sm:p-0">
			<div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
				{items.map(({ name, to, showIfAuth }) => (
					<Link
						className={handleShow(showIfAuth)}
						key={name}
						href={to}
						active={pathname === to ? true : undefined}
					>
						{name}
					</Link>
				))}
				<Link
					className="sm:hidden"
					href="/account"
					active={pathname === '/settings' ? true : undefined}
				>
					Settings
				</Link>
			</div>
		</div>
	);
}
