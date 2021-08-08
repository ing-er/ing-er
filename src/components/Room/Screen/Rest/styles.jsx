import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  to {
		opacity: 0;
	}
`;

const colorBlack = 'black';
const colorWhite = '#ffffff';

const Wrapper = styled.div`
  & .z1 {
    position: absolute;
    font-size: 0.8vw;
    left: 35%;
    top: 42%;
    animation: ${blink} 2s steps(5, start) infinite;
  }

  & .z2 {
    position: absolute;
    font-size: 1.3vw;
    left: 30%;
    top: 33%;
    animation: ${blink} 2s 1s steps(5, start) infinite;
  }

  & .z3 {
    position: absolute;
    font-size: 1.8vw;
    top: 19%;
    left: 35%;
    animation: ${blink} 2s 2s steps(5, start) infinite;
  }

  & .cat {
    position: absolute;
    top: 50%;
    left: 44%;
    height: 3vw;
    width: 4vw;
  }

  // Ears
  & .ear {
    position: absolute;
    top: -30%;
    height: 60%;
    width: 25%;
    background: ${colorWhite};

    // Ear hair
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 24%;
      height: 10%;
      width: 5%;
      border-radius: 50%;
      background: ${colorBlack};
    }

    &::after {
      transform-origin: 50% 100%;
    }
  }

  & .ear--left {
    left: -7%;
    border-radius: 70% 30% 0% 0% / 100% 100% 0% 0%;
    transform: rotate(-15deg);

    &::before,
    &::after {
      right: 10%;
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  & .ear--right {
    right: -7%;
    border-radius: 30% 70% 0% 0% / 100% 100% 0% 0%;
    transform: rotate(15deg);

    &::before,
    &::after {
      left: 10%;
    }

    &::after {
      transform: rotate(45deg);
    }
  }

  // Face
  & .face {
    position: absolute;
    height: 100%;
    width: 100%;
    background: ${colorBlack};
    border-radius: 50%;
  }

  // Eyes
  & .eye {
    position: absolute;
    top: 35%;
    height: 30%;
    width: 31%;
    background: ${colorWhite};
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;

    // Eyelids
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 0;
      width: 100%;
      border-radius: 0 0 50% 50% / 0 0 40% 40%;
      background: ${colorBlack};
      animation: blink 4s infinite ease-in;
    }

    @keyframes blink {
      0% {
        height: 50%;
      }
      10% {
        height: 90%;
      }
      90% {
        height: 90%;
      }
      100% {
        height: 50%;
      }
    }

    // Tips of the eyes
    &::before {
      content: '';
      position: absolute;
      top: 60%;
      height: 10%;
      width: 15%;
      background: ${colorWhite};
      border-radius: 50%;
    }
  }

  & .eye--left {
    left: 0;

    &::before {
      right: -5%;
    }
  }

  & .eye--right {
    right: 0;

    &::before {
      left: -5%;
    }
  }

  // Pupils
  & .eye-pupil {
    position: absolute;
    top: 25%;
    height: 50%;
    width: 20%;
    background: ${colorBlack};
    border-radius: 50%;
    animation: look-around 4s infinite;

    @keyframes look-around {
      0% {
        transform: translate(0);
      }
      5% {
        transform: translate(50%, -25%);
      }
      10% {
        transform: translate(50%, -25%);
      }
      15% {
        transform: translate(-100%, -25%);
      }
      20% {
        transform: translate(-100%, -25%);
      }
      25% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(0, 0);
      }
    }

    & .eye--left & {
      right: 30%;
    }

    & .eye--right & {
      left: 30%;
    }

    // Glare on the pupil
    &::after {
      content: '';
      position: absolute;
      top: 30%;
      right: -5%;
      height: 20%;
      width: 35%;
      border-radius: 50%;
      background: ${colorWhite};
    }
  }

  // Muzzle
  & .muzzle {
    position: absolute;
    top: 60%;
    left: 50%;
    height: 6%;
    width: 10%;
    background: ${colorWhite};
    transform: translateX(-50%);
    border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
  }
`;

export default Wrapper;
