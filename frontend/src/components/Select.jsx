export default function Select({ options, placeholder, onChange }) {
    return (
        <select className="border p-2 rounded-md cursor-pointer" onChange={onchange}>
            <option value="" disabled selected>{placeholder}</option>
            {options.map(opt => (
                <option className="font-mono" value={opt.toLowerCase()} key={opt}>{opt}</option>
            ))}
        </select>
    )
}