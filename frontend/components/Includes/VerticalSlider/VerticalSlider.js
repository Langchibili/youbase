import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const VerticalSlider = ({ slides,setIndexOfSlider }) => {
  const [index, setIndex] = useState(0);
 
  const handleSwipe = (direction) => {
    if (direction === "up" && index < slides.length - 1) {
      setIndex(index + 1);
    } else if (direction === "down" && index > 0) {
      setIndex(index - 1);
    }
  }

  useEffect(()=>{
    setIndexOfSlider(index)
  },[index])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.y < -50) handleSwipe("up");
            if (info.offset.y > 50) handleSwipe("down");
          }}
        >
          {
            slides[index]? slides[index]() : null
          }
        </motion.div>
      </AnimatePresence>
      <Box
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <Fab
          aria-label="move-down"
          onClick={() => handleSwipe("down")}
          disabled={index === 0}
          sx={{
            backgroundColor:'black',
            opacity: index === 0 ? 0.5 : 0.8,
            transition: 'opacity 0.3s'
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" sx={{color:'white'}}/>
        </Fab>

        <Fab
          aria-label="move-up"
          onClick={() => handleSwipe("up")}
          disabled={index === slides.length - 1}
          sx={{
            backgroundColor:'black',
            opacity: index === slides.length - 1 ? 0.5 : 0.8,
            transition: 'opacity 0.3s'
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" sx={{color:'white'}}/>
        </Fab>
      </Box>
    </div>
  );
};

export default VerticalSlider;
