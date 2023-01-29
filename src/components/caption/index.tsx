import styles from './caption.module.scss'

interface IProps {
    title: string;
    detail?: string;
    borderColor?: string
}

const Caption = ({ title, detail, borderColor }: IProps) => {
    return (
        <div className={styles.caption} style={{ borderBottom: `2px solid  ${borderColor}` }}>
            <p className={styles.title}>{title}</p>

            <p className={styles.detail} dangerouslySetInnerHTML={{ __html: detail ? detail : '' }} />
        </div>
    )
}

export default Caption