import {Grid, LinearProgress} from '@material-ui/core'

import Wrapper from './styles';

const MyTodolist = () => {
    return (
        <Wrapper>
            <Grid container
                className="all-container"
                direction="row"
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
                <Grid item>
                    <Grid container
                        direction="column">
                        <Grid item>

                        </Grid>
                        <Grid item>
                            
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default MyTodolist;