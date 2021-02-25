import React from "react";
import {
  IconButton,
  ButtonGroup,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import Fade from '@material-ui/core/Fade';
import {Droppable, Draggable} from 'react-beautiful-dnd';

function TodoListComponent(props) {
  return (
    <Droppable droppableId = "todolist">
      { (provided) =>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ marginTop: "1.5em" }}
        { ...provided.droppableProps}
          ref = {provided.innerRef}
      >
        {props.todos.filter((t) => {if (props.priorityFilter ===''){
              return true;
            } else {
              return t.priority ===
              props.priorityFilter
            }
          }
          ).map((todo, i) => {
            return (
              <Draggable draggableId = 
                {todo.id} index = {i}>
                  {(provided) => (
                  <Fade in={todo.in} 
                        timeout={500}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}>
                    <Grid item style = {
                                {userSelect: 'none'}}>
                      <Paper style={{ padding: "0.8em" }} elevation={4}>
                        <Grid container alignItems="center" justify="space-between">
                          <Grid item>
                            <Typography
                              variant="h6"
                              style={{
                                textDecoration: todo.done ? "line-through" : "none",
                              }}
                            >
                              {todo.val}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Chip
                              size="small"
                              color="primary"
                              label={todo.priority}
                              onClick={() => {
                                props.handlePriorityClick(todo.priority);
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Typography variant="body2">Due: {todo.dueDate}</Typography>
                        <ButtonGroup
                          color="secondary"
                          aria-label="outlined primary button group"
                          variant="text"
                          size="small"
                          style={{ paddingTop: "12px" }}
                        >
                          <IconButton>
                            <EditIcon
                              onClick={() => {
                                props.handleEditClick(todo);
                              }}
                            />
                          </IconButton>
                          <IconButton>
                            <CheckIcon
                              onClick={() => {
                                props.handleMarkDone(todo);
                              }}
                            />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon
                              onClick={() => {
                                props.handleDelete(todo.id);
                              }}
                            />
                          </IconButton>
                        </ButtonGroup>
                      </Paper>
                    </Grid>
                  </Fade>
                )}
              </Draggable>
            );
          })}
        </Grid>
      }
    </Droppable>
  )
}
export default TodoListComponent;