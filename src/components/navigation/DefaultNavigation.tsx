import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import UserDropdown from './UserDropown';
import Button from 'components/ui/Button';

import { useMeQuery } from 'types/graphql';
import { getNavLinks } from 'utils/navigation';
import Logo from 'components/ui/Logo';
import Link from 'next/link';

export default function DefaultNavigation() {
	const { pathname } = useRouter();
	const { data } = useMeQuery();

	const navlinks = getNavLinks();

	return (
		<Disclosure as="nav" className="bg-secondary">
			{({ open }) => (
				<>
					<div className="px-4 lg:px-0 mx-auto sm:max-w-md md:max-w-2xl lg:max-w-[60rem] xl:max-w-[80rem]">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset text-secondary focus:ring-text-primary">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block w-6 h-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block w-6 h-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>

							<div className="flex justify-start items-strcetch">
								<div className="hidden md:flex">
									<Logo />
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										{navlinks.map((link) => {
											return (
												<Link href={link.href} key={link!.name}>
													<a
														className={clsx(
															pathname.startsWith(`/${link.href.split('/')[1]}`)
																? 'bg-accent-primary text-primary'
																: 'text-primary hover:bg-accent-secondary hover:text-secondary',
															'p-2 font-medium rounded-lg',
														)}
													>
														{link.name}
													</a>
												</Link>
											);
										})}
									</div>
								</div>
							</div>

							<div className="md:hidden">
								<Logo />
							</div>
							<div className="flex items-center pr-2 sm:static sm:inset-auto sm:pr-0 sm:ml-6">
								{data?.me ? (
									<UserDropdown />
								) : (
									<Button size="sm" variant="solid" href="/auth/login">
										Login
									</Button>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden bg-secondary">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navlinks.map((item) => {
								const current = pathname.startsWith(item.href);

								return (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={clsx(
											current
												? 'text-white bg-gray-900'
												: 'text-gray-300 hover:text-white hover:bg-gray-700',
											'block py-2 px-3 text-base font-medium rounded-md',
										)}
									>
										{item.name}
									</Disclosure.Button>
								);
							})}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
