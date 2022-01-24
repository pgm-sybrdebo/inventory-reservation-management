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
import { DeviceStatus, Model } from "../../../interfaces";
import QRCode from "qrcode";
import Loading from "../Loading";
import { GET_DEVICESTATUSES } from "../../../graphql/deviceStatuses";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
`;

interface UpdateFormDeviceProps {
  selectedRow: any;
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
}

const validationSchema = yup.object({
  modelId: yup.string().required("Required"),
});

const UpdateFormDevice = ({
  selectedRow,
  open,
  handleClose,
  page,
  name,
}: UpdateFormDeviceProps) => {
  console.log("row", selectedRow);
  const { data, loading, error } = useQuery(GET_ALL_MODELS);
  const {
    data: deviceStatusData,
    loading: deviceStatusLoading,
    error: deviceStatusError,
  } = useQuery(GET_DEVICESTATUSES);
  const [updateDevice] = useMutation(UPDATE_DEVICE);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      {loading && deviceStatusLoading && (
        <Box
          sx={{
            padding: 3,
          }}
        >
          <Loading />
        </Box>
      )}
      {error && deviceStatusError && <p>{error.message}</p>}
      {data && deviceStatusData && (
        <>
          <DialogTitle>Update device</DialogTitle>
          <Image src={selectedRow.qr_code} />
          <DialogContent>
            <Formik
              initialValues={{
                modelId: selectedRow.model.id,
                deviceStatusId: selectedRow.deviceStatus.id,
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  await updateDevice({
                    variables: {
                      id: selectedRow.id,
                      modelId: values.modelId,
                      deviceStatusId: values.deviceStatusId,
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
                    <Grid item xs={12}>
                      <InputLabel id="deviceStatusId">Device Status</InputLabel>
                      <Select
                        sx={{
                          width: "100%",
                        }}
                        labelId="deviceStatusId"
                        id="deviceStatusId"
                        value={values.deviceStatusId}
                        label="deviceStatusId"
                        onChange={(e: any) => {
                          setFieldValue("deviceStatusId", e.target.value);
                        }}
                      >
                        {deviceStatusData.deviceStatuses.map(
                          (deviceStatus: DeviceStatus) => {
                            return (
                              <MenuItem value={deviceStatus.id}>
                                {deviceStatus.name}
                              </MenuItem>
                            );
                          }
                        )}
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
                      Update
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

export default UpdateFormDevice;
