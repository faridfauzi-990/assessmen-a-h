// sfc starts
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip
} from "@material-ui/core"; 

import { withStyles } from "@material-ui/core/styles";
import {
  Warning
  // NotificationImportant // maybe for future, this icon need
} from "@material-ui/icons";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    "&:hover": {
      transition: "0.3s",
      transform: "scale(1.1)"
    },
    float: "right"
  }
});

const DialogMaster = props => {
  const { data, openDialogFlag, buttonNo, buttonYes,  textToShow, handleChangeEditText } = props;

  const handleChangeTextBox =({currentTarget: input}) => {
     
    handleChangeEditText(input)
}

  return (
    <div>
      <Dialog
        open={openDialogFlag}
        onClose={buttonNo}
        aria-labelledby="form-dialog-title"
      >
        {textToShow  && textToShow.indexOf(" exists") > -1 && (
          <DialogTitle
            id="form-dialog-title"
            style={{ backgroundColor: "#f8d7da" }}
          >
            <div style={{ textAlign: "center" }}>
              <Warning />
            </div>
          </DialogTitle>
        )}
        <DialogContent style={{ padding: "8px 32px 32px" }}>
          <DialogContentText>{textToShow} </DialogContentText>
        </DialogContent>

        {textToShow  && textToShow.indexOf(" information") > -1 &&  (
        <table  border="1" className="Table-color" >                    
                        <thead>
                            <tr>
                            <th width='20%'>  </th>
                            <th width='40%'>  </th> 
                            </tr>
                        </thead>        
                        
                        <tbody>                             
                                    <tr key={1} >
                                        <td width='50%'>
                                            Participant Name:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'name'}                  
                                                placeholder="Fill in Name"
                                                value={data.name}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>    
                                    <tr key={2}>
                                        <td width='50%'>
                                            Ic Number:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'ic'}                  
                                                placeholder="Fill in IC number"
                                                value={data.ic}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>

                                    <tr key={3}>
                                        <td width='50%'>
                                            Email:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'email'}                  
                                                placeholder="Fill in email"
                                                value={data.email}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>

                                    <tr key={4}>
                                        <td width='50%'>
                                            Address:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'address'}                  
                                                placeholder="Fill in address"
                                                value={data.address}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>

                                    <tr key={5}>
                                        <td width='50%'>
                                            Username:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'username'}                  
                                                placeholder="Fill in username"
                                                value={data.username}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>

                                    <tr key={6}>
                                        <td width='50%'>
                                            Password:
                                        </td>
                                        <td width='50%'>
                                        <TextField
                                                id ={'password'}                  
                                                placeholder="Fill in password"
                                                value={data.password}
                                                onChange={handleChangeTextBox}
                                            />
                                        </td>
                                    </tr>
                                
                             
                        </tbody>
                    </table> 
)}
        

        <DialogActions >                

        {/* Please fill in the item information */}
        {textToShow  && textToShow.indexOf(" information") > -1 &&  (
            <Button variant="contained" color="primary" onClick={buttonYes}>
            Confirm
          </Button>
        )}

          <Button variant="contained" color="secondary" onClick={buttonNo}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(DialogMaster);