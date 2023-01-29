import styles from './cardWithImage.module.scss'
import Caption from '../caption'
import Link from 'next/link';

interface IProps {
    src: string;
    title: string;
    detail?: string;
    borderColor?: string;
    id: string
}

const CardWithImage = ({ src, title, detail, borderColor, id }: IProps) => {
    return (
        <Link href={`/article/${encodeURIComponent(id)}`}>
            <div className={styles.cardWithImage}>
                {src ?
                    <figure>
                        <img src={src ? src : 'https://media.guim.co.uk/fa1c77df96bf18b1c2139ebae45d17bfd948fa90/0_293_5184_3110/500.jpg'} width="100%" />
                    </figure>
                    :
                    <div className={styles.placeholderImage}>
                        <figure style={{ textAlign: 'center' }}>
                            <img src={src ? src : '/images/Logo_White.png'} width={'50%'} />
                        </figure>
                    </div>
                }
                <Caption title={title}
                    detail={detail ? detail : ''}
                    borderColor={borderColor ? borderColor : ''}
                />
            </div>
        </Link >
    )
}

export default CardWithImage