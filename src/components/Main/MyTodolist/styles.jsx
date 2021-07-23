import styled from 'styled-components';

const Wrapper = styled.div`
max-width: 1500px;
& .all-container {
    padding: 30px;
}
& .todolist-container {
    margin-top: 20px;
}
& .title-container {
    padding: 10px;
    border-radius: 30px;
    margin-bottom: 10px;
}
& .title-subcontainer {
    justify-content: center;
}
& .content-container {
    padding: 20px;
    border-radius: 30px;
}
`;

export default Wrapper;