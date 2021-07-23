import { Grid, LinearProgress, TextField, IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles } from "@material-ui/core/styles";

import Wrapper from './styles';

const WhiteTextField = withStyles({
    input: {
        color: '#FFFFFF'
    }
})(TextField);

const TodolistComponent = () => {
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
                    <Grid item>
                        <WhiteTextField></WhiteTextField>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <AddCircleIcon htmlColor="#411AB0"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item
                className='content-container'
                style={{
                    backgroundColor: '#1E1F26'
                }}>
                <Grid container
                className='content-subcontainer'>
                    <Grid item>
                        <IconButton>
                            <CheckBoxOutlineBlankIcon htmlColor='white'/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TextField/>
                    </Grid>
                </Grid>
                <Grid container
                className='content-subcontainer'>
                    <Grid item>
                        <IconButton>
                            <CheckBoxIcon htmlColor='white'/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TextField/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

const MyTodolist = () => {
    return (
        <Wrapper>
            <Grid container
                className="all-container"
                direction="column"
                style={{
                backgroundColor: '#292A33'
                }}>
                <Grid item
                    xs={12}
                    style={{
                    fontSize: 30
                }}>
                    7월 20일 (화)
                </Grid>
                <Grid item xs={12}>
                    <div>60%</div>
                    <LinearProgress variant="determinate" value={60}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        direction="row"
                    justify="space-between">
                        <Grid item>
                            <TodolistComponent/>
                        </Grid>
                        <Grid item>
                            <TodolistComponent/>
                        </Grid>
                        <Grid item>
                            <TodolistComponent/>
                        </Grid>
                        <Grid item>
                            <TodolistComponent/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default MyTodolist;