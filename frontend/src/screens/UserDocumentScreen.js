import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  getUserDocuments,
  deleteDocument,
  getUserDetails,
  userUploadDoc,
  downloadDocument,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";

const UserDocumentScreen = ({ history }) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [type, setType] = useState("NBC");
  const [document, setDocument] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userUploadDocument = useSelector((state) => state.userUploadDocument);
  const {
    loading: loadingUpload,
    success: successUpload,
    error: errorUpload,
  } = userUploadDocument;

  const userDocumentList = useSelector((state) => state.userDocumentList);
  const {
    documents,
    loading: loadingDocumentList,
    error: errorDocumentList,
  } = userDocumentList;

  const userDeleteDocument = useSelector((state) => state.userDeleteDocument);
  const {
    loading: loadingDeleteDocument,
    success: successDeleteDocument,
  } = userDeleteDocument;

  const userDownloadDocument = useSelector(
    (state) => state.userDownloadDocument
  );
  const {
    success: successDownload,
    error: errorDownload,
    loading: loadingDownload,
  } = userDownloadDocument;

  const { register, errors, handleSubmit } = useForm();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getUserDocuments());
      dispatch(getUserDetails("profile"));

      if (successUpload) {
        setDocument("");
      }
    }
  }, [history, dispatch, userInfo, successUpload, successDeleteDocument]);

  const uploadFileHandler = async (e) => {
    const file = e.document[0];
    // const file = e.target.files[0];

    const formData = new FormData();
    formData.append("document", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/document",
        formData,
        config
      );

      dispatch(
        userUploadDoc({
          name:
            userInfo.name + "-" + type + "-" + dayjs().format("MMDDYYYYHHmm"),
          url: data,
          type: type,
          userId: user._id,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDocument(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const downloadFile = (id) => {
    dispatch(downloadDocument(id));
  };

  return (
    <>
      <h1>Documents</h1>

      <Container className='bg-info px-3 py-2 rounded-lg mt-5'>
        <Container className='d-flex justify-content-center py-3'>
          <Form onSubmit={handleSubmit(uploadFileHandler)} className='w-50'>
            <Form.Group controlId='type'>
              <Form.Label className='text-white'>Document Type</Form.Label>
              <Form.Control
                as='select'
                onChange={(e) => setType(e.target.value)}
              >
                <option value='NBC'>NBC</option>
                <option value='PDS'>PDS</option>
              </Form.Control>
            </Form.Group>

            <Form.File
              id='image-file'
              label={document ? document : "Choose file"}
              custom
              ref={register({
                validate: (value) => {
                  return (
                    value[0].type ===
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    value[0].type ===
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    value[0].type === "application/vnd.ms-excel"
                  );
                },
                required: true,
              })}
              name='document'
              onChange={(e) => setDocument(e.target.files[0].name)}
            ></Form.File>

            {errors.document && (
              <div className='mt-2'>
                <Message variant='danger'>
                  {errors.document?.type === "required" && (
                    <div>A file is required</div>
                  )}
                  {errors.document?.type === "validate" && (
                    <div>docx, xlsx and xls files only</div>
                  )}
                </Message>
              </div>
            )}

            {loadingUpload ? (
              <div className='mt-3'>
                <Loader color='text-warning' />
              </div>
            ) : (
              <Button type='submit' variant='warning' className='mt-2'>
                Submit
              </Button>
            )}
          </Form>

          {errorUpload && <Message variant='danger'>{errorUpload}</Message>}
        </Container>

        {loadingDocumentList || loadingDeleteDocument ? (
          <Loader color='text-warning' />
        ) : documents && documents.length ? (
          <div>
            <Table
              striped
              bordered
              hover
              responsive
              className='bg-light rounded-lg my-3'
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => {
                  return (
                    <tr key={doc._id}>
                      <td>{doc.name}</td>
                      <td>{doc.type}</td>
                      <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                      <td>
                        <Button
                          variant='warning'
                          className='btn-sm mr-2'
                          onClick={() => downloadFile(doc._id)}
                        >
                          <i className='fas fa-file-download text-white'></i>
                        </Button>
                        <Button variant='info' className='btn-sm mr-2'>
                          <i className='fas fa-edit'></i>
                        </Button>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(doc._id)}
                        >
                          <i className='fas fa-trash-alt '></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            {errorDocumentList && (
              <Message variant='danger'>{errorDocumentList}</Message>
            )}
          </div>
        ) : (
          <Message variant='secondary'>
            {" "}
            You haven't uploaded any document yet...
          </Message>
        )}
      </Container>
    </>
  );
};

export default UserDocumentScreen;
