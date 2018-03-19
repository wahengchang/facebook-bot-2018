import TableHeader from '../components/Table/TableHeader' 
const titleList = ['Spend', 'Category', 'User', 'CreatedAt']
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return year + ' ' + monthNames[monthIndex] + ' ' + day
}

export default class Cost extends React.Component {
    static async getInitialProps ({res}) {
        const cost = require('../model/costs')
        const costList = await cost.list()
        return {costList}
    }
    
    render() {
      const {costList} = this.props

      console.log('costList: ', costList)

      return (
        <div className='successContainer'>
          <h1> Success </h1>
          <h2>Phone numbers</h2>

          <TableHeader titleList={titleList}>

            {
              costList.map((item, index)=> {
                return <div className = "rTableRow" key={index}>
                  <div className="rTableCell">$ {item.cost}</div>
                  <div className="rTableCell">{item.category}</div>
                  <div className="rTableCell">{item.userId}</div>
                  <div className="rTableCell">{formatDate(new Date(item.createdAt))}</div>
                </div>
              })
            }

          </TableHeader>
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
  }