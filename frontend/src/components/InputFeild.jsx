
export function InputFeild({type, placeholder, label, onChange}) {
    return <div className="flex flex-col p-2">
        <div className="font-medium">{label}</div>
        <input className="wifull border rounded p-1 mt-2"
           type={type} onChange={onChange} placeholder={placeholder} />
    </div>
}