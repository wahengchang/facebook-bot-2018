import TableHeader from '../../components/Table/TableHeader' 
import {formatDate} from '../../lib/date'
const dataInit = require('./dataInit')

const titleList = ['Spend', 'Category', 'User', 'CreatedAt']

const { turnDateToStr, getBeforeDate } = require('../../lib/date')

const agoDateStr = (agoNum) => turnDateToStr(getBeforeDate(agoNum))

export default class Cost extends React.Component {
    static async getInitialProps ({req, res}) {
        return dataInit({req, res})
    }
    
    render() {
      const {costList = []} = this.props
      const _1Date = agoDateStr(1)
      const _3Date = agoDateStr(3)
      const _7Date = agoDateStr(7)
      const _monthDate = agoDateStr(30)
      const sumTotal = arr => arr.reduce((accumulator, item) => accumulator + item.cost, 0)

      const clickHandler = () => console.log('clickHandler')

      return (
        <div className='successContainer'>
          <h1> <a href='/costs?limit=1000'> Your Spend </a></h1>
          <h2>Phone numbers</h2>

          <div className='toolBar'>
            <a href={`/costs?limit=1000&start=${_1Date}`} className="pure-button button-secondary">Today</a>
            <a href={`/costs?limit=1000&start=${_3Date}`} className="pure-button button-secondary">3 Days</a>
            <a href={`/costs?limit=1000&start=${_7Date}`} className="pure-button button-secondary">Week</a>
            <a href={`/costs?limit=1000&start=${_monthDate}`} className="pure-button button-secondary">Month</a>
          </div>
          <TableHeader titleList={titleList} clickHandler={clickHandler}>
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

          <div className="total">
              <h2> Total {sumTotal(costList)} </h2>
          </div>
          
          <style jsx>{`
            h1 a {
              text-decoration: none;
            }
            .successContainer {
              margin: auto auto;
              text-align: center;
              width: 80%;
              min-width: 300px;
              color: #3c3c3c;
              margin-top: 30px;
              margin-bottom: 30px;
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
            .toolBar {
              margin: 10px 0;
              text-align: right;
            }
            .toolBar a{
              margin-left: 10px;
            }
          `}</style>
        </div>)
    }
  }