import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Form from "../Form/Form";
import { cardSx, modalSx } from "./Modal.styles";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function TransitionsModal({ open, handleClose }: Props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box sx={modalSx}>
            <Card sx={cardSx}>
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                }
                title="Nueva Transacción"
              />

              <Divider />

              <CardContent>
                <Form handleClose={handleClose} />
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
