import { Grid, LinearProgress, IconButton } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SaveIcon from '@material-ui/icons/Save';
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
    setTodolistDeleteDetail,
    setTodolistDeleteTodolist,
  } = props;

  // const handleAddContainer = () => {
  //   setTodolistAddContainer('');
  // };
  const onClickSaveTodolist = (e) => {
    setTodolistSaveData();
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
            <Grid container direction="row" style={{ alignItems: 'center' }}>
              <Grid
                item
                style={{
                  marginRight: '10px',
                }}
              >
                <EventAvailableIcon htmlColor="#000000" fontSize="large" />
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
              {/* <Grid item>
                <IconButton onClick={handleAddContainer}>
                  <AddCircleIcon htmlColor="#411AB0" fontSize="large" />
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>

          <Grid item>
            {/* <Button
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
            </Button> */}
            <IconButton onClick={onClickSaveTodolist}>
              <SaveIcon htmlColor="#E96F02" />
            </IconButton>
          </Grid>
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
            <Grid
              item
              // lg={3}
              // md={4}
              // sm={6}
              xs={12}
              className="todolist-component-container"
            >
              <TodolistAdd
                setTodolistAddContainer={setTodolistAddContainer}
                backColor={'#FFFFFF'}
                textColor={'#000000'}
                plusButtonColor={'#411AB0'}
                isLightMode={false}
              />
            </Grid>
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
                    plusButtonColor={'#411AB0'}
                    setTodolistDeleteDetail={setTodolistDeleteDetail}
                    setTodolistDeleteTodolist={setTodolistDeleteTodolist}
                    isLightMode={false}
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
