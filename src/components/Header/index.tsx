import styles from './header.module.scss'
import Image from 'next/image'
import Search from '../search'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.innerContainer}>
                    <Link href="/">
                        <figure>
                            <Image src="/images/logo.svg" width={142} height={56} alt={'seven peak logo'} />
                        </figure>
                    </Link>
                    <div className={styles.searchContainer}>
                        <Search />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header