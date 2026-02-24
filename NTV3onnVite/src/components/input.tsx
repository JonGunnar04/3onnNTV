

export function Input({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e); //e.target.value
    }
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(e)}

            />
        </div>
    )
}
