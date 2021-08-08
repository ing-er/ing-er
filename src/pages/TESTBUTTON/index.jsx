import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const tmpStyle = {
  color: '#ffffff',
  backgroundColor: 'blue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '500px',
  height: '500px',
}
const TESTBUTTON = () => {
  return (
    <Link to="/webrtc">
      <button>클릭</button>
    </Link>
  )
}

export default TESTBUTTON
