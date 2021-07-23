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


const TodolistTitle = () => {
    return (
        <Grid item
            className='title-container'
            style={{
                backgroundColor: '#1E1F26'
            }}>
            <Grid container
                className='title-subcontainer'>
                <Grid item xs={10} className="input-container">
                    <input className="title-input" />
                </Grid>
                <Grid item xs={2}>
                    <IconButton>
                        <AddCircleIcon htmlColor="#411AB0" />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

const TodolistContent = () => {
    return (
        <Grid item
            className='content-container'
            style={{
                backgroundColor: '#1E1F26'
            }}>
            <Grid container
                className='content-subcontainer'>
                <Grid item xs={2}>
                    <IconButton>
                        <CheckBoxOutlineBlankIcon htmlColor='white' />
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <input className="content-input" />
                </Grid>
            </Grid>
            <Grid container
                className='content-subcontainer'>
                <Grid ite xs={2}>
                    <IconButton>
                        <CheckBoxIcon htmlColor='white' />
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <input className="content-input" />
                </Grid>
            </Grid>
        </Grid>
    );
};

const TodolistComponent = () => {
    return (
        <Grid container
            direction="column"
        className='todolist-container'>
            <TodolistTitle/>
            <TodolistContent/>
        </Grid>
    );
}

const TodolistAdd = () => {
    return (
        <Grid container
            direction="column"
            className='todolist-container'>
            <TodolistTitle />
        </Grid>
    );
};

const MyTodolist = () => {
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
                        <Grid item
                            lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                            <TodolistComponent/>
                        </Grid>
                        <Grid item
                        lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                            <TodolistComponent/>
                        </Grid>
                        <Grid item
                        lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                            <TodolistComponent/>
                        </Grid>
                        <Grid item
                        lg={3} md={4} sm={6} xs={12}
                        className="todolist-component-container">
                            <TodolistAdd/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default MyTodolist;