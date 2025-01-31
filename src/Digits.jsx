export function Digits({ time }) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.ceil(time % 60);

    return (
        <div className="digits">
            {minutes.toString().padStart(2, "0")}
            :
            {seconds.toString().padStart(2, "0")}
        </div>
    )
}