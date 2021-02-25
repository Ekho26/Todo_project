import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";

const FormComponent = ({formik}) => {

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          label="Task"
          variant="outlined"
          name="todoText"
          onChange={formik.handleChange}
          value={formik.values.todoText}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined" style={{ width: "100%" }}>
          <InputLabel prioritylabel>Priority</InputLabel>
          <Select
            label="Priority"
            name="priority"
            onChange={formik.handleChange}
            value={formik.values.priority}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Med">Med</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          label="due date"
          type="date"
          variant="outlined"
          name="dueDate"
          onChange={formik.handleChange}
          value={formik.values.dueDate}
          style={{ width: "100%" }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default FormComponent;