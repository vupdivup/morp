export function Digits({ value }) {
    return (
        <div className="digits">
            {value.toString().padStart(2, "0")}
        </div>
    )
}