/**
 * Кастомный хук для получения флага прокрутки документа до конца экрана
 */
import {useEffect, useState} from "react";

export const useCheckWindowBottom = () => {

    const [isBottom, setIsBottom] = useState(false)

    function handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - 1;
        const windowBottom = Math.round(windowHeight + window.scrollY);
        if (Math.round(windowBottom) >= docHeight) {
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }
    }

    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return isBottom
}