import styles from './toast.module.scss'

interface IProps {
    children: React.ReactNode
    status: boolean
}

const Toast = ({ children, status }: IProps) => {
    return (
        <div className={`${styles.toast} ${status ? styles.green : styles.red}`} >
            {children}
        </div>
    )
}

export default Toast