import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { buttonSubmitSx } from "@/modules/auth/components/FormLogin/FormLogin.styles";
import { useState } from "react";
import { transactionSchema } from "@/modules/auth/schemas/transaction.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import type { FormValues } from "@/modules/auth/types/transaction.type";

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

export default function TransitionsModal({ open, handleOpen, handleClose }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(transactionSchema),
  });

  const arrayCategoryExpenses = [
    {
      id: "cat-1",
      name: "Comida",
    },
    {
      id: "cat-2",
      name: "Impuesto",
    },
    {
      id: "cat-3",
      name: "Electrodoméstico",
    },
  ];

  const arrayPaymentMethod = [
    {
      id: "op-1",
      name: "Efectivo",
    },
    {
      id: "op-2",
      name: "Tarjeta de débito",
    },
    {
      id: "op-3",
      name: "Mercado Pago",
    },
  ];

  const arrayCategoryIncomes = [
    {
      id: "cat-1",
      name: "Salario",
    },
    {
      id: "cat-2",
      name: "Alquiler",
    },
    {
      id: "cat-3",
      name: "Venta",
    },
    {
      id: "cat-4",
      name: "Regalo",
    },
    {
      id: "cat-4",
      name: "Prestamo",
    },
  ];

  const [toggleColor, setToggleColor] = useState();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Formulario enviado:", data);
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
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    "& .MuiTextField-root": { marginY: 2, width: "auto" },
                    "& .MuiSelect-root": { marginY: 2, width: "auto" },
                    "& .MuiRadioGroup-root": { marginY: 2, width: "auto" },

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}>
                  {/* RadioGroup */}
                  <FormControl error={!!errors.typeTransaccion}>
                    <FormLabel>Tipo de Transacción</FormLabel>
                    <Controller
                      name="typeTransaccion"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="gasto"
                            control={<Radio sx={{ display: "none" }} />}
                            label="Gasto"
                            sx={{
                              width: "44%",
                              m: 1,
                              p: 1,
                              borderRadius: 1,
                              border: "1px solid gray",
                              backgroundColor: !toggleColor && "red",
                              display: "inline-flex",
                              justifyContent: "center",
                            }}
                            onClick={() => setToggleColor(false)}
                          />
                          <FormControlLabel
                            value="ingreso"
                            control={<Radio sx={{ display: "none" }} />}
                            label="Ingreso"
                            sx={{
                              width: "44%",
                              m: 1,
                              p: 1,
                              borderRadius: 1,
                              border: "1px solid gray",
                              backgroundColor: toggleColor && "green",
                              display: "inline-flex",
                              justifyContent: "center",
                            }}
                            onClick={() => setToggleColor(true)}
                          />
                        </RadioGroup>
                      )}
                    />
                    <FormHelperText>
                      {errors.typeTransaccion?.message}
                    </FormHelperText>
                  </FormControl>

                  {/* Monto */}
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Monto"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                      />
                    )}
                  />

                  {/* Fecha */}
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Fecha"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                      />
                    )}
                  />

                  <FormControl error={!!errors.category}>
                    <InputLabel>Categorías</InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Categorías">
                          {arrayCategoryExpenses.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.category?.message}</FormHelperText>
                  </FormControl>

                  <FormControl error={!!errors.pay}>
                    <InputLabel>Método de Pago</InputLabel>
                    <Controller
                      name="pay"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="Pagos">
                          {arrayPaymentMethod.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.pay?.message}</FormHelperText>
                  </FormControl>

                  {/* Descripción */}
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descripción (opcional)"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />

                  <Button type="submit" variant="contained" sx={buttonSubmitSx}>
                    guardar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
