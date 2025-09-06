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
import FormExpense from "./FormExpense";
import FormIncome from "./FormIncome";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function TransitionsModal({ open, handleClose }: Props) {
  const [typeForm, setTypeForm] = useState("");

  const [toggleColor, setToggleColor] = useState(false);

  const handleShowForm = (modal: string) => {
    if (modal == "ingreso") {
      setToggleColor(true);
    } else {
      setToggleColor(false);
    }

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
          <Box sx={style}>
            <Card
              sx={{
                maxWidth: 345,
                maxHeight: { xs: "500px", md: "800px" },
                overflowY: { xs: "auto", md: "hidden" },
              }}>
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
                    sx={{
                      backgroundColor: !toggleColor ? "red" : "",
                      color: "white",
                    }}
                    onClick={() => {
                      handleShowForm("gasto");
                    }}>
                    Gasto
                  </Button>

                  <Button
                    sx={{
                      backgroundColor: toggleColor ? "green" : "",
                      color: "white",
                    }}
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
