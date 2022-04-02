import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useController, UseControllerProps } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';

import { MenuItem } from './Menu';
import Button from './Button';
import Badge from './Badge';

interface Props extends UseControllerProps {
	items: MenuItem[];
	placeholder?: string;
	label?: string;
	iconPosition?: 'left' | 'right';
	multiple?: boolean;
	color?: 'accent' | 'secondary';
}
const Select = forwardRef<HTMLSelectElement, Props>(
	(
		{
			items,
			placeholder = 'Choose',
			multiple = false,
			label,
			iconPosition = 'right',
			color = 'secondary',
			...props
		},
		_,
	) => {
		const node = useRef<HTMLDivElement>(null);
		const [open, setOpen] = useState(false);
		const {
			field: { value, onChange },
		} = useController(props);

		const [selected, setSelected] = useState<MenuItem[]>(
			value ? [items.find((item) => item.value === value)] : [],
		);
		function handleChange(changed: MenuItem) {
			let newState = [...selected];

			if (multiple) {
				if (newState.length > 0 && newState.filter((e) => e.value === changed.value).length > 0) {
					newState = newState.filter((item) => item.value !== changed.value);
				} else {
					newState = [...newState, changed];
				}
			} else {
				setOpen(false);
				newState = [changed];
			}
			setSelected(newState);
			onChange(multiple ? newState.map((item) => item.value) : newState[0]?.value);
		}

		function isSelected({ value }: MenuItem) {
			return !!selected.find((item) => item.value === value);
		}

		const Btn = forwardRef(({}, ref) => (
			<Button
				className="w-full"
				color={color}
				variant="solid"
				onClick={() => setOpen(!open)}
				rightIcon={iconPosition === 'right' && <SelectorIcon />}
				leftIcon={iconPosition === 'left' && <SelectorIcon />}
				ref={ref}
				label={label}
				disabled={items.length === 0}
			>
				{multiple && selected.length > 0 && (
					<div className="flex space-x-2">
						{selected.slice(0, 2).map((item, i) => (
							<Badge size="xs" variant="subtle" color="primary" key={i}>
								{item.text}
							</Badge>
						))}
						{selected.length > 2 && (
							<Badge size="xs" variant="subtle" color="primary">
								+ {selected.length - 2}
							</Badge>
						)}
					</div>
				)}
				{!multiple && selected.length > 0 && selected[0].text}
				{selected.length === 0 && placeholder}
			</Button>
		));

		useEffect(() => {
			function handleClick(event: MouseEvent) {
				if (node?.current?.contains(event.target as Node)) {
					return;
				}
				setOpen(false);
			}
			document.addEventListener('mousedown', handleClick);
			return () => {
				document.removeEventListener('mousedown', handleClick);
			};
		}, []);

		return (
			<Listbox value={selected} onChange={(item) => handleChange(item as unknown as MenuItem)}>
				<div ref={node} className="relative w-full mt-1">
					<Listbox.Button as={Btn} />
					<Transition
						unmount={false}
						show={open}
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options
							static
							className="absolute z-10 w-full py-1 mt-1 overflow-hidden overflow-y-scroll text-base rounded-lg shadow-lg max-h-96 focus:outline-none ring-2 sm:text-sm bg-secondary ring-accent-primary"
						>
							{items.map((item, itemIdx) => (
								<Listbox.Option
									key={itemIdx}
									className={({}) =>
										clsx(
											'relative py-2 pr-4 pl-8 cursor-default select-none hover:bg-accent-primary',
										)
									}
									value={item}
								>
									<span
										className={clsx(
											isSelected(item) ? 'font-semibold' : 'font-normal',
											'block truncate',
										)}
									>
										{item.text}
									</span>
									{isSelected(item) ? (
										<span className="flex absolute inset-y-0 left-0 items-center pl-1.5">
											<CheckIcon className="w-5 h-5" aria-hidden="true" />
										</span>
									) : null}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		);
	},
);

export default Select;
