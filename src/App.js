import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import uuid from "react-uuid";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blue, indigo, grey, deepPurple, deepOrange } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import CSSBaseline from "@material-ui/core/CssBaseline";
import HeaderComponent from "./HeaderComponent";
import TodoListComponent from "./TodoListComponent";
import FormDialogComponent from "./FormDialogComponent";
import Zoom from "@material-ui/core/Zoom";
import { DragDropContext } from "react-beautiful-dnd";

function useLocalStorageState(key, defaultValue ='') {
  const [state, setState] = React.useState(
    () => JSON.parse(window.localStorage.getItem(key)) || defaultValue,
  )
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])
  return [state, setState]
}

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10);
};

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? deepPurple['A700'] : indigo[900],
      },
      secondary: {
        main: isDarkMode ? deepOrange[400] : blue[400],
      },
      background: {
        default: isDarkMode ? grey[900] : grey[100]
      }
    },
  });

  let useStyles = makeStyles(theme => ({
    container: {
      minHeight: '100vh',
      backgroundColor: isDarkMode? grey[900] : grey[100],
      color: theme.palette.getContrastText(isDarkMode ? grey[900] : grey[100]),
      paddingTop: '1em'
    }
  }))
  
  let classes = useStyles();

  useEffect(() => {
    if (!isDialogOpen) {
      if (isEditMode) setIsEditMode(false);
    }
  }, [isDialogOpen, isEditMode]); 

  useEffect(() => {
    if (isEditMode) {
      formik.values.todoText = editTodo.val;
      formik.values.priority = editTodo.priority;
      formik.values.dueDate = editTodo.dueDate;
    } else {
      formik.values.todoText = "";
      formik.values.priority = "Low";
      formik.values.dueDate = getCurrentDate();
    }
  }, [isEditMode]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleEditClick = (todo) => {
    setIsDialogOpen(true);
    setIsEditMode(true);
    setEditTodo(todo);
  };

  const handleSubmit = (e) => {
    const { todoText, priority, dueDate } = formik.values;
    if (!isEditMode) {
      setTodos([...todos,
        {
          id: uuid(),
          val: todoText,
          priority: priority,
          dueDate: dueDate,
          in: true,
        },
      ]);
    } else {
      const newTodos = [...todos];
      const t = newTodos.find((t) => t.id === editTodo.id);
      t.val = todoText;
      t.priority = priority;
      t.dueDate = dueDate;
      setIsEditMode(false);
      setEditTodo({});
      setTodos(newTodos);
    }
    setIsDialogOpen(false);
    formik.values.todoText = "";
    formik.values.priority = "Low";
    formik.values.dueDate = getCurrentDate();
  };

  const handleDelete = (id) => {
    const newTodos = [...todos];
    setTodos(newTodos.filter((t) => t.id !== id));
  };

  const handleMarkDone = (todo) => {
    const newTodos = [...todos];
    const t = newTodos.find((t) => t.id === todo.id);
    t.done = !t.done;
    setTodos(newTodos);
  };

  const handlePriorityClick = (priority) => {
    setPriorityFilter(priority);
  };

  const handlePriorityFilterDelete = () => {
    setPriorityFilter("");
  };

  const formik = useFormik({
    initialValues: {
      todoText: "",
      priority: "Low",
      dueDate: getCurrentDate(),
    },
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const t = todos.filter((todo) => todo.id === draggableId)[0];

    const newTodos = [...todos];
    newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, t);
    setTodos(newTodos);
  };

  return (
    <>
      <CSSBaseline />
      <ThemeProvider theme={theme}>
        <Container className={classes.container}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Brightness7Icon />
            <Switch
              checked={isDarkMode}
              onClick={() => setIsDarkMode((mode) => !mode)}
            />
            <Brightness2Icon />
          </div>
          <HeaderComponent handleDialogOpen={handleDialogOpen} />
          {priorityFilter === "" ? null : (
            <Zoom in={priorityFilter !== ""} timeout={400}>
              <Chip
                label={priorityFilter}
                onDelete={handlePriorityFilterDelete}
                color="secondary"
                style={{ marginTop: "1.2em" }}
              />
            </Zoom>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <TodoListComponent
              todos={todos}
              priorityFilter={priorityFilter}
              handleEditClick={handleEditClick}
              handleDelete={handleDelete}
              handleMarkDone={handleMarkDone}
              handlePriorityClick={handlePriorityClick}
            />
          </DragDropContext>
        </Container>
        <FormDialogComponent
          open={isDialogOpen}
          handleClose={handleDialogClose}
          handleSubmit={handleSubmit}
          formik={formik}
          isEditMode={isEditMode}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
