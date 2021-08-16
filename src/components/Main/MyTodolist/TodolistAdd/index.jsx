import { Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const TodolistAdd = (props) => {
  let {
    setTodolistAddContainer,
    backColor,
    textColor,
    isLightMode,
    plusButtonColor,
  } = props;
  const handleAddContainer = () => {
    setTodolistAddContainer(document.querySelector('#add-title').value);
    document.querySelector('#add-title').value = '';
  };
  const changeTitleBackColor = () => {
    if (!isLightMode) {
      return backColor;
    } else {
      return '#F6F7F9';
    }
  };
  const changeTitleTextColor = () => {
    if (!isLightMode) {
      return textColor;
    } else {
      return '#000000';
    }
  };
  const changePlusButtonColor = () => {
    if (!isLightMode) {
      return plusButtonColor;
    } else {
      return '#411AB0';
    }
  };

  return (
    <Grid container direction="column" className="todolist-container">
      <Grid
        item
        className="title-container"
        style={{
          backgroundColor: changeTitleBackColor(),
        }}
      >
        <Grid container className="title-subcontainer">
          <Grid item xs={10} className="input-container">
            <input
              className="title-input"
              id="add-title"
              placeholder="카테고리를 입력하세요"
              style={{ color: changeTitleTextColor() }}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleAddContainer}>
              <AddCircleIcon htmlColor={changePlusButtonColor()} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TodolistAdd;
