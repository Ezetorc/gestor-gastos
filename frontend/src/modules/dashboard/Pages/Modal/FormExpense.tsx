import { buttonSubmitSx } from "@/modules/auth/components/FormLogin/FormLogin.styles";
import { expenseSchema } from "@/modules/auth/schemas/expense.schema";
import type { FormValuesExpense } from "@/modules/auth/types/expense.type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { type VariantType, useSnackbar } from "notistack";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  handleClose: () => void;
}

const FormExpense = ({ handleClose }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesExpense>({
    resolver: yupResolver(expenseSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

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

  const onSubmit: SubmitHandler<FormValuesExpense> = (data) => {
    const variant: VariantType = "success";

    enqueueSnackbar("Gasto Guardado", { variant });
    handleClose();

    console.log("Formulario enviado:", data);
  };

  return (
    <>
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
        <Controller
          name="typeTransaccion"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ display: "none" }}
              type="string"
              defaultValue="gasto"
              label="typeTransaccion"
              InputLabelProps={{ shrink: true }}
              error={!!errors.typeTransaccion}
              helperText={errors.typeTransaccion?.message}
            />
          )}
        />

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

        <FormControl error={!!errors.pay}>
          <InputLabel>Método de Pago</InputLabel>
          <Controller
            name="pay"
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
          <SaveIcon />
          guardar
        </Button>
      </Box>
    </>
  );
};
export default FormExpense;
