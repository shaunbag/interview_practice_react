import { useState } from "react"

type Sym = '+' | '-' | '/' | '*' | null;
//instantiate a sybols array to map to buttons
const symbols: Exclude<Sym, null>[] = ['+', '-', '/', '*']

export default function Calc() {

    const [leftSide, setLeftSide] = useState<string>("")
    const [rightSide, setRightSide] = useState<string>("")
    const [symbol, setSymbol] = useState<Sym>(null)

    // remember do not use parseInt this is buggy here and doesnt handle decimals 1.5 -> 1
    function calculate(leftSide: string, rightSide: string, symbol: Sym): number | null {
        //convert to Number
        const a = Number(leftSide);
        const b = Number(rightSide);

        //also check both are numbers Number.isNaN better as stricter and does not coerce values
        if (Number.isNaN(a) || Number.isNaN(b)) return null
        //check or division by zero
        if (symbol === "/" && b === 0) return null

        //return the pure values
        switch (symbol) {
            case "+":
                return a + b
            case "-":
                return a - b
            case "/":
                return a / b
            case "*":
                return a * b
            default:
                return null;
        }
    }

    function handleEnterNumber(num: string) {
        if (symbol === null) {
            setLeftSide(prev => prev + num)
        } else {
            setRightSide(prev => prev + num)
        }
    }

    return (
        <>
            <p>{leftSide} {symbol ?? ""} {rightSide}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
                {/* map through an array of the numbers rather than individual buttons for better  handling of extending and reduce inconsistencies*/}
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].map(item => {
                        return <button key={item} onClick={() => handleEnterNumber(item)}>{item}</button>
                    })
                }
                {/** handle the symbols seperately due to differing functions, also instatiate typing on the symbols DO NOT use item as Sym TS cannot verify correctness */}
                {
                    symbols.map(item => {
                        return <button key={item} onClick={() => setSymbol(item)}>{item}</button>
                    })
                }
                <button value={"="} onClick={() => {
                    // handle the results of calculate leaving calculate to be a pure function not updating state
                    let result = calculate(leftSide, rightSide, symbol)
                    // check for null values
                    if (result !== null) {
                        setLeftSide(String(result))
                        setRightSide("")
                        setSymbol(null)
                    }
                }}>=</button>
                <button onClick={() => {
                    // clear down all state ready for next calculation
                    setLeftSide("")
                    setRightSide("")
                    setSymbol(null)
                }}>AC</button>
            </div>
        </>
    )
}