import React ,{Component} from 'react'
import {TextField, Tooltip} from "@material-ui/core";
import { Button 
    // , Typography
 } from "@material-ui/core";
// import { toast } from "react-toastify";
import {Clear,Check} from "@material-ui/icons";
import Axios from 'axios'; 
   
 

class RegForm extends Component {
    
    componentDidMount () {
        let {data, dataFromJSON, handleClear} = this.props;
        
        for  (let i=0; i< dataFromJSON.length; i++) {
            if (data.username === dataFromJSON[i].username)
            {
                data.name = dataFromJSON[i].name
                data.address = dataFromJSON[i].address
                data.email = dataFromJSON[i].email
                data.ic = dataFromJSON[i].ic
            }
        }
        handleClear(data)
    }

    handleChangeTextBox =({currentTarget: input}) => {        
         
        let {handleChangeEditText} = this.props;
        handleChangeEditText(input)
    }

    handleClick = param => {
        let  { handleChangeScreen, dataFromJSON, data, openDialogAndNotice} = this.props; 
        let doNotAdd = false;
        let addOrEdit = '';
 
        if (data.username === '') {
             openDialogAndNotice('Username cannot be empty')
            return false;
        }

        if (data.password === '') {
            openDialogAndNotice('Password cannot be empty')
           return false;
       }

        for (let i=0; i< dataFromJSON.length; i++) {
            if (dataFromJSON[i].username === data.username) {
                doNotAdd = true;
let tempObj = {
    name:data.name,
    ic:data.ic,
    email:data.email,
    address:data.address,
    username:data.username,
    password:data.password
} 
                Axios.post(`http://localhost:3001/api/users/edit/`+data.username,tempObj).then((response) => {                     
                    console.log('done load 3')  ;
                    
                    dataFromJSON = response.data
                    handleChangeScreen(param, dataFromJSON ,  addOrEdit)
                })

                addOrEdit = 'edit';
                // dataFromJSON[i].username = data.username
                // dataFromJSON[i].name = data.name
                // dataFromJSON[i].email = data.email
                // dataFromJSON[i].address = data.address
                // dataFromJSON[i].password = data.password
            }
        }

        if (!doNotAdd) {
            addOrEdit = 'add'

            let tempObj =
            {
                ic: data.ic,
                name: data.name, 
                email: data.email,
                address: data.address,
                username: data.username,
                password: data.password
            }

            Axios.post("http://localhost:3001/api/users", tempObj).then((response) => { 
                   console.log('done load 1')  ;
  
                    dataFromJSON = response.data
                    handleChangeScreen(param, dataFromJSON ,  addOrEdit)
            })

        //   dataFromJSON.push({
        //     name: data.name,
        //     email: data.email,
        //     address: data.address,
        //     username: data.username,
        //     password: data.password
        //     })
        }
    
           
        
    }

    handleClearSubPage = () => {
        let {handleClear, data} = this.props    

        data.name = '';
        data.ic='';
        data.email = '';
        data.address = '';
        data.username = '';
        data.password = '';
        handleClear(data)

    }

    render() { 
        let {data, handleClear} = this.props;
        return ( 
            <React.Fragment>
                <div className="App">
                        <header className="App-header">     
                 <table className="Table-color" >
                <tbody>
                    <thead style={{textAlign:"center"}}>
                        <b> User Profile Information </b>
                    </thead>
                <tr key={1}>
                <td width="50%">Name: </td>
                <td width="50%">
                    <TextField   
                    id ={'name'}                  
                    placeholder="David Beckham"
                    value={data.name}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>
                <tr key={6}>
                <td width="50%">ic: </td>
                <td width="50%">
                    <TextField                     
                    id ={'ic'}                  
                    placeholder="12321321-12-312123"
                    value={data.ic}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>
                <tr key={2}>
                <td width="50%">email: </td>
                <td width="50%">
                    <TextField                     
                    id ={'email'}                  
                    placeholder="farid@affin-hwang.com"
                    value={data.email}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>
                <tr key={3}>
                <td width="50%">address: </td>
                <td width="50%">
                    <TextField                     
                    id ={'address'}                  
                    placeholder="B-7-3A, Block Z West, Menara Pj2, 46050 Petaling Jaya, Selangor"
                    value={data.address}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>
                <tr key={4}>
                <td width="50%">username: </td>
                <td width="50%">
                    <TextField                     
                    id ={'username'}                  
                    placeholder="farid"
                    value={data.username}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>

                <tr key={5}>
                <td width="50%">Password: </td>
                <td width="50%">
                    <TextField   
                    id ={'password'}                  
                    placeholder="ASD890@..asd"
                    value={data.password}
                    onChange={this.handleChangeTextBox}
                    />
                </td>                     
                </tr>
 

            <tr>
                     <td>
                         <Tooltip title='Submit' >
                         <Button
                         style={{ 
                            backgroundColor: "grey", 
                          }}
                         onClick={() => this.handleClick(1)}
                         >
                             <Check style={{color: "#e0e0e0" }} />
                             </Button>
                             </Tooltip>
                     </td>

                     <td>
                        <Tooltip title='Clear inputs' >
                         <Button
                         style={{ 
                            backgroundColor: "grey"
                          }}
                         onClick={this.handleClearSubPage}

                         >
                             <Clear style={{ color: "#e0e0e0" }} />
                             </Button>
                             </Tooltip>
                     </td>
                     </tr>

            </tbody>
            </table>
            </header>
            </div>
            </React.Fragment>
         );
    }
}
 
export default RegForm;