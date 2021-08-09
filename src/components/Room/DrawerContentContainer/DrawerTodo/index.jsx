import { Grid, LinearProgress, IconButton, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { withStyles } from '@material-ui/styles';

import TodolistComponent from '../../../Main/MyTodolist/TodolistComponent';
import TodolistAdd from '../../../Main/MyTodolist/TodolistAdd';

import Wrapper from './styles';

const LinearProgressOrange = withStyles({
  root: {
    height: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: '20px',
  },
  bar: {
    backgroundColor: '#E96F02',
    borderRadius: '20px',
  },
})(LinearProgress);

const DrawerTodo = (props) => {
  let {
    todolistdata,
    todopercent,
    date,
    setTodolistAddContainer,
    setTodolistAddInput,
    setTodolistEditTitle,
    setTodolistEditContent,
    setTodolistEditComplete,
    setTodolistSaveData,
  } = props;

  const handleAddContainer = () => {
    setTodolistAddContainer('');
  };

  return (
    <Wrapper>
      <Grid
        container
        className="all-container"
        direction="column"
        style={{
          backgroundColor: '#FFFFFF',
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
              <Grid item>
                <IconButton onClick={handleAddContainer}>
                  <AddCircleIcon htmlColor="#411AB0" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item>
            <Button
              className="enter-button"
              variant="outlined"
              onClick={onClickSaveTodolist}
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                backgroundColor: '#E96F02',
              }}
            >
              저장
            </Button>
          </Grid> */}
        </Grid>
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <div>{todopercent}%</div>
          <div>
            <LinearProgressOrange variant="determinate" value={todopercent} />
          </div>
        </Grid>
        <Grid item xs={12} style={{ margin: '10px' }}>
          <Grid
            container
            direction="row"
            justify="left"
            style={{ backgroundColor: '#F6F7F9', borderRadius: '30px' }}
          >
            {todolistdata.map((data, index) => {
              return (
                <Grid
                  item
                  // lg={3}
                  // md={4}
                  // sm={6}
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
                    backColor={'#FFFFFF'}
                    textColor={'#000000'}
                    completeTextColor={'#CECECE'}
                  />
                </Grid>
              );
            })}
            <Grid
              item
              // lg={3}
              // md={4}
              // sm={6}
              xs={12}
              className="todolist-component-container"
            >
              {/* <TodolistAdd
                setTodolistAddContainer={setTodolistAddContainer}
                backColor={'#FFFFFF'}
                textColor={'#000000'}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default DrawerTodo;
