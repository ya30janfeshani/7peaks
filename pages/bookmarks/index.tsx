import React, { useState, useEffect } from 'react'
import NavBar from "@/src/components/navBar"
import styles from './bookmarks.module.scss'
import CardWithImage from '@/src/components/cardWithImage'
import { axiosApi } from '@/src/utils/axios'
import { newsApi } from '@/src/api'
import { IHomeNews } from '@/src/type'
import { usePreviousState } from '@/src/utils/usePreviousState'

const BookMark = () => {
    const [order, setOrder] = useState('newest')
    const [data, setData] = useState<IHomeNews[]>()
    const [loading, setLoading] = useState(false)
    const prevOrder = usePreviousState(order)

    useEffect(() => {
        fetchSearchData()
    }, [])

    useEffect(() => {
        if (prevOrder && prevOrder != order) {
            fetchSearchData()
        }
    }, [order])


    const fetchSearchData = () => {
        setLoading(true)
        axiosApi.get(newsApi({ section: 'news', order: order }))
            .then((res) => {
                setData(res.data.response.results)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
    }

    const getOrder = (e: string) => {
        setOrder(e)
    }

    if (loading) {
        return <main className="container loading" ><img src="/images/loading.svg" width={50} height={88} /></main>
    }
    return (
        <main className="container">
            <NavBar title="All bookmark" getOrder={(e) => getOrder(e)} />
            <div className={styles.articlesContainer}>
                {data?.map((value, index) =>
                    <CardWithImage
                        key={index}
                        borderColor="#D32F2F"
                        src={value.fields && value.fields.thumbnail}
                        title={value.webTitle}
                        id={value.id}
                    />
                )}

            </div>
        </main>
    )
}

export default BookMark