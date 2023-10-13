import { useState, useEffect } from 'react';

function useDebouncedState<T>(initialValue: T, delay: number): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return [debouncedValue, setValue];
}

export default useDebouncedState;
