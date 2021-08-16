import { Grid, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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
    isLightMode,
    textColor,
    plusButtonColor,
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
    <Grid
      item
      className="title-container"
      style={{
        backgroundColor: changeTitleBackColor(),
      }}
    >
      <Grid container className="title-subcontainer">
        <Grid item xs={8} className="input-container">
          <input
            className="title-input"
            value={title}
            onChange={onChangeHandler}
            style={{ color: changeTitleTextColor() }}
          />
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={handleAddInput}>
            <AddCircleIcon htmlColor={changePlusButtonColor()} />
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
    isLightMode,
  } = props;

  const changeContentBackColor = () => {
    if (!isLightMode) {
      return backColor;
    } else {
      return '#F6F7F9';
    }
  };

  return (
    <Grid
      item
      className="content-container"
      style={{
        backgroundColor: changeContentBackColor(),
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
            isLightMode={isLightMode}
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
    isLightMode,
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
  const changeContentTextColor = () => {
    if (!isLightMode) {
      return textColor;
    } else {
      return '#000000';
    }
  };
  const changeCompleteTextColor = () => {
    if (!isLightMode) {
      return completeTextColor;
    } else {
      return '#CECECE';
    }
  };

  return (
    <Grid container className="content-subcontainer">
      <Grid item xs={2}>
        <IconButton onClick={checkBoxHandler}>
          {!complete && (
            <CheckBoxOutlineBlankIcon htmlColor={changeContentTextColor()} />
          )}
          {complete && <CheckBoxIcon htmlColor={changeCompleteTextColor()} />}
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        {!complete && (
          <input
            className="content-input"
            value={content}
            onChange={onChangeHandler}
            style={{ color: changeContentTextColor() }}
          />
        )}
        {complete && (
          <input
            className="content-input-complete"
            value={content}
            onChange={onChangeHandler}
            style={{ color: changeCompleteTextColor() }}
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
    isLightMode,
    plusButtonColor,
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
          textColor={textColor}
          setTodolistDeleteTodolist={setTodolistDeleteTodolist}
          isLightMode={isLightMode}
          plusButtonColor={plusButtonColor}
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
          isLightMode={isLightMode}
        />
      </Grid>
    </Wrapper>
  );
};

export default TodolistComponent;
