import { useMutation, useQuery } from "@apollo/client";
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
import { Formik, Form, Field } from "formik";
import {
  GET_ALL_MODELS_BY_NAME_WITH_PAGINATION,
  TOTAL_MODELS_BY_NAME,
  UPDATE_MODEL,
} from "../../../graphql/models";
import {
  CREATE_MEDIA,
  GET_PICTURE_BY_MODEL_ID,
  SOFT_REMOVE_MEDIA,
  UPDATE_MEDIA,
} from "../../../graphql/media";
import Loading from "../Loading";
import defaultImage from "../../../assets/device.jpg";
import { useState, useEffect } from "react";

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
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  display: block;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface UpdateFormModelProps {
  selectedRow: any;
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

interface Spec {
  label: string;
  value: string;
}

const validationSchema = yup.object({
  name: yup.string().min(1, "Too short").required("Required"),
  description: yup.string().min(1, "Too short").required("Required"),
  quantity: yup.number().min(0).max(1000).required("Required"),
  readyQuantity: yup.number().min(0).max(1000).required("Required"),
  brand: yup.string().min(1, "Too short").required("Required"),
  max_reservation_time: yup.number().min(1).max(100).required("Required"),
  image: yup.string(),
});

const UpdateFormModel = ({
  selectedRow,
  open,
  handleClose,
  page,
  name,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: UpdateFormModelProps) => {
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
  const { data, loading, error } = useQuery(GET_PICTURE_BY_MODEL_ID, {
    variables: {
      modelId: selectedRow.id,
    },
  });
  const [updateModel] = useMutation(UPDATE_MODEL);
  const [deleteMedia] = useMutation(SOFT_REMOVE_MEDIA);
  const [createMedia] = useMutation(CREATE_MEDIA);

  if (data) {
    console.log(data);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {loading && <Loading />}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <DialogTitle>Update model</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: selectedRow.name,
                description: selectedRow.description,
                quantity: selectedRow.quantity,
                readyQuantity: selectedRow.readyQuantity,
                brand: selectedRow.brand,
                max_reservation_time: selectedRow.max_reservation_time,
                image: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  console.log(selectedRow.id);
                  console.log("start submitting");
                  await updateModel({
                    variables: {
                      id: selectedRow.id,
                      name: values.name,
                      description: values.description,
                      quantity: Number(values.quantity),
                      readyQuantity: Number(values.readyQuantity),
                      brand: values.brand,
                      max_reservation_time: Number(values.max_reservation_time),
                    },
                    refetchQueries: [
                      {
                        query: GET_ALL_MODELS_BY_NAME_WITH_PAGINATION,
                        variables: {
                          name: name,
                          offset: page * 10,
                          limit: 10,
                        },
                      },
                      {
                        query: TOTAL_MODELS_BY_NAME,
                        variables: {
                          name: name,
                        },
                      },
                    ],
                  });

                  if (values.image !== null && values.image !== "") {
                    const imgData = new FormData();
                    imgData.append("image", values.image);
                    const uploadRequest = await fetch(
                      "http://localhost:3000/uploadModelPictures",
                      {
                        method: "POST",
                        headers: new Headers({ Accept: "application/json" }),
                        body: imgData,
                      }
                    );
                    const uploadResponse = await uploadRequest.json();
                    console.log("id", data.mediaByModelId.id);
                    await deleteMedia({
                      variables: {
                        id: data.mediaByModelId.id,
                      },
                    });
                    await createMedia({
                      variables: {
                        modelId: selectedRow.id,
                        type: uploadResponse[0].type,
                        source: uploadResponse[0].filename,
                      },
                      refetchQueries: [
                        {
                          query: GET_PICTURE_BY_MODEL_ID,
                          variables: {
                            modelId: selectedRow.id,
                          },
                        },
                      ],
                    });
                  }
                  setSnackbarSuccess(true);
                  setMessage("Model is updated!");
                  setOpenSnackbar(true);
                  console.log("done");
                  handleClose();
                } catch (error) {
                  console.log(error);
                  setSnackbarSuccess(false);
                  setMessage(`Model is not updated due to error: ${error}`);
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
                        onChange={(e: any) => {
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
                          padding: "0.5rem",
                        }}
                        type="text"
                        aria-label="Description:"
                        value={values.description}
                        onChange={(e: any) => {
                          setFieldValue("description", e.target.value);
                        }}
                        error={Boolean(
                          touched.description && errors.description
                        )}
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
                        onChange={(e: any) => {
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
                        onChange={(e: any) => {
                          setFieldValue("readyQuantity", e.target.value);
                        }}
                        error={Boolean(
                          touched.readyQuantity && errors.readyQuantity
                        )}
                        helperText={
                          touched.readyQuantity && errors.readyQuantity
                        }
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
                        onChange={(e: any) => {
                          setFieldValue("brand", e.target.value);
                        }}
                        error={Boolean(touched.brand && errors.brand)}
                        helperText={touched.brand && errors.brand}
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
                        onChange={(e: any) => {
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
                    <Grid item xs={12}>
                      <Text>Model Image</Text>
                      <ImageContainer>
                        <Image
                          src={
                            data.mediaByModelId.source
                              ? `http://localhost:3000/model-image/${data.mediaByModelId.source}`
                              : defaultImage
                          }
                          alt={selectedRow.name}
                        />
                        <Label htmlFor="modelImage">Change model Image</Label>
                        <Input
                          id="modelImage"
                          type="file"
                          name="modelImage"
                          onChange={(e: any) => {
                            if (e.target.files) {
                              setFieldValue("image", e.target.files[0]);
                            }
                          }}
                        />
                      </ImageContainer>
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

export default UpdateFormModel;
