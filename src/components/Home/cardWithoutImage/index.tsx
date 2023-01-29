import Link from 'next/link';
import styles from './cardWithoutImage.module.scss'

interface IProps {
    title: string;
    detail?: string;
    borderColor?: string;
    id: string
}

const CardWithoutImage = ({ title, detail, borderColor, id }: IProps) => {
    return (
        <Link href={`/article/${encodeURIComponent(id)}`}>
            <div className={styles.cardWithOutImage} style={{ borderBottom: `2px solid  ${borderColor}` }}>
                <p className={styles.title}>{title}</p>
                <p className={styles.detail}>{detail}</p>
            </div>
        </Link>
    )
}

export default CardWithoutImage