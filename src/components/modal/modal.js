import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindow(props) {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        props.closeModal();
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Проверьте правильность заполнения товарного раздела!
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalWindow;