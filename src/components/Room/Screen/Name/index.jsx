import Wrapper from './styles';

const Name = ({ username }) => {
  return (
    <Wrapper>
      <div className="name-container">
        <p className="name-text">{username ? username : '익명의 잉어'}</p>
      </div>
    </Wrapper>
  );
};

export default Name;
