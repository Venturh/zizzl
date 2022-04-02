import {
	ChartPieIcon,
	ReceiptTaxIcon,
	CashIcon,
	HomeIcon,
	ChartBarIcon,
} from '@heroicons/react/outline';

export type NavLink = {
	name: string;
	description: string;
	href: string;
	icon: Function;
	protected: boolean;
};

export function getNavLinks() {
	return [
		{
			name: 'Dashboard',
			description: 'Dashboard',
			href: '/dashboard',
			icon: HomeIcon,
			protected: true,
		},
	];
}

export function filteredNavLinks(navlinks: NavLink[], loggedIn: boolean) {
	return navlinks.filter((link) => {
		if (link.protected === undefined || link.protected === false) return link;
		if (!loggedIn) {
			if (link.protected) return false;
		} else {
			if (!link.protected) return link;
		}
		return link;
	});
}
