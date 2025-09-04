import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Categories = ({ arrayTransaction, arrayPay, control, errors }) => {
  return (
    <>
      <FormControl error={!!errors.category}>
        <InputLabel>Categorías</InputLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Categorías">
              {arrayTransaction.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.category?.message}</FormHelperText>
      </FormControl>

      {arrayPay.length > 0 && (
        <FormControl error={!!errors.pay}>
          <InputLabel>Método de Pago</InputLabel>
          <Controller
            name="pay"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Pagos">
                {arrayPay.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.pay?.message}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};
export default Categories;
