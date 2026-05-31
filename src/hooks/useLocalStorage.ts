import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';

type StorageState<T> = {
    storageError: string;
    saveNow: (nextValue?: T) => boolean;
};

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>, StorageState<T>] {
    const [value, setValue] = useState<T>(() => readValue(key, initialValue));
    const [storageError, setStorageError] = useState('');

    const saveNow = useCallback(
        (nextValue: T = value) => {
            try {
                localStorage.setItem(key, JSON.stringify(nextValue));
                setStorageError('');
                return true;
            } catch (error) {
                console.error(`${key} save error:`, error);
                setStorageError('Could not save this data in browser storage.');
                return false;
            }
        },
        [key, value]
    );

    useEffect(() => {
        saveNow(value);
    }, [saveNow, value]);

    return [value, setValue, { storageError, saveNow }];
}

function readValue<T>(key: string, initialValue: T): T {
    try {
        const saved = localStorage.getItem(key);
        if (!saved) return initialValue;

        const parsed = JSON.parse(saved) as T;

        if (Array.isArray(initialValue)) {
            return Array.isArray(parsed) ? parsed : initialValue;
        }

        if (isPlainObject(initialValue) && isPlainObject(parsed)) {
            return { ...initialValue, ...parsed };
        }

        return parsed;
    } catch (error) {
        console.error(`${key} load error:`, error);
        localStorage.removeItem(key);
        return initialValue;
    }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
