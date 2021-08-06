import { Grid, LinearProgress, IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Wrapper from './styles';

const TodolistTitle = (props) => {
  let { title, index, setTodolistAddInput, setTodolistEditTitle, backColor } =
    props;
  const handleAddInput = () => {
    setTodolistAddInput(index);
  };
  const onChangeHandler = (e) => {
    setTodolistEditTitle(index, e.target.value);
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
        <Grid item xs={10} className="input-container">
          <input
            className="title-input"
            value={title}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleAddInput}>
            <AddCircleIcon htmlColor="#411AB0" />
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
  } = props;
  const onChangeHandler = (e) => {
    setTodolistEditContent(index, subindex, e.target.value);
  };
  const checkBoxHandler = () => {
    setTodolistEditComplete(index, subindex);
  };

  return (
    <Grid container className="content-subcontainer">
      <Grid item xs={2}>
        <IconButton onClick={checkBoxHandler}>
          {!complete && <CheckBoxOutlineBlankIcon htmlColor={textColor} />}
          {complete && <CheckBoxIcon htmlColor={completeTextColor} />}
        </IconButton>
      </Grid>
      <Grid item xs={10}>
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
        />
        <TodolistContent
          todolist={todolist}
          setTodolistEditContent={setTodolistEditContent}
          index={index}
          setTodolistEditComplete={setTodolistEditComplete}
          backColor={backColor}
          textColor={textColor}
          completeTextColor={completeTextColor}
        />
      </Grid>
    </Wrapper>
  );
};

export default TodolistComponent;
