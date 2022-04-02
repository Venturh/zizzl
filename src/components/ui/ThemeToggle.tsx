import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';

export default function ThemeSwitch() {
	const [enabled, setEnabled] = useState(false);

	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setEnabled(resolvedTheme === 'dark' ? true : false);
	}, [resolvedTheme]);

	function toggle() {
		setEnabled(!enabled);
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
	}

	return (
		<div className="flex items-center justify-between w-full">
			<span>Dark Mode</span>
			<Switch
				checked={enabled}
				onChange={() => toggle()}
				className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className="absolute w-full h-full pointer-events-none rounded-md"
				/>
				<span
					aria-hidden="true"
					className={clsx(
						enabled ? 'bg-brand-primary' : 'bg-gray-200',
						'absolute mx-auto w-9 h-4 rounded-full transition-colors duration-200 ease-in-out pointer-events-none',
					)}
				/>
				<span
					aria-hidden="true"
					className={clsx(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'inline-block absolute left-0 w-5 h-5 bg-white rounded-full border border-gray-200 ring-0 shadow transition-transform duration-200 ease-in-out transform pointer-events-none',
					)}
				/>
			</Switch>
		</div>
	);
}
