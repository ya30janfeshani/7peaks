import styles from './navBar.module.scss'
import Link from 'next/link'
import BookMarkIcon from '@/public/Icon/bookmarkIcon'
import DropDown from '../dropDown'

interface IProps {
    title: string,
    getOrder: (e: string) => void
}

const NavBar = ({ title, getOrder }: IProps) => {

    const getSort = (e: string) => {
        getOrder(e)
    }

    return (
        <div className={styles.navBar}>
            <p className={styles.title}>{title}</p>
            <div className={styles.right}>
                <Link href="/bookmarks">
                    <button className={styles.bookmark}>
                        <BookMarkIcon />
                        <span>View BOOKMARK</span>
                    </button>
                </Link>
                <DropDown getSort={(e) => getSort(e)} />
            </div>
        </div>
    )
}

export default NavBar