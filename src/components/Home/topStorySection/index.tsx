
import styles from './topStorySection.module.scss'
import CardWithImage from '../../cardWithImage'
import CardWithoutImage from '../cardWithoutImage'
import { IHomeNews } from '@/src/type'

interface IProps {
    data: IHomeNews[]
}

const TopStoriesSection = ({ data }: IProps) => {

    const topGridList = (index: number, value: IHomeNews) => {
        switch (index) {
            case 0: return <div className={styles.item1} key={index}>
                <CardWithImage
                    borderColor="#388E3C"
                    src={value.fields && value.fields.thumbnail}
                    id={value.id}
                    title={value.webTitle}
                    detail={value.fields.body}
                />
            </div>;
            case 1: return <CardWithImage
                key={index}
                borderColor="#D32F2F"
                src={value.fields && value.fields.thumbnail}
                title={value.webTitle}
                id={value.id}

            />;
            case 2: return <CardWithImage
                key={index}
                borderColor="#FFC107"
                src={value.fields && value.fields.thumbnail}
                title={value.webTitle}
                id={value.id}
            />;
            case 3: return <CardWithoutImage key={index} borderColor='#2196F3' title={value.webTitle} id={value.id} />;
            case 4: return <CardWithoutImage key={index} borderColor='#388E3C' title={value.webTitle} id={value.id} />;
            default: return <h1>No project match</h1>
        }
    }

    return (
        <section className={styles.topStoriesSection} >
            <div className={styles.gridContainer}>
                {data.map((value, index) =>
                    index < 5 && (
                        topGridList(index, value)
                    )
                )}
            </div>
            <div className={styles.gridContainer3}>
                {data.map((value, index) =>
                    (index > 4 && index < 8) &&
                    <CardWithImage
                        key={index}
                        borderColor="#D32F2F"
                        src={value.fields && value.fields.thumbnail}
                        title={value.webTitle}
                        id={value.id}
                        detail={value.fields.body}
                    />
                )}
            </div>
        </section >
    )
}

export default TopStoriesSection