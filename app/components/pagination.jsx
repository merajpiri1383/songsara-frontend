
export default function Pagination({ currentPage, setCurrentPage, count }) {
    let pageList = [];
    const pages = Math.floor(count / 19)

    for (let i = 1; i < pages + 1; i++) {
        pageList.push(i);
    }

    return (
        <div className="w-full my-12 gap-4 flex items-center justify-center flex-row-reverse">
            {
                currentPage > 1 && <button
                    className="bg-zinc-800 border border-zinc-500 text-white font-semibold rounded-md w-16 h-12 hover:bg-zinc-700 active:scale-110"
                    onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
            }
            {
                pageList.map((item, index) => {
                    return (
                        <button key={index}
                            onClick={() => setCurrentPage(item)}
                            className={`border border-zinc-500 text-white font-semibold rounded-md w-16 h-12 hover:bg-zinc-700 active:scale-110 
                            ${item==currentPage  ? "bg-zinc-700" : "bg-zinc-800"}`}>
                            {item}
                        </button>
                    )
                })
            }
            {
                currentPage < pages + 1 && <button
                    className="bg-zinc-800 border border-zinc-500 text-white font-semibold rounded-md w-16 h-12 hover:bg-zinc-700 active:scale-110"
                    onClick={() => setCurrentPage(currentPage + 1)}>next</button>
            }
        </div>
    )
};