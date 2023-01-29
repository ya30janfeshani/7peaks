import { useState, useRef } from 'react'
import styles from './dropDown.module.scss'
import { useOutsideAlerter } from '@/src/utils/useOutSideClick'

interface IProps {
    getSort: (e: string) => void
}

const DropDown = ({ getSort }: IProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('Newest first')
    const ref = useRef(null);
    useOutsideAlerter(ref, setOpen);

    const handleClick = (e: string) => {
        setOpen(false)
        setSelected(e)
        if (e === 'Newest first') {
            getSort('newest')
        } else {
            getSort('oldest')
        }
    }
    return (
        <div className={styles.dropDownContainer}>
            <div className={styles.dropDown} onClick={() => setOpen(true)}>
                <p className={styles.sortText}>{selected}</p>
            </div>
            {open &&
                <div className={styles.dropDownOpen} ref={ref}>
                    <p className={styles.ListText} onClick={() => handleClick('Newest first')}>Newest first</p>
                    <p className={styles.ListText} onClick={() => handleClick('Oldest first')}>Oldest first</p>
                </div>
            }
        </div>
    )
}

export default DropDown