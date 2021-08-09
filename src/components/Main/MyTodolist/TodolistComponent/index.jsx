import { Grid, LinearProgress, IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Wrapper from './styles';

const TodolistTitle = (props) => {
  let {
    title,
    index,
    setTodolistAddInput,
    setTodolistEditTitle,
    backColor,
    setTodolistDeleteTodolist,
  } = props;
  const handleAddInput = () => {
    setTodolistAddInput(index);
  };
  const onChangeHandler = (e) => {
    setTodolistEditTitle(index, e.target.value);
  };
  const onClickDeleteTodo = () => {
    setTodolistDeleteTodolist(index);
  };

  return (
    <Grid
      item
      className="title-container"
      style={{
        backgroundColor: backColor,
      }}
    >
      <Grid container className="title-subcontainer">
        <Grid item xs={8} className="input-container">
          <input
            className="title-input"
            value={title}
            onChange={onChangeHandler}
          />
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={handleAddInput}>
            <AddCircleIcon htmlColor="#1172DA" />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={onClickDeleteTodo}>
            <HighlightOffIcon htmlColor="#F44336" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TodolistContent = (props) => {
  const {
    todolist,
    index,
    setTodolistEditContent,
    setTodolistEditComplete,
    backColor,
    textColor,
    completeTextColor,
    setTodolistDeleteDetail,
  } = props;

  return (
    <Grid
      item
      className="content-container"
      style={{
        backgroundColor: backColor,
      }}
    >
      {todolist.map((data, idx) => {
        return (
          <TodolistContentElement
            content={data.content}
            complete={data.complete}
            index={index}
            setTodolistEditContent={setTodolistEditContent}
            subindex={idx}
            setTodolistEditComplete={setTodolistEditComplete}
            textColor={textColor}
            completeTextColor={completeTextColor}
            setTodolistDeleteDetail={setTodolistDeleteDetail}
          />
        );
      })}
    </Grid>
  );
};

const TodolistContentElement = (props) => {
  const {
    content,
    complete,
    setTodolistEditContent,
    index,
    subindex,
    setTodolistEditComplete,
    textColor,
    completeTextColor,
    setTodolistDeleteDetail,
  } = props;
  const onChangeHandler = (e) => {
    setTodolistEditContent(index, subindex, e.target.value);
  };
  const checkBoxHandler = () => {
    setTodolistEditComplete(index, subindex);
  };
  const onClickDelete = () => {
    setTodolistDeleteDetail(index, subindex);
  };

  return (
    <Grid container className="content-subcontainer">
      <Grid item xs={2}>
        <IconButton onClick={checkBoxHandler}>
          {!complete && <CheckBoxOutlineBlankIcon htmlColor={textColor} />}
          {complete && <CheckBoxIcon htmlColor={completeTextColor} />}
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        {!complete && (
          <input
            className="content-input"
            value={content}
            onChange={onChangeHandler}
          />
        )}
        {complete && (
          <input
            className="content-input-complete"
            value={content}
            onChange={onChangeHandler}
          />
        )}
      </Grid>
      <Grid item xs={2}>
        <IconButton>
          <HighlightOffIcon onClick={onClickDelete} htmlColor="#F44336" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const TodolistComponent = (props) => {
  let {
    title,
    todolist,
    index,
    setTodolistAddInput,
    setTodolistEditTitle,
    setTodolistEditContent,
    setTodolistEditComplete,
    backColor,
    textColor,
    completeTextColor,
    setTodolistDeleteDetail,
    setTodolistDeleteTodolist,
  } = props;

  return (
    <Wrapper>
      <Grid container direction="column" className="todolist-container">
        <TodolistTitle
          title={title}
          index={index}
          setTodolistAddInput={setTodolistAddInput}
          setTodolistEditTitle={setTodolistEditTitle}
          backColor={backColor}
          setTodolistDeleteTodolist={setTodolistDeleteTodolist}
        />
        <TodolistContent
          todolist={todolist}
          setTodolistEditContent={setTodolistEditContent}
          index={index}
          setTodolistEditComplete={setTodolistEditComplete}
          backColor={backColor}
          textColor={textColor}
          completeTextColor={completeTextColor}
          setTodolistDeleteDetail={setTodolistDeleteDetail}
        />
      </Grid>
    </Wrapper>
  );
};

export default TodolistComponent;
