import { useState } from "react"

// use a type definition for the validation result
type validationResult = {
    valid: boolean;
    message: string;
}

export default function FormValidation() {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [result, setResult] = useState<validationResult>({valid: false, message: ""})

    // seperate the validation into distinct functions, avoid useEffects here unless calling these funcitons inside the useEffect
    function validatePassword(password: string) {
        if (!/([A-Za-z])/.test(password)) { return "password must contain letters" } // Regex for checking password validity
        if (!/([0-9])/.test(password)) { return "password must contain numbers" }
        if (!/([£$&+,:;=?@#|'<>.^*()%!-])/.test(password)) { return "password must contain special characters" }
        return ""
    }

    function validateConfirmedPassword(password: string, confirmed: string) {
        if (password !== confirmed) { return "passwords dont match" }
        return ""
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() // prevent the form from submitting 
        // but use the React.FormEvent<HTMLFormElement> e to checkValidty on the form still
        if (!e.currentTarget.checkValidity()) {
            return
        }
        const passwordCheck = validatePassword(password) // seperate the validation function calls so they are only called once
        if (passwordCheck !== "") { // then pass the results into the check
            setResult({valid: false, message: passwordCheck})
            return
        }
        const confirmedPasswordCheck = validateConfirmedPassword(password, confirmedPassword)
        if (confirmedPasswordCheck !== "") {
            setResult({valid: false, message:confirmedPasswordCheck})
            return
        }

        // obviously never display passwords in the browser, this is just for logging in this instance as an example of the form data
        setResult({valid: true, message: `Username: ${username}, Email: ${email}, Password: ${password}`})


        // this time out again isnt something we would use in production but is here simply to reset this example
        setTimeout(() => {
            reset()
        }, 5000)
    }

    // seperated logic to reset the form
    function reset(){
        setResult({valid: false, message: ""})
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmedPassword("")
    }

    return (
        <div>
            <h1>Form Validation</h1>
            <form onSubmit={handleSubmit}>
                <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                <input required type="password" value={confirmedPassword} onChange={(e) => {
                    setConfirmedPassword(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>

            <p>{result.message}</p>
        </div>
    )
}