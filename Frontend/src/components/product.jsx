// import { Table } from '@material-ui/core'
import React ,{Component
    // , Fragment
} from 'react'
import Pagination from './pagination'
import { paginate } from "../utils/paginate"
import { Add } from '@material-ui/icons';
import { Tooltip, Button } from "@material-ui/core";

class Product extends Component {
     
    render() { 
        let { 
            // data,
            // productItem:allProdItem,
            productItem: allProdItem,
              currentPage,
               pageSize,
               handlePageChange ,
               handleOpenDialog
            } =  this.props;
        let {length: count } = this.props.productItem

        if (count === 0) return <p>There are no user in the databse</p>  

        const productItem = paginate(allProdItem, currentPage, pageSize)

        return (
            <React.Fragment>
            <div className="App">
                        <header className="App-header">     
                        <Tooltip title='Add item'>
                            <Button 
                            style={{backgroundColor:'grey', margin:5, padding: 5}}
                                onClick={() => handleOpenDialog(true) }
                            >
                                <Add/>
                            </Button>
                        </Tooltip>
                    <table  border="1" className="Table-color" >                    
                        <thead>
                            <tr>
                            <th width='25%'> Name </th>
                            <th width='25%'> Email </th>
                            <th width='25%'> Adress </th>
                            <th width='25%'> Username </th> 
                            </tr>
                        </thead>        
                        
                        <tbody>
                            {productItem.map( index => (
                                <tr key={index.prodId} >
                                    <td width='25%'>{index.name}</td>
                                    <td width='25%'>{index.email}</td>
                                    <td width='25%'>{index.address}</td>
                                    <td width='25%'>{index.username}</td>
                                     
                                </tr>    
                            ))}
                        </tbody>
                    </table> 
                    
                    <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage} 
                    onPageChange={handlePageChange}
                    />
                    </header>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Product;