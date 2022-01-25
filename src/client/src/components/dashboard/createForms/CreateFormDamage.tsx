import { useMutation } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { Button, Input } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { CREATE_DAMAGE } from "../../../graphql/damages";
import {
  GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION,
  TOTAL_DEVICES_IN_CHECK_BY_NAME,
} from "../../../graphql/devices";
import { useState, useEffect } from "react";
import "dotenv/config";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

interface CreateFormDamageProps {
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
  selectedRow: any;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

const validationSchema = yup.object({
  title: yup.string().min(1, "Too short").required("Required"),
  description: yup.string().min(1, "Too short").required("Required"),
  picture: yup.string().min(1).required("Required"),
});

const CreateFormDamage = ({
  open,
  handleClose,
  page,
  name,
  selectedRow,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: CreateFormDamageProps) => {
  const [createDamage] = useMutation(CREATE_DAMAGE);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  useEffect(() => {
    if (typeof onSnackbarMessageChange === "function") {
      onSnackbarMessageChange(message);
    }
    if (typeof onOpenSnackbarChange === "function") {
      onOpenSnackbarChange(openSnackbar);
    }
    if (typeof onSnackbarSuccessChange === "function") {
      onSnackbarSuccessChange(snackbarSuccess);
    }
  }, [
    message,
    openSnackbar,
    snackbarSuccess,
    onSnackbarMessageChange,
    onOpenSnackbarChange,
    onSnackbarSuccessChange,
  ]);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <>
        <DialogTitle>Add new damage to device</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              description: "",
              picture: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const imgData = new FormData();
                if (values.picture !== null) {
                  imgData.append("image", values.picture);
                }

                const uploadRequest = await fetch(
                  `${process.env.REACT_APP_UPLOAD_PATH_DAMAGE_PICTURE}`,
                  {
                    method: "POST",
                    headers: new Headers({ Accept: "application/json" }),
                    body: imgData,
                  }
                );
                const uploadResponse = await uploadRequest.json();

                await createDamage({
                  variables: {
                    deviceId: selectedRow.id,
                    title: values.title,
                    description: values.description,
                    picture: uploadResponse.filename,
                  },
                  refetchQueries: [
                    {
                      query: GET_ALL_DEVICES_IN_CHECK_BY_NAME_WITH_PAGINATION,
                      variables: {
                        name: name,
                        offset: page * 10,
                        limit: 10,
                      },
                    },
                    {
                      query: TOTAL_DEVICES_IN_CHECK_BY_NAME,
                      variables: {
                        name: name,
                      },
                    },
                  ],
                });
                setSnackbarSuccess(true);
                setMessage("New damage is added!");
                setOpenSnackbar(true);
                handleClose();
              } catch (error) {
                setSnackbarSuccess(false);
                setMessage(`Damage is not created due to error: ${error}`);
                setOpenSnackbar(true);
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
                      name="title"
                      type="text"
                      label="Title:"
                      value={values.title}
                      onChange={(e: any) => {
                        setFieldValue("title", e.target.value);
                      }}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
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
                      onChange={(e: any) => {
                        setFieldValue("description", e.target.value);
                      }}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Label htmlFor="damageImage">Add damage picture</Label>
                    <Input
                      id="damageImage"
                      type="file"
                      name="damageImage"
                      onChange={(e: any) => {
                        if (e.target.files) {
                          setFieldValue("picture", e.target.files[0]);
                        }
                      }}
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

export default CreateFormDamage;
