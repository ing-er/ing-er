import { Grid, LinearProgress, IconButton } from '@material-ui/core'
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
        borderRadius: '20px'
    },
    bar: {
        backgroundColor: '#E96F02',
        borderRadius: '20px'
    }
})(LinearProgress);


const TodolistTitle = (props) => {
    let { title, index, setTodolistAddInput } = props;
    const handleAddInput = () => {
        setTodolistAddInput(index);
    };

    return (
        <Grid item
            className='title-container'
            style={{
                backgroundColor: '#1E1F26'
            }}>
            <Grid container
                className='title-subcontainer'>
                <Grid item xs={10} className="input-container">
                    <input className="title-input" value={title}/>
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
    const { todolist } = props;
    return (
        <Grid item
            className='content-container'
            style={{
                backgroundColor: '#1E1F26'
            }}>
            {todolist.map((data, index) => {
                return (
                    <TodolistContentElement content={data.content} />
                )
            })}
        </Grid>
    );
};

const TodolistContentElement = (props) => {
    const { content } = props;
    const onChangeHandler = () => {
    };
    return (
        <Grid container
            className='content-subcontainer'>
            <Grid item xs={2}>
                <IconButton>
                    <CheckBoxOutlineBlankIcon htmlColor='white'/>
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <input className="content-input" value={content} onChange={onChangeHandler}/>
            </Grid>
        </Grid>
    );
};

const TodolistComponent = (props) => {
    let { title, todolist, index, setTodolistAddInput } = props;

    return (
        <Grid container
            direction="column"
        className='todolist-container'>
            <TodolistTitle title={title}
                index={index}
                setTodolistAddInput={setTodolistAddInput}/>
            <TodolistContent todolist={todolist}/>
        </Grid>
    );
}

const TodolistAdd = (props) => {
    let { setTodolistAddContainer } = props;
    const handleAddContainer = () => {
        setTodolistAddContainer(document.querySelector('#add-title').value);
    };

    return (
        <Grid container
            direction="column"
            className='todolist-container'>
            <Grid item
            className='title-container'
            style={{
                backgroundColor: '#1E1F26'
            }}>
            <Grid container
                className='title-subcontainer'>
                <Grid item xs={10} className="input-container">
                    <input className="title-input" id="add-title"/>
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
    let { todolistdata, setTodolistAddContainer, setTodolistAddInput } = props;
    console.log(todolistdata);
    return (
        <Wrapper>
            <Grid container
                className="all-container"
                direction="column"
                style={{
                backgroundColor: '#292A33'
                }}>
                <Grid container direction="row">
                    <Grid item
                        style={{
                            marginRight: "10px",
                    }}>
                        <EventAvailableIcon htmlColor="white" fontSize="large"/>
                </Grid>
                <Grid item
                    style={{
                    fontSize: 30
                }}>
                    7월 20일 (화)
                </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop: "10px"}}>
                    <div>60%</div>
                    <div>
                        <LinearProgressOrange variant="determinate" value={60} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        direction="row"
                        justify="space-between">
                        {todolistdata.map((data, index) => {
                            return (
                                <Grid item
                            lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                                    <TodolistComponent
                                        title={data.title}
                                        todolist={data.list}
                                        index={index}
                                        setTodolistAddInput={setTodolistAddInput}
                                    />
                        </Grid>
                            )
                        })}
                        <Grid item
                        lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                            <TodolistAdd setTodolistAddContainer={setTodolistAddContainer}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default MyTodolist;