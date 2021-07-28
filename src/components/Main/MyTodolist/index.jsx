import { Grid, LinearProgress, IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { withStyles } from '@material-ui/styles';

import Wrapper from './styles';

const LinearProgressOrange = withStyles({
  root: {
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
  },
  bar: {
    backgroundColor: '#E96F02',
    borderRadius: '20px',
  },
})(LinearProgress);

const TodolistTitle = (props) => {
  let { title, index, setTodolistAddInput, setTodolistEditTitle } = props;
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
        backgroundColor: '#1E1F26',
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
  const { todolist, index, setTodolistEditContent, setTodolistEditComplete } =
    props;
  return (
    <Grid
      item
      className="content-container"
      style={{
        backgroundColor: '#1E1F26',
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
          {!complete && <CheckBoxOutlineBlankIcon htmlColor="white" />}
          {complete && <CheckBoxIcon htmlColor="#4D4D4D" />}
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
  } = props;

  return (
    <Grid container direction="column" className="todolist-container">
      <TodolistTitle
        title={title}
        index={index}
        setTodolistAddInput={setTodolistAddInput}
        setTodolistEditTitle={setTodolistEditTitle}
      />
      <TodolistContent
        todolist={todolist}
        setTodolistEditContent={setTodolistEditContent}
        index={index}
        setTodolistEditComplete={setTodolistEditComplete}
      />
    </Grid>
  );
};

const TodolistAdd = (props) => {
  let { setTodolistAddContainer } = props;
  const handleAddContainer = () => {
    setTodolistAddContainer(document.querySelector('#add-title').value);
  };

  return (
    <Grid container direction="column" className="todolist-container">
      <Grid
        item
        className="title-container"
        style={{
          backgroundColor: '#1E1F26',
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

const MyTodolist = (props) => {
  let {
    todolistdata,
    todopercent,
    date,
    setTodolistAddContainer,
    setTodolistAddInput,
    setTodolistEditTitle,
    setTodolistEditContent,
    setTodolistEditComplete,
  } = props;
  console.log(todolistdata);
  return (
    <Wrapper>
      <Grid
        container
        className="all-container"
        direction="column"
        style={{
          backgroundColor: '#292A33',
        }}
      >
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Grid container direction="row">
              <Grid
                item
                style={{
                  marginRight: '10px',
                }}
              >
                <EventAvailableIcon htmlColor="white" fontSize="large" />
              </Grid>
              <Grid
                item
                style={{
                  fontWeight: 'bold',
                  fontSize: 30,
                }}
              >
                {date}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              className="enter-button"
              variant="outlined"
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                backgroundColor: '#E96F02',
              }}
            >
              저장
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <div>{todopercent}%</div>
          <div>
            <LinearProgressOrange variant="determinate" value={todopercent} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="left">
            {todolistdata.map((data, index) => {
              return (
                <Grid
                  item
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  className="todolist-component-container"
                >
                  <TodolistComponent
                    title={data.title}
                    todolist={data.list}
                    index={index}
                    setTodolistAddInput={setTodolistAddInput}
                    setTodolistEditTitle={setTodolistEditTitle}
                    setTodolistEditContent={setTodolistEditContent}
                    setTodolistEditComplete={setTodolistEditComplete}
                  />
                </Grid>
              );
            })}
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              className="todolist-component-container"
            >
              <TodolistAdd setTodolistAddContainer={setTodolistAddContainer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default MyTodolist;
