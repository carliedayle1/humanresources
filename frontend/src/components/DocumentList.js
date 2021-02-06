import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDocument } from "../actions/userActions";
import { Table, Button } from "react-bootstrap";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const DocumentList = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDocumentList = useSelector((state) => state.userDocumentList);
  const { documents: profileDocuments } = userDocumentList;

  const userDocuments = useSelector((state) => state.userDocuments);
  const { documents: employeeDocuments } = userDocuments;

  let pr, er, mac;

  if (profileDocuments.length > 0) {
    pr = profileDocuments.filter((doc) => doc.type === "PR");
    er = profileDocuments.filter((doc) => doc.type === "ER");
    mac = profileDocuments.filter((doc) => doc.type === "MAC");
  } else {
    pr = employeeDocuments.filter((doc) => doc.type === "PR");
    er = employeeDocuments.filter((doc) => doc.type === "ER");
    mac = employeeDocuments.filter((doc) => doc.type === "MAC");
  }

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

  return (
    <div className='text-white px-5'>
      {pr.length > 0 && (
        <>
          <h5>Personal Records</h5>

          <div className='mt-3'>
            <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Date Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pr.map((doc) => {
                  return (
                    <tr key={doc._id}>
                      <td>{doc.name}</td>
                      <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                      <td>
                        {userInfo && userInfo.isAdmin && (
                          <a
                            href={doc.url}
                            download={doc.url}
                            target='_blank'
                            without='true'
                            rel='noreferrer'
                          >
                            <Button className='btn btn-sm btn-primary mr-2'>
                              Download
                            </Button>
                          </a>
                        )}

                        {userInfo && doc.user.idNumber === userInfo.idNumber && (
                          <Button
                            onClick={() => deleteHandler(doc._id)}
                            className='btn btn-sm btn-danger'
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}

      {er.length > 0 && (
        <>
          <h5>Educational Records</h5>

          <div className='mt-3'>
            <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Date Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {er.map((doc) => {
                  return (
                    <tr key={doc._id}>
                      <td>{doc.name}</td>
                      <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                      <td>
                        {userInfo && userInfo.isAdmin && (
                          <a
                            href={doc.url}
                            download={doc.url}
                            target='_blank'
                            without='true'
                            rel='noreferrer'
                          >
                            <Button className='btn btn-sm btn-primary mr-2'>
                              Download
                            </Button>
                          </a>
                        )}

                        {userInfo && doc.user.idNumber === userInfo.idNumber && (
                          <Button
                            onClick={() => deleteHandler(doc._id)}
                            className='btn btn-sm btn-danger'
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}

      {mac.length > 0 && (
        <>
          <h5>Merits, Awards &amp; CertificateS</h5>

          <div className='mt-3'>
            <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Date Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mac.map((doc) => {
                  return (
                    <tr key={doc._id}>
                      <td>{doc.name}</td>
                      <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                      <td>
                        {userInfo && userInfo.isAdmin && (
                          <a
                            href={doc.url}
                            download={doc.url}
                            target='_blank'
                            without='true'
                            rel='noreferrer'
                          >
                            <Button className='btn btn-sm btn-primary mr-2'>
                              Download
                            </Button>
                          </a>
                        )}
                        {userInfo && doc.user.idNumber === userInfo.idNumber && (
                          <Button
                            onClick={() => deleteHandler(doc._id)}
                            className='btn btn-sm btn-danger'
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentList;
