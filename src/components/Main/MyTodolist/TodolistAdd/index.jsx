import { Grid, LinearProgress, IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import Wrapper from './styles';

const TodolistAdd = (props) => {
  let { setTodolistAddContainer, backColor } = props;
  const handleAddContainer = () => {
    setTodolistAddContainer(document.querySelector('#add-title').value);
  };

  return (
    <Grid container direction="column" className="todolist-container">
      <Grid
        item
        className="title-container"
        style={{
          backgroundColor: backColor,
        }}
      >
        <Grid container className="title-subcontainer">
          <Grid item xs={10} className="input-container">
            <input className="title-input" id="add-title" />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleAddContainer}>
              <AddCircleIcon htmlColor="#411AB0" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TodolistAdd;
