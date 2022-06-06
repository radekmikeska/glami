import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { nameSchema } from "../../validation-schemas/name";
import { percentageSchema } from "../../validation-schemas/percentage";

const validationSchema = yup.object().shape({
  name: nameSchema.required("Name is required."),
  percentage: percentageSchema.required("Percentage is required."),
});

const CreateCategoryForm = (props) => {
  const { onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      percentage: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, percentage: Number.parseInt(values.percentage) });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h2">Create category</Typography>
      <InputContainer>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </InputContainer>

      <InputContainer>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "-?[0-9]*" }}
          fullWidth
          id="percentage"
          name="percentage"
          label="Percentage"
          value={formik.values.percentage}
          onChange={formik.handleChange}
          error={formik.touched.percentage && Boolean(formik.errors.percentage)}
          helperText={formik.touched.percentage && formik.errors.percentage}
        />
      </InputContainer>
      <Button color="primary" variant="contained" fullWidth type="submit">
        create
      </Button>
    </form>
  );
};

export default CreateCategoryForm;

const InputContainer = styled.div`
  padding: 10px;
`;
