import { useMutation } from '@apollo/client';
import React from 'react'
import styled from 'styled-components';
import * as yup from 'yup'
import { CREATE_DEVICE_STATUS, GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION, TOTAL_DEVICE_STATUSES_BY_NAME } from '../../../graphql/deviceStatuses';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

interface CreateFormDeviceStatusProps {
  open: boolean,
  handleClose: any
}

const validationSchema = yup.object({
  name: yup.string().min(1).required("Required")
})

const CreateFormDeviceStatus = ({open, handleClose }: CreateFormDeviceStatusProps ) => {
  const [createDeviceStatus] = useMutation(CREATE_DEVICE_STATUS);

  return (
    <Dialog 
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <>
        <DialogTitle>
          Create new device status
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                console.log("create");
                await createDeviceStatus({
                  variables: {
                    name: values.name
                  }, 
                  refetchQueries: [
                    {
                      query: GET_ALL_DEVICE_STATUSES_BY_NAME_WITH_PAGINATION,
                      variables: {
                        name: "",
                        offset: 0,
                        limit: 10
                      }
                    },
                    {
                      query: 
                      TOTAL_DEVICE_STATUSES_BY_NAME,
                      variables: {
                        name: "",
                      }
                    }
                  ]
                });
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
              errors
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
                      onChange={(e) => {setFieldValue("name", e.target.value)}}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                </Grid>
                <ButtonContainer>
                  <Button
                    // type='submit'
                    variant='contained'
                    size='large'
                    fullWidth
                    disabled={isSubmitting}
                    onClick={submitForm}
                    style={{
                      backgroundColor: '#F58732',
                      marginRight: '3rem'
                    }}
                  >
                    Create
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant='outlined'
                    size='large'
                    fullWidth
                    style={{
                      borderColor: '#ED0034',
                      borderWidth: '2px' 
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
  )
}

export default CreateFormDeviceStatus
