/**
 *
 */
import {useEffect, useState} from "react";

export const useInfinityScroll = ({ listElement }: { listElement: any[] }) => {

    const [list, setList] = useState(listElement.slice(0, 10));
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (
              window.innerHeight + document.documentElement.scrollTop != document.documentElement.offsetHeight
          ) {
              return
          } else {
              setLoading(true)
          }
        }
    })
}