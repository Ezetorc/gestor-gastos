import { buttonSubmitSx } from "@/modules/auth/components/FormLogin/FormLogin.styles";
import {
  incomeSchema,
  type FormValuesIncome,
} from "@/modules/dashboard/Pages/Modal/schemas/income.schema";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { type VariantType, useSnackbar } from "notistack";
import SaveIcon from "@mui/icons-material/Save";
import { NumericFormat } from "react-number-format";

interface Props {
  handleClose: () => void;
}

const FormIncome = ({ handleClose }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesIncome>({
    resolver: yupResolver(incomeSchema),
    defaultValues: {
      typeTransaccion: "ingreso",
      amount: 0,
      date: new Date(),
      category: "",
      description: "",
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const arrayIncomes = [
    {
      id: crypto.randomUUID(),
      name: "Salario",
    },
    {
      id: crypto.randomUUID(),
      name: "Alquiler",
    },
    {
      id: crypto.randomUUID(),
      name: "Venta",
    },
    {
      id: crypto.randomUUID(),
      name: "Regalo",
    },
    {
      id: crypto.randomUUID(),
      name: "Prestamo",
    },
  ];

  const onSubmit: SubmitHandler<FormValuesIncome> = (data) => {
    const variant: VariantType = "success";

    enqueueSnackbar("Ingreso Guardado", { variant });
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
              label="typeTransaccion"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.typeTransaccion}
              helperText={errors.typeTransaccion?.message}
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
              id="Fecha"
              type="date"
              label="Fecha"
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />

        <FormControl error={!!errors.category}>
          <InputLabel id="Categorias">Categorías</InputLabel>
          <Controller
            name="category"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select {...field} label="Categorías" labelId="Categorias">
                {arrayIncomes.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.category?.message}</FormHelperText>
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
export default FormIncome;
