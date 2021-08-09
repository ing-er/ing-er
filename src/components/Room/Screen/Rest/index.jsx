import Wrapper from './styles';

const Rest = () => {
  return (
    <Wrapper>
      <div>
        <div className="z1">Z</div>
        <div className="z2">Z</div>
        <div className="z3">Z</div>
        <div className="cat">
          <div className="ear ear--left"></div>
          <div className="ear ear--right"></div>
          <div className="face">
            <div className="eye eye--left">
              <div className="eye-pupil"></div>
            </div>
            <div className="eye eye--right">
              <div className="eye-pupil"></div>
            </div>
            <div className="muzzle"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Rest;
