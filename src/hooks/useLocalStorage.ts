import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

export default function useLocalStorage<T>(key: string, initialValue: T, lifeSpan = 1) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			const stampedValue = JSON.parse(item);
			if (stampedValue && stampedValue.expires > Date.now()) {
				return JSON.parse(stampedValue.JSONValue);
			} else {
				return initialValue;
			}
		} catch (error) {
			console.log('file: localstorage.ts ~ line 20 ~ error', error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value) => {
			try {
				const expires = dayjs().add(lifeSpan, 'h').valueOf();
				const JSONValue = JSON.stringify(value);
				const stampedValue = { expires, JSONValue };

				setStoredValue(value);
				window.localStorage.setItem(key, JSON.stringify(stampedValue));
			} catch (error) {
				console.log(error);
			}
		},
		[key, lifeSpan],
	);

	return { storedValue, setValue };
}
