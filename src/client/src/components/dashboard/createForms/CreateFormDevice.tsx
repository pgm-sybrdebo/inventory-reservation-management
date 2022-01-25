import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import { Button, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { GET_ALL_MODELS } from "../../../graphql/models";
import {
  CREATE_DEVICE,
  GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
  TOTAL_DEVICES_BY_NAME,
  UPDATE_DEVICE,
} from "../../../graphql/devices";
import { Model } from "../../../interfaces";
import QRCode from "qrcode";
import Loading from "../Loading";
import { useState, useEffect } from "react";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

interface CreateFormDeviceProps {
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

const generateQR = async (text: string) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error(error);
  }
};

const validationSchema = yup.object({
  modelId: yup.string().required("Required"),
});

const CreateFormDevice = ({
  open,
  handleClose,
  page,
  name,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: CreateFormDeviceProps) => {
  let deviceId: string;
  let qrCode: string | undefined;
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
  const { data, loading, error } = useQuery(GET_ALL_MODELS);
  const [createDevice] = useMutation(CREATE_DEVICE, {
    update: (proxy, mutationResult) => {
      console.log("mutationResult", mutationResult);
      deviceId = mutationResult.data.createDevice.id;
    },
  });
  const [updateDevice] = useMutation(UPDATE_DEVICE);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      {loading && (
        <Box
          sx={{
            padding: 3,
          }}
        >
          <Loading />
        </Box>
      )}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <DialogTitle>Create new device</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                modelId: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  await createDevice({
                    variables: {
                      modelId: values.modelId,
                      deviceStatusId: "7b4a3256-6005-402b-916b-810f4d6669c8",
                    },
                    refetchQueries: [
                      {
                        query: GET_ALL_DEVICES_BY_NAME_WITH_PAGINATION,
                        variables: {
                          name: name,
                          offset: page * 10,
                          limit: 10,
                        },
                      },
                      {
                        query: TOTAL_DEVICES_BY_NAME,
                        variables: {
                          name: name,
                        },
                      },
                    ],
                  });

                  if (deviceId) {
                    qrCode = await generateQR(deviceId);
                  }

                  await updateDevice({
                    variables: {
                      id: deviceId,
                      qr_code: qrCode,
                    },
                  });
                  setSnackbarSuccess(true);
                  setMessage("New device is added!");
                  setOpenSnackbar(true);
                  console.log("done");
                  handleClose();
                } catch (error) {
                  console.log(error);
                  setSnackbarSuccess(false);
                  setMessage(`Device is not created due to error: ${error}`);
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
                      <InputLabel id="modelId">Model</InputLabel>
                      <Select
                        sx={{
                          width: "100%",
                        }}
                        labelId="modelId"
                        id="modelId"
                        value={values.modelId}
                        label="modelId"
                        onChange={(e: any) => {
                          setFieldValue("modelId", e.target.value);
                        }}
                      >
                        {data.models.map((model: Model) => {
                          return (
                            <MenuItem value={model.id}>{model.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                  </Grid>
                  <ButtonContainer>
                    <Button
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
      )}
    </Dialog>
  );
};

export default CreateFormDevice;
