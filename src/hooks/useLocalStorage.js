import {useState, useEffect} from 'react';

export default (key, initialvalue) => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialvalue;
    })

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue];
}