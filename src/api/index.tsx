

export const newsApi = (props: { section: string, order: string, q?: string | undefined | string[], pageSize?: number, page?: number }) =>
    `/search?api-key=3d149bb1-1c06-49c0-8e6b-30cc45257a56&show-fields=thumbnail,body&section=${props.section}&order-by=${props.order}${props.q ? `&q=${props.q}` : ''}
    ${props.pageSize ? `&page-size=${props.pageSize}` : ''}${props.page ? `&page=${props.page}` : ''}`

export const detailArticleApi = (props: { slug: string | string[] | undefined }) =>
    `/${props.slug}?api-key=3d149bb1-1c06-49c0-8e6b-30cc45257a56&show-fields=headline,body&show-elements=all`