import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FormExpense from "./components/FormExpense/FormExpense";
import FormIncome from "./components/FormIncome/FormIncome";
import { buttonExpense, buttonIncome, cardSx, modalSx } from "./Modal.styles";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function TransitionsModal({ open, handleClose }: Props) {
  const [typeForm, setTypeForm] = useState("gasto");

  const [toggleColor, setToggleColor] = useState(false);

  const handleShowForm = (modal: string) => {
    setToggleColor(modal === "ingreso");

    setTypeForm(modal);
  };

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
                <ButtonGroup
                  variant="outlined"
                  fullWidth
                  sx={{ border: "1px solid gray" }}>
                  <Button
                    sx={buttonExpense(toggleColor)}
                    onClick={() => {
                      handleShowForm("gasto");
                    }}>
                    Gasto
                  </Button>

                  <Button
                    sx={buttonIncome(toggleColor)}
                    onClick={() => {
                      handleShowForm("ingreso");
                    }}>
                    Ingreso
                  </Button>
                </ButtonGroup>

                {typeForm == "gasto" ? (
                  <FormExpense handleClose={handleClose} />
                ) : (
                  <FormIncome handleClose={handleClose} />
                )}
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
