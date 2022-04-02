import { cloneElement, ReactElement } from 'react';
import clsx from 'clsx';
import { Tab } from '@headlessui/react';

type Props = {
	options: {
		label: string;
		slot: ReactElement;
	}[];
};

const Slot = ({ type, ...rest }: { type: React.ReactElement }) => {
	return cloneElement(type, { ...rest });
};

export default function Tabs({ options }: Props) {
	return (
		<Tab.Group>
			<Tab.List className="flex p-1 space-x-1 rounded-xl ring-1 bg-secondary ring-accent-primary">
				{options.map(({ label }) => (
					<Tab
						key={label}
						className={({ selected }) =>
							clsx(
								'py-1.5 w-full text-sm font-medium leading-5 rounded-lg md:py-2.5',
								'focus:outline-none',
								selected ? 'bg-accent-primary text-primary' : 'text-secondary hover:text-primary ',
							)
						}
					>
						{label}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels className="h-full mt-4 rounded-lg">
				{options.map((option, idx) => (
					<Tab.Panel className="h-full" key={idx}>
						<Slot type={option.slot} />
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
}
