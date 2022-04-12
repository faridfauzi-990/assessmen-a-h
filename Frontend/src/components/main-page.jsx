import React ,{Component} from 'react'
// import { Route, Switch, Redirect } from "react-router-dom"; 
import Login from './login'
import Product from './product'
import RegForm from './reg-form' 
import DialogMaster from './dialog'
import NavBar from "./navbar";
import Axios from 'axios'; 

class MainComponent extends Component {
            state = { data: {
                                ic:'', name:'',address:'',email:'',username:'farid',password:'',passwordDisp:'' 
                            },
                        openDialogError: false, openDialogErrorText: 'Username or Password does not exists',
                        tab: 1, // 1 is login, 2 is product, 3 is registration
                         
                        currentPage: 1,
                        pageSize: 2
                    }

            componentDidMount() { 

                Axios.get("http://localhost:3001/api/users").then((response) => {                     
                    this.setState({dataFromJSON: response.data})
                })   
                 
            }

            closeDialogError = () => {
                this.setState({openDialogError: false})
            }

            handleChangeEditText = (input) => {
                let {data} = this.state

                for (let  i in data) {
                    if (input.id === i) {
                        if (input.id === 'passwordDisp') {
                            
                            data['password'] += input.value.replaceAll('*', '');
                            let tempVar = input.value;
                            data[input.id] = tempVar.replace(/./g, '*');                             

                            if (
                                // data.password &&
                                // input.value &&
                                // data.password.length &&
                                // input.value.length &&
                                data.password.length !== input.value.length) {
                                data.password = data.password.substr(0,input.value.length)
                            } 

                        } else {
                            data[input.id] = input.value
                        }
                        
                    }
                }
            
                this.setState({data})
            }

            handleChangeScreen = (param , paramJSON, addOrEdit ) => {
                let {tab, dataFromJSON, data, openDialogErrorText, openDialogError} = this.state;
                 
                  
                tab = param 

                if (param === 2) {
                    //login 

                    let access = false;
                    for (let i=0; i< dataFromJSON.length; i++) {
                        if (
                            data.username === dataFromJSON[i].username &&
                            data.password === dataFromJSON[i].password
                            ) {
                                access = true;
                            } 
                    }

                    if (access) {                         
                        } else {                         
                            this.setState({openDialogError: true, openDialogErrorText:'Username or password is not correct'})
                            return false;
                        }
                }
 
                
                if (addOrEdit === 'add') {
                    openDialogErrorText= 'Username '+data.username+' successfully created'
                    openDialogError= true;
                } 
                if (addOrEdit === 'edit') {
                    openDialogErrorText= 'Username '+data.username+' successfully edited'
                    openDialogError= true;
                }

                this.setState({
                     tab
                    ,dataFromJSON: paramJSON?paramJSON:dataFromJSON
                    , openDialogErrorText
                    , openDialogError 
                })
                 
            }

            handlePageChange = tab => {                 
                this.setState({currentPage: tab})
            } 

            submitDialog = () => {
                 
                let {  data} = this.state;

                if (data.username === '') {
                    this.setState({openDialogError:true,openDialogErrorText:'Name cannot be empty'})
                    return false;
                }

                if (data.password === '') {
                    this.setState({openDialogError:true,openDialogErrorText:'Password cannot be empty'})
                    return false;
                }

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
    
                    this.setState({dataFromJSON: response.data, openDialogError: false})
                })  
                
            }

            handleOpenDialog = flag => {
                // let {openDialogError} = this.state;
                 let {data} = this.state;
                 data.name = '';
                data.ic='';
                data.email = '';
                data.address = '';
                data.username = '';
                data.password = '';
                this.setState({
                    data:data,
                    openDialogError: flag,
                    openDialogErrorText: 'Please fill in the item information'
                })
            }

            handleClear = (data) => {
                this.setState({data})
            }

            openDialogAndNotice = (param) => {

                this.setState({ 
                    openDialogError:true,
                    openDialogErrorText: param
                })
            }

            checkEmpty =(param)=>{
                this.setState({openDialogError:true,openDialogErrorText:param})
            }

        render() { 
        let {   productItem,                
                currentPage,
                pageSize,
                data, tab, dataFromJSON, openDialogError, openDialogErrorText
            } = this.state;
 
             

        return (
            <React.Fragment>
                <NavBar
                tab={tab}
                handleChangeScreen={this.handleChangeScreen}                 
                />
                    {tab === 1 && ( 
                        <Login 
                            data={data}
                            {...this.props}
                            handleChangeScreen={this.handleChangeScreen}
                            handleChangeEditText={this.handleChangeEditText}
                            handleClear={this.handleClear}
                         /> 
                    )}     
                    {tab === 2 && ( 
                        <Product {...this.props} 
                            data={data}
                            productItem={dataFromJSON}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            handlePageChange={(x) => this.handlePageChange(x)}
                            handleOpenDialog={(y) => this.handleOpenDialog(y)}
                        /> 
                    )}  
                    {tab === 3 && ( 
                        <RegForm
                            data={data}
                            {...this.props}
                            dataFromJSON={dataFromJSON}
                            handleChangeScreen={this.handleChangeScreen}
                            handleChangeEditText={this.handleChangeEditText}
                            handleClear={this.handleClear}
                            openDialogAndNotice={this.openDialogAndNotice}
                          /> 
                    )}

                <DialogMaster
                    data={data}
                    openDialogFlag={openDialogError}
                    textToShow={openDialogErrorText} 
                    buttonNo={this.closeDialogError}    
                    buttonYes={this.submitDialog} 
                    handleChangeEditText={this.handleChangeEditText}  
                  />

            </React.Fragment>

        );
    }
}
 
export default MainComponent;