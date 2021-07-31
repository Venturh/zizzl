import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, EmojiHappyIcon } from '@heroicons/react/solid';
import IconButton from './IconButton';
import { Switch } from '@headlessui/react';

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	const [animate, setAnimate] = useState(false);

	useEffect(() => setMounted(true), []);

	function changeTheme() {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
		setAnimate(true);
		setTimeout(() => {
			setAnimate(false);
		}, 1000);
	}

	return (
		<IconButton onClick={() => changeTheme()}>
			<span className="sr-only">Toggle Theme</span>
			{!mounted ? (
				<EmojiHappyIcon className="w-5" />
			) : resolvedTheme === 'dark' ? (
				<SunIcon className="w-5" />
			) : (
				<MoonIcon className="w-5" />
			)}
		</IconButton>
	);
}

export function ThemeSwitch() {
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
		<div className="flex items-center justify-between">
			<span className="text-sm">Dark Mode</span>
			<Switch
				checked={enabled}
				onChange={() => toggle()}
				className={clsx(
					enabled ? 'bg-brand' : 'bg-accent',
					'relative inline-flex flex-shrink-0 h-5 w-8  rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand',
				)}
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={clsx(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
					)}
				/>
			</Switch>
		</div>
	);
}
