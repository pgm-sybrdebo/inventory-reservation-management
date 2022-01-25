import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION,
  TOTAL_DEVICE_STATUSES_BY_NAME,
  UPDATE_DEVICE_STATUS,
} from "../../../graphql/deviceStatuses";
import { useState, useEffect } from "react";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

interface UpdateFormStatusProps {
  selectedRow: any;
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

const validationSchema = yup.object({
  name: yup.string().min(1).required("Required"),
});

const UpdateFormStatus = ({
  selectedRow,
  open,
  handleClose,
  page,
  name,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: UpdateFormStatusProps) => {
  const [updateDeviceStatus] = useMutation(UPDATE_DEVICE_STATUS);

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
        <DialogTitle>Update {selectedRow.name}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: selectedRow.name,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                console.log("update");
                await updateDeviceStatus({
                  variables: {
                    id: selectedRow.id,
                    name: values.name,
                  },
                  refetchQueries: [
                    {
                      query: GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION,
                      variables: {
                        name: name,
                        offset: page * 10,
                        limit: 10,
                      },
                    },
                    {
                      query: TOTAL_DEVICE_STATUSES_BY_NAME,
                      variables: {
                        name: name,
                      },
                    },
                  ],
                });
                setSnackbarSuccess(true);
                setMessage("Device status is updated!");
                setOpenSnackbar(true);
                console.log("done");
                handleClose();
              } catch (error) {
                console.log(error);
                setSnackbarSuccess(false);
                setMessage(
                  `Device status is not updated due to error: ${error}`
                );
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
                </Grid>
                <ButtonContainer>
                  <Button
                    // type='submit'
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={submitForm}
                    style={{
                      backgroundColor: "#F58732",
                      marginRight: "3rem",
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    size="large"
                    fullWidth
                    style={{
                      borderColor: "#ED0034",
                      borderWidth: "2px",
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

export default UpdateFormStatus;
