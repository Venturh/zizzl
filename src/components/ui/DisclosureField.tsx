import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

type Props = {
	title: string;
	description?: string;
	children: React.ReactNode;
};

export default function DisclosureField({ title, description, children }: Props) {
	return (
		<div className="w-full">
			<div className="w-full p-2 rounded-lg bg-secondary">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 hover:bg-purple-200 focus-visible:ring-purple-500">
								<span>{title}</span>
								<ChevronUpIcon
									className={`${!open ? 'rotate-180 transform' : ''} text-purple-500 h-5 w-5`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className="px-4 pt-4 pb-2">
								{description || children}
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
}
