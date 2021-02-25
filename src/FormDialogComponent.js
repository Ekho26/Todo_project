import React from "react";
import FormComponent from './FormComponent';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

function FormDialogComponent(props) {

  return (
    <Dialog open={props.open} onClose={props.handleClose} style={{minWidth:"60vw"}}>
      <DialogTitle>{props.isEditMode? "Update ":"Add " } todo</DialogTitle>
      <DialogContent>
        <FormComponent formik={props.formik}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button color="primary" onClick={props.handleSubmit}>{props.isEditMode? "Update": "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialogComponent;