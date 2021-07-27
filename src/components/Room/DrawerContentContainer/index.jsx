import { useState } from 'react';

import Wrapper from './styles';

const tmpStyle = {
  border: '1px solid red',
}

const DrawerContentContainer = () => {
  
  return (
    <Wrapper style={tmpStyle}>
      <div>
        <p>닉네임</p>
      </div>
      <div>
        MyCalendar
      </div>
      <div>
        <p>7월 20일 (목)</p>
        <p>오늘의 공부 시간</p>
      </div>
      <div>
        00 : 00 : 00
      </div>
      <div>
        다짐
      </div>
    </Wrapper>
  )
}

export default DrawerContentContainer
