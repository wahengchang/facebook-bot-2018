export default ({titleList, children, clickHandler}) => {
    return (< div className = "rTable" > 
                <div className="rTableRow">
                    {
                        titleList.map((item, index)=> (
                            <div className="rTableHead" key={index} onClick={clickHandler}>
                                <strong>{item}</strong>
                            </div>
                        ))
                    }
                </div>
                {children}
                <style jsx>{`
                    .successContainer {
                    margin: auto auto;
                    text-align: center;
                    width: 80%;
                    min-width: 300px;
                    color: #3c3c3c;
                    }
                    .rTable {
                        display: table;
                        width: 100%;
                    }
                    .rTableRow {
                        display: table-row;
                    }
                    .rTableHeading {
                        display: table-header-group;
                        background-color: #ddd;
                    }
                    .rTableCell, .rTableHead {
                        display: table-cell;
                        padding: 3px 10px;
                        border: 1px solid #999999;
                    }
                    .rTableHeading {
                        display: table-header-group;
                        background-color: #ddd;
                        font-weight: bold;
                    }
                    .rTableFoot {
                        display: table-footer-group;
                        font-weight: bold;
                        background-color: #ddd;
                    }
                    .rTableBody {
                        display: table-row-group;
                    }
                `}</style>
            </div>)
}