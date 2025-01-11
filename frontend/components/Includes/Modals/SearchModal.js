import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { ArrowBack, Search, Visibility } from '@mui/icons-material';
import Box from '@mui/material/Box';
import SearchForm from '@/components/Forms/SearchForm/SearchForm';
import { Slide } from '@mui/material';
import { useSearchModalOpen } from '@/Contexts/SearchModalContext';

const StyledContent = styled(Box)({
  backgroundColor: 'white',
  height: '100vh',
  overflowY: 'auto',
});
// this modal opens with a button which is within itself so no need to change open
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide in={props.open} direction='up' ref={ref} {...props} />;
});

function SearchModal(props) {
  const useSearchModalOpenContext = useSearchModalOpen()
  const open = useSearchModalOpenContext.openSearchModal
 

  return (
    <>
      <Button onClick={() =>  useSearchModalOpenContext.setOpenSearchModal(true)} sx={{ color: 'gray' }}>
        <Search /> {props.text? props.text : ""}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => useSearchModalOpenContext.setOpenSearchModal(false)}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'white',
          },
        }}
      >
        <Toolbar sx={{ backgroundColor: 'white' }}>
          <IconButton
            edge="start"
            sx={{ color: 'gray' }}
            onClick={() =>  useSearchModalOpenContext.setOpenSearchModal(false)}
            aria-label="close"
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
        <StyledContent>
          {open && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <SearchForm loggedInUser={props.loggedInUser}/>
            </div>
          )}
        </StyledContent>
      </Dialog>
    </>
  );
}

SearchModal.propTypes = {
  window: PropTypes.func,
  post: PropTypes.object.isRequired,
};

export default SearchModal;
