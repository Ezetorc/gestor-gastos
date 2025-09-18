import { buttonSubmitSx } from "@/modules/auth/components/FormLogin/FormLogin.styles";
import {
  expenseSchema,
  type FormValuesExpense,
} from "@/modules/core/schemas/expense.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { type VariantType, useSnackbar } from "notistack";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { useFetchApi } from "@/modules/core/hooks/useFetchApi";
import type { ApiResponse } from "@/modules/auth/types/auth";

interface Props {
  handleClose: () => void;
}

const FormExpense = ({ handleClose }: Props) => {
  const { request } = useFetchApi<ApiResponse>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesExpense>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      date: new Date(),
      category: "",
      paymentMethod: "",
      description: "",
      type: "EXPENSE",
    },
  });

  const [toggleColor, setToggleColor] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();

  const arrayCategoryExpenses = [
    {
      id: crypto.randomUUID(),
      name: "Comida",
    },
    {
      id: crypto.randomUUID(),
      name: "Servicios",
    },
    {
      id: crypto.randomUUID(),
      name: "Impuesto",
    },
    {
      id: crypto.randomUUID(),
      name: "Electrodoméstico",
    },
  ];

  const arrayPaymentMethod = [
    {
      id: crypto.randomUUID(),
      name: "Efectivo",
    },
    {
      id: crypto.randomUUID(),
      name: "Tarjeta de débito",
    },
    {
      id: crypto.randomUUID(),
      name: "Mercado Pago",
    },
  ];

  const onSubmit: SubmitHandler<FormValuesExpense> = async (data) => {
    const variant: VariantType = "success";
    const upperCaseTypeTransation = data.type.toUpperCase();

    try {
      const token = localStorage.getItem("token");
      await request("http://localhost:3000/transactions", {
        method: "POST",
        token: token || undefined,
        body: data,
      });
    } catch (error) {
      console.error("Error creando la transacción:", error);
    }

    enqueueSnackbar(`${upperCaseTypeTransation}  Guardado`, { variant });
    handleClose();
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& .MuiTextField-root": { marginY: 1, width: "auto" },
          "& .MuiSelect-root": { marginY: 1, width: "auto" },
          "& .MuiRadioGroup-root": { marginY: 1, width: "auto" },

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}>
        <FormControl error={!!errors.type}>
          <FormLabel>Tipo de Transacción</FormLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="gasto"
                  defaultValue="gasto"
                  control={<Radio sx={{ display: "none" }} />}
                  label="Gasto"
                  sx={{
                    width: "44%",
                    m: 1,
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid gray",
                    backgroundColor: !toggleColor ? "red" : "",
                    display: "inline-flex",
                    justifyContent: "center",
                  }}
                  onClick={() => setToggleColor(false)}
                />
                <FormControlLabel
                  value="INCOME"
                  control={<Radio sx={{ display: "none" }} />}
                  label="Ingreso"
                  sx={{
                    width: "44%",
                    m: 1,
                    p: 1,
                    borderRadius: 1,
                    border: "1px solid gray",
                    backgroundColor: toggleColor ? "green" : "",
                    display: "inline-flex",
                    justifyContent: "center",
                  }}
                  onClick={() => setToggleColor(true)}
                />
              </RadioGroup>
            )}
          />
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              margin="dense"
              fullWidth
              label="Nombre"
              variant="outlined"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ display: "none" }}
              type="string"
              defaultValue="gasto"
              label="typeTransaccion"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.type}
              helperText={errors.type?.message}
            />
          )}
        />

        {/* Monto con formato monetario */}
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <NumericFormat
              {...field}
              value={value}
              onValueChange={(values) => {
                onChange(values.floatValue);
              }}
              thousandSeparator={true}
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              prefix="$"
              customInput={TextField}
              label="Monto"
              error={!!errors.amount}
              helperText={errors.amount?.message}
              fullWidth
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
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />

        <FormControl error={!!errors.category}>
          <InputLabel>Categorías</InputLabel>
          <Controller
            name="category"
            defaultValue=""
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

        <FormControl error={!!errors.paymentMethod}>
          <InputLabel>Método de Pago</InputLabel>
          <Controller
            name="paymentMethod"
            defaultValue=""
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
          <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
        </FormControl>

        {/* Descripción */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Descripción"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" sx={buttonSubmitSx}>
          <SaveIcon />
          guardar
        </Button>
      </Box>
    </>
  );
};
export default FormExpense;
