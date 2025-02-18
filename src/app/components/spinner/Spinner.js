import styles from '../spinner/spinner.module.css'

const Spinner = ({texto}) => {
  return (
    <div className='flex flex-col place-content-center mt-2 mb-1'>
    <span className={styles.loader}></span>
    <h3 className='font-bold'> {texto} </h3>
    </div>
  )
}

export default Spinner