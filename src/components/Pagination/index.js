import "./index.css"

const Pagination = ({initialUsersList, pageHandler, firstPage, lastPage}) => {
    const pageNumbers = []
    for (let page =1; page<Math.ceil(initialUsersList.length/10)+1; page++ ) {
        pageNumbers.push(page)
    }

    return(
        <div className="page-numbers">
            <p className="page-number" onClick={() => firstPage()}>First Page</p>
            {pageNumbers.map(page=> <div onClick={() => pageHandler(page)} className="page-number">{page}</div>)}
            <p className="page-number" onClick={() => lastPage()}>Last Page</p>

        </div>
    )

}

export default Pagination