import {useEffect, useState} from "react";

/**
 * Кастомный хук для получения направления скролла (true - вниз, false - вверх)
 */
export const useIsScrollDown = () => {
    let oldScrollY = 0;

    const [isScrollDown, setIsScrollDown] = useState(false);

    const controlDirection = () => {
        if(window.scrollY > oldScrollY) {
            setIsScrollDown(true);
        } else {
            setIsScrollDown(false);
        }
        oldScrollY = window.scrollY;
    }

    useEffect(() => {
        window.addEventListener('scroll', controlDirection);
        return () => {
            window.removeEventListener('scroll', controlDirection);
        };
    },[]);

    return isScrollDown
}