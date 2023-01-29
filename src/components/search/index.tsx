import { useRef, useEffect } from 'react'
import styles from './search.module.scss'
import SearchIcon from '@/public/Icon/searchIcon'
import { useState } from 'react'
import Input from '../input'
import { useOutsideAlerter } from '@/src/utils/useOutSideClick'
import { usePreviousState } from '@/src/utils/usePreviousState'
import { useRouter } from 'next/router'

const Search = () => {
    const router = useRouter()
    const [openSearch, setOpenSearch] = useState(false)
    const [value, setValue] = useState('')
    const ref = useRef(null);
    const prevValue = usePreviousState(value);
    useOutsideAlerter(ref, setOpenSearch);
    const getInputValue = (e: string) => {
        setValue(e)
    }

    useEffect(() => {
        if (value != '') {
            const updateQueryParams = setTimeout(() => {
                router.push(`/search?q=${value}`)
            }, 1000);

            return () => clearTimeout(updateQueryParams);
        } else if (prevValue !== undefined && value !== prevValue) {
            const updateQueryParams = setTimeout(() => {
                router.push(`/search`)
            }, 1000);

            return () => clearTimeout(updateQueryParams);
        }
    }, [value]);

    return (
        <>
            {!openSearch && router.query.q == undefined ?
                <div className={styles.searchBox} onClick={() => setOpenSearch(true)}>
                    <div className={styles.searchIconPosition}>
                        <SearchIcon />
                    </div>
                </div>
                :
                <div className={styles.extendSearch} ref={ref}>
                    <div className={styles.searchIconPosition}>
                        <SearchIcon />
                    </div>
                    <Input className={styles.input} getInputValue={(e) => getInputValue(e)} value={router.query.q} />
                </div>
            }
        </>
    )
}

export default Search