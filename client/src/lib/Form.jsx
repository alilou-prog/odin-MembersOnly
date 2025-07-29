import styles from './styles.module.css'

export default function Form({ form }) {
    return (
        <>
            <h1>{form.title}</h1>
            <form className={styles} onSubmit={form.on_submit}>
                {form.inputs.map(input =>
                    <div key={input.name} className={styles.input}>
                        <label htmlFor={input.name} >{input.label}</label>
                        <input type={input.type} id={input.name} name={input.name}
                            placeholder={input.placeholder}
                            autoComplete='on' />
                    </div>
                )}
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}