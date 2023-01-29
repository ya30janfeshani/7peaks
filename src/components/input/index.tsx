
interface IProps {
    className: string;
    getInputValue: (e: string) => void;
    value: string | undefined | string[]
}

const Input = ({ className, getInputValue, value }: IProps) => {
    const handleChange = (e: string) => {
        getInputValue(e)
    }

    return (
        <input type="text" placeholder='Search all news' onChange={(e) => handleChange(e.target.value)} className={className} defaultValue={value} />
    )
}

export default Input