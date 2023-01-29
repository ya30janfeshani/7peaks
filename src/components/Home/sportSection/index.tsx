import styles from './sportSection.module.scss'
import CardWithImage from '../../cardWithImage'
import { IHomeNews } from '@/src/type'

interface IProps {
    data: IHomeNews[]
}

const SportSection = ({ data }: IProps) => {
    return (
        <div className={styles.sportSection}>
            <p className={styles.title}>Sports</p>
            <div className={styles.gridContainer}>
                {data.map((value, index) =>
                    index < 3 &&
                    <CardWithImage
                        key={index}
                        borderColor="#D32F2F"
                        src={value.fields && value.fields.thumbnail}
                        title={value.webTitle}
                        id={value.id}
                    />
                )}
            </div>
        </div>
    )
}

export default SportSection