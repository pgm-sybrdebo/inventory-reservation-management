import { useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import {
  CREATE_DEVICE_STATUS,
  GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION,
  TOTAL_DEVICE_STATUSES_BY_NAME,
} from "../../../graphql/deviceStatuses";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { Add, Remove } from "@material-ui/icons";
import { bgcolor, borderColor } from "@mui/system";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

interface CreateFormModelProps {
  open: boolean;
  handleClose: any;
}

interface Spec {
  label: string;
  value: string;
}

const makeNewArray = (array: Spec[]) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push({
      [array[i].label]: array[i].value,
    });
  }
  return newArray;
};

const validationSchema = yup.object({
  name: yup.string().min(1, "Too short").required("Required"),
  description: yup.string().min(1, "Too short").required("Required"),
  quantity: yup.number().min(0).max(1000).required("Required"),
  readyQuantity: yup.number().min(0).max(1000).required("Required"),
  brand: yup.string().min(1, "Too short").required("Required"),
  specifications: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().min(1, "Too short").required("Required"),
        value: yup.string().min(1, "Too short").required("Required"),
      })
    )
    .required("Required"),
  max_reservation_time: yup.number().min(0).max(100).required("Required"),
});

const CreateFormModel = ({ open, handleClose }: CreateFormModelProps) => {
  const [createDeviceStatus] = useMutation(CREATE_DEVICE_STATUS);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <>
        <DialogTitle>Create new model</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              description: "",
              quantity: 0,
              readyQuantity: 0,
              brand: "",
              specifications: [],
              max_reservation_time: 0,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                console.log("create");
                console.log("specs", values.specifications);
                if (values.specifications.length > 0) {
                  const specs = makeNewArray(values.specifications);
                  console.log("specsNew", specs);
                }

                // await createDeviceStatus({
                //   variables: {
                //     name: values.name
                //   },
                //   refetchQueries: [
                //     {
                //       query: GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION,
                //       variables: {
                //         name: "",
                //         offset: 0,
                //         limit: 10
                //       }
                //     },
                //     {
                //       query:
                //       TOTAL_DEVICE_STATUSES_BY_NAME,
                //       variables: {
                //         name: "",
                //       }
                //     }
                //   ]
                // });
                console.log("done");
                handleClose();
              } catch (error) {
                console.log(error);
              }
              setSubmitting(false);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              isSubmitting,
              handleChange,
              submitForm,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="name"
                      type="text"
                      label="Name:"
                      value={values.name}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="description">Description:</Label>
                    <Field
                      id="description"
                      component={TextareaAutosize}
                      fullWidth
                      minRows={5}
                      name="description"
                      style={{
                        width: "100%",
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                      }}
                      type="text"
                      aria-label="Description:"
                      value={values.description}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("description", e.target.value);
                      }}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="quantity"
                      type="number"
                      label="Quantity:"
                      value={values.quantity}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("quantity", e.target.value);
                      }}
                      error={Boolean(touched.quantity && errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="readyQuantity"
                      type="number"
                      label="Ready quantity:"
                      value={values.readyQuantity}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("readyQuantity", e.target.value);
                      }}
                      error={Boolean(
                        touched.readyQuantity && errors.readyQuantity
                      )}
                      helperText={touched.readyQuantity && errors.readyQuantity}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="brand"
                      type="text"
                      label="Brand:"
                      value={values.brand}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("brand", e.target.value);
                      }}
                      error={Boolean(touched.brand && errors.brand)}
                      helperText={touched.brand && errors.brand}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="specifications"
                      render={(arrayHelpers) => (
                        <div>
                          <Typography
                            noWrap
                            component="div"
                            sx={{
                              flexGrow: 1,
                              mb: 1,
                              color: "rgba(0, 0, 0, 0.54)",
                              fontSize: "0.9rem",
                            }}
                          >
                            Specifications
                          </Typography>
                          {values.specifications &&
                          values.specifications.length > 0 ? (
                            values.specifications.map((val, index) => (
                              <div key={index}>
                                <Grid>
                                  <Field
                                    component={TextField}
                                    name={`specifications.${index}.label`}
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        `specifications.${index}.label`,
                                        e.target.value
                                      );
                                    }}
                                    type="text"
                                    label="Specification label"
                                  />
                                  <Field
                                    component={TextField}
                                    name={`specifications.${index}.value`}
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        `specifications.${index}.value`,
                                        e.target.value
                                      );
                                    }}
                                    type="text"
                                    label="Specification value"
                                  />
                                  <Button
                                    sx={{
                                      marginRight: 1,
                                      marginLeft: 3,
                                      color: "#F58732",
                                      borderColor: "#F58732",
                                      ":hover": {
                                        bgcolor: "#F58732",
                                        color: "#FFF",
                                        borderColor: "#F58732",
                                      },
                                    }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Remove />
                                  </Button>

                                  <Button
                                    sx={{
                                      margin: 1,
                                      color: "#F58732",
                                      borderColor: "#F58732",
                                      ":hover": {
                                        bgcolor: "#F58732",
                                        color: "#FFF",
                                        borderColor: "#F58732",
                                      },
                                    }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() =>
                                      arrayHelpers.push({
                                        label: "",
                                        value: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </Grid>
                              </div>
                            ))
                          ) : (
                            <Button
                              sx={{
                                margin: 1,
                                color: "#F58732",
                                borderColor: "#F58732",
                                ":hover": {
                                  bgcolor: "#F58732",
                                  color: "#FFF",
                                  borderColor: "#F58732",
                                },
                              }}
                              variant="outlined"
                              disabled={isSubmitting}
                              onClick={() =>
                                arrayHelpers.push({
                                  label: "",
                                  value: "",
                                })
                              }
                            >
                              Add specification
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="max_reservation_time"
                      type="number"
                      label="Max reservation time (in days):"
                      value={values.max_reservation_time}
                      // @ts-ignore
                      onChange={(e) => {
                        setFieldValue("max_reservation_time", e.target.value);
                      }}
                      error={Boolean(
                        touched.max_reservation_time &&
                          errors.max_reservation_time
                      )}
                      helperText={
                        touched.max_reservation_time &&
                        errors.max_reservation_time
                      }
                    />
                  </Grid>
                </Grid>
                <ButtonContainer>
                  <Button
                    // type='submit'
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={submitForm}
                    sx={{
                      backgroundColor: "#F58732",
                      marginRight: "3rem",
                      ":hover": {
                        bgcolor: "#F58732",
                      },
                      //   ":hover": {
                      //     bgcolor: "#FFF",
                      //     color: "#F58732",
                      //     borderColor: "#F58732",
                      //     borderWidth: 2,
                      //   },
                    }}
                  >
                    Create
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                      borderColor: "#ED0034",
                      color: "#ED0034",
                      borderWidth: 2,
                      ":hover": {
                        borderColor: "#ED0034",
                        color: "#FFF",
                        borderWidth: 2,
                        bgcolor: "rgba(238, 0, 52, 0.4)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonContainer>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default CreateFormModel;
