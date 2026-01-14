import { useMemo, useState } from "react"

type TipObject = {
    item: number;
    tip: string;
}

export default function TipCalculator() {

    const [input, setInput] = useState<string>("")
    const [showTips, setShowTips] = useState<boolean>(false)

    // use memo here is used as an example for optimizattion for bigger lists, here is trivial and not necessary
    const tips = useMemo(() => {
        return calculateTip(Number(input))
    }, [input])

    function calculateTip(value: number): TipObject[] {
        // remember to keep data function pure and just return the data, not JSX
        if (Number.isNaN(value)) return []

        return [5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(item => {
            // calculate the tip
            const tip = Number(((value / 100) * item)).toFixed(2)
            return {
                item,
                tip
            }
        })
    }

    return (
        <>
            <h1>My Tip Calculator</h1>
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => setShowTips(true)}>Calculate</button>
            <button onClick={() => setShowTips(false)}>Clear</button>
            <ul style={{listStyle: 'none', textAlign: 'center'}}>
            {
                showTips && (
                    tips.map(item => {
                        // remember to use usnique keys for rendered lists, in this case item.tip 
                        return <li key={item.item}>{item.item}% : tip = {item.tip} : Total = {Number(input) + Number(item.tip)}</li>
                    })
                )
            }
            </ul>
        </>
    )
}