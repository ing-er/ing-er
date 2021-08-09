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
    <div>
      <motion.div style={tmpStyle}
        whileHover={{ 
          scale: 1.1,
          textShadow: "0px 0px 8px rgb(255, 255, 255)",
          boxShadow: "0px 0px 8px rgb(255, 255, 255)"
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        framer motion test
      </motion.div>
      <Link to="/webrtc">
        <button>클릭</button>
      </Link>
    </div>
    
  )
}

export default TESTBUTTON
