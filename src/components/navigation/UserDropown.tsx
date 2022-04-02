import Image from 'next/image';
import { signOut } from 'next-auth/client';
import { ComponentProps } from 'react';
import { useMeQuery } from 'types/graphql';

import Menu from 'components/ui/Menu';
import ThemeSwitch from 'components/ui/ThemeToggle';

export default function UserDropdown({ className }: ComponentProps<'div'>) {
	const dropdownItems = [
		{ text: 'Settings', to: '/settings' },
		{ text: 'Sign Out', action: () => signOut() },
	];

	const { data } = useMeQuery();

	if (data?.me) {
		return (
			<Menu mobileModal additionalItem={<ThemeSwitch />} menuItems={dropdownItems}>
				<Image
					className="flex-shrink-0 rounded-full"
					width={24}
					height={24}
					src={data!.me!.image}
					alt="userImg"
				/>
			</Menu>
		);
	}
	return <></>;
}
