import styles from './styles.module.css'

export default function Form({form}) {
    return (
        <>
        <h1>{form.title}</h1>
        <form className={styles} action="">
            {form.inputs.map(input => 
                <div className={styles.input}>
                    <label htmlFor={input.name} >{input.label}</label>
                    <input type={input.type} id={input.name} name={input.name} autoComplete='on'/>
                </div>
            )}
            <button type='submit'>Submit</button>
        </form>
        </>
    )
}