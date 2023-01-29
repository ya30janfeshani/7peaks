import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './articleid.module.scss'
import Link from 'next/link'
import BookMarkIcon from '@/public/Icon/bookmarkIcon'
import BookMarkOffIcon from '@/public/Icon/bookmarkOffIcon'
import { axiosApi } from '@/src/utils/axios'
import { detailArticleApi } from '@/src/api'
import { IDetailNews } from '@/src/type'
import moment from 'moment'
import Toast from '@/src/components/toast'
import { usePreviousState } from '@/src/utils/usePreviousState'



const ArticleID = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<IDetailNews>()
    const [bookmark, setBookmark] = useState(false)
    const [toastStatus, setToastStatus] = useState(false)
    const prevBookmark = usePreviousState(bookmark)

    useEffect(() => {
        if (router.query.articleId) {
            fetchDetailArticle()
        }
    }, [router.query.articleId])

    const fetchDetailArticle = () => {
        axiosApi.get(detailArticleApi({ slug: router.query.articleId }))
            .then((res) => {
                setData(res.data.response.content)
                setLoading(false)
            }).catch((err) =>
                setLoading(false)
            )
    }

    const addBookmark = () => {
        setBookmark(!bookmark)
    }

    useEffect(() => {
        if (prevBookmark !== undefined && prevBookmark !== bookmark) {
            setToastStatus(true)
            const interval = setInterval(() => {
                setToastStatus(false)
            }, 3000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [bookmark]);

    const date = data && moment(data.webPublicationDate).format('dddd D MMMM YYYY h.mm [BST]')

    if (loading) {
        return <main className="container loading" ><img src="/images/loading.svg" width={50} height={88} /></main>
    }

    const bookmarkStatus = bookmark ? <span>Remove BOOKMARK</span> : <span>Add BOOKMARK</span>


    return (
        data &&
        <main className={`${styles.articleid} container`}>
            <div>
                <button className={styles.bookmark} onClick={() => addBookmark()}>
                    <BookMarkIcon />
                    {bookmarkStatus}
                </button>
                <p className={styles.date}>{date}</p>
                <p className={styles.title}>{data.webTitle}</p>
                <p className={styles.subtitle}>{data.fields && data.fields.headline}</p>
                <div className={styles.body} dangerouslySetInnerHTML={{ __html: data.fields && data.fields.body }} />
            </div>
            <div className={styles.rightDiv}>
                <figure>
                    <img src="/images/article.jpg" width={'100%'} />
                    <figcaption>A woman walks along a flooded road amidst a storm in the Masiphumelele informal settlement in Cape Town Photograph: Nic Bothma/EPA</figcaption>
                </figure>
            </div>
            {toastStatus &&
                <Toast status={bookmark} >
                    {bookmark ?
                        <div className={styles.align}>
                            <BookMarkIcon />
                            <span>Saved To Bookmarks</span>
                        </div>
                        :
                        <div className={styles.align}>
                            <BookMarkOffIcon />
                            <span>Removed from Bookmarks</span>
                        </div>
                    }
                </Toast>
            }

        </main>
    )
}

export default ArticleID