import { useState, useEffect } from "react";

export default function useLocalStorage(label, defaultValue){
    const savedValue = JSON.parse(localStorage.getItem(label))

    const [state, setState] = useState(savedValue ?? defaultValue)

    useEffect(() => {
        localStorage.setItem(label, JSON.stringify(state))
    }, [label, state])

    return [state, setState]
}