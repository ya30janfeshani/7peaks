import React, { useState, useEffect } from 'react'
import NavBar from "@/src/components/navBar"
import styles from './search.module.scss'
import CardWithImage from '@/src/components/cardWithImage'
import { axiosApi } from '@/src/utils/axios'
import { newsApi } from '@/src/api'
import { useRouter } from 'next/router'
import { IHomeNews } from '@/src/type'
import { usePreviousState } from '@/src/utils/usePreviousState'
import InfiniteScroll from 'react-infinite-scroll-component';
import { IResponse } from '@/src/type'

const Search = () => {
    const router = useRouter()
    const [order, setOrder] = useState('newest')
    const [data, setData] = useState<IResponse>()
    const [searchData, setSearchData] = useState<IHomeNews[]>([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const prevPage = usePreviousState(page)
    const prevQ = usePreviousState(router.query.q)


    useEffect(() => {
        if (data?.currentPage === data?.pages) {
            setSearchData([...searchData].reverse())
        } else {
            fetchForSort()
        }
    }, [order])

    const fetchForSort = () => {
        let length = searchData.length
        axiosApi.get(newsApi({ section: 'news', order: order, q: router.query.q, pageSize: data?.total }))
            .then((res) => {
                let newOrderData = res.data.response.results.slice(0, length)
                setSearchData(newOrderData)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setPage(1)
        if (data && data.pages === data.currentPage) {
            setHasMore(true)
        }
        if (prevQ !== router.query.q) {
            axiosApi.get(newsApi({ section: 'news', order: order, q: router.query.q, pageSize: 15, page: 1 }))
                .then((res) => {
                    setSearchData(res.data.response.results)
                    setData(res.data.response)
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }, [router.query.q])

    const fetchSearchData = () => {
        axiosApi.get(newsApi({ section: 'news', order: order, q: router.query.q, pageSize: 15, page: page }))
            .then((res) => {
                setSearchData([...searchData, ...res.data.response.results])
                setData(res.data.response)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const fetchMoreData = () => {
        if (data && data.pages === data.currentPage) {
            setHasMore(false)
            return;
        } else {
            setPage(page + 1)
        }
    };

    useEffect(() => {
        if (prevPage && prevPage !== page && page !== 1) {
            fetchSearchData()
        }
    }, [page])

    const getOrder = (e: string) => {
        setOrder(e)
    }

    if (loading) {
        return <main className="container loading" ><img src="/images/loading.svg" width={50} height={88} /></main>
    }
    return (
        <main className="container">
            <NavBar getOrder={(e) => getOrder(e)} title="Search results" />
            <div>
                {data && <InfiniteScroll
                    className={styles.searchContainer}
                    dataLength={searchData.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div>
                            ...loading
                        </div>
                    }
                >
                    {searchData && searchData.map((value, index) =>
                        <CardWithImage
                            key={index}
                            borderColor="#D32F2F"
                            src={value.fields && value.fields.thumbnail}
                            title={value.webTitle}
                            id={value.id}
                        />
                    )}
                </InfiniteScroll>
                }
            </div>
        </main>
    )
}

export default Search