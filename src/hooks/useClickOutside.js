import { useEffect, useRef } from "react";

function useClickOutside(handler, active = true) {
    const ref = useRef(null);

    useEffect(() => {
        if (!active) return;

        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) handler();
        }

        document.addEventListener('click', handleClick, true);

        return () => document.removeEventListener('click', handleClick, true);
    }, [handler, active]);

    return ref;
}

export default useClickOutside;
