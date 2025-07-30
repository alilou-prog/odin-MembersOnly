import { useState } from 'react'
import styles from './styles.module.css'

export default function Form({ form }) {
    const [error, set_error] = useState("")
    return (
        <>
            <h1>{form.title}</h1>
            <div className="description">{form.description}</div>
            <form className={styles.form} onSubmit={(e) => form.on_submit(e, set_error)}>
                {form.inputs.map(input =>
                    <div key={input.name} className={styles.input}>
                        <label htmlFor={input.name} >{input.label}</label>
                        <input type={input.type} id={input.name} name={input.name}
                            placeholder={input.placeholder}
                            autoComplete='on' />
                    </div>
                )}
                <button type='submit'>Submit</button>
                <div className="error">
                    {error}
                </div>
            </form>
        </>
    )
}