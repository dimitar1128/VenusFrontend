import React from 'react';
import ReactTable from 'react-table-v6';
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

import request from '../../services/request';
import Aux from '../../hoc/_Aux';
import { table_columns, getCurrentDate } from './utils';

import 'react-table-v6/react-table.css';
import './index.css';
import Toaster from '../../App/layout/Toast/index';
import Modaler from '../../App/layout/Modal/index';

const formInitValues = {
  status: '1',
  start_date: getCurrentDate(),
};

const statusOptions = [
  {
    id: 1,
    title: 'Ongoing',
  },
  {
    id: 2,
    title: 'Pending',
  },
  {
    id: 3,
    title: 'Finished',
  },
];

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formValues: {},
      toastVisible: false,
      toastMessage: '',
      modalarVisible: false,
      modalarMessage: 'Are you sure you want to delete this project ?',
    };
  }

  async componentDidMount() {
    try {
      const result = await request.get('project/');
      this.setState({ data: result.data });
    } catch (error) {
      console.log(error);
    }
  }

  deleteItem = (row) => async () => {
    this.setState({ modalarVisible: true, deleteId: row.original.id });
  };

  editItem = (row) => () => {
    const newData = JSON.parse(JSON.stringify(this.state.data));
    this.setState({
      data: newData,
      selectedEle: true,
      formValues: row.original,
      showModal: true,
    });
  };

  close = async () => {
    const { formValues, selectedEle } = this.state;
    const newData = JSON.parse(JSON.stringify(this.state.data));
    if (!selectedEle) {
      const result = await request.post('project/', formValues);
      newData.push({ ...formValues, id: result.data.id });
    } else {
      await request.put(`project/${formValues.id}/`, formValues);
      const exist = newData.find((x) => x.id === formValues.id);
      const index = newData.findIndex((x) => x.id === formValues.id);
      if (index >= 0) {
        newData[index] = { ...exist, ...formValues };
      }
    }
    const toastMessage = selectedEle
      ? 'Project has been successfully updated.'
      : 'Project has been successfully added.';
    this.setState({
      showModal: false,
      data: newData,
      toastVisible: true,
      toastMessage,
    });
  };

  open = () => {
    this.setState({
      selectedEle: null,
      formValues: formInitValues,
      showModal: true,
    });
  };

  textChange = (e) => {
    const { formValues } = this.state;
    const { name, value } = e.target;
    this.setState({
      formValues: { ...formValues, [name]: value },
    });
  };

  getStatus = ({ original }) => {
    const item = statusOptions.find((x) => x.id === +original.status);
    return item.title;
  };

  toastChange = () => {
    const { toastVisible } = this.state;
    this.setState({ toastVisible: !toastVisible });
  };

  modalarChange = () => {
    const { modalarVisible } = this.state;
    this.setState({ modalarVisible: !modalarVisible });
  };

  yesAction = async () => {
    this.modalarChange();
    const { deleteId } = this.state;
    try {
      const newData = JSON.parse(JSON.stringify(this.state.data));
      await request.delete(`project/${deleteId}`);
      this.setState({
        data: newData.filter((x) => x.id !== deleteId),
        toastVisible: true,
        toastMessage: 'Project has been successfully deleted.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const columns = [
      ...table_columns,
      {
        Header: 'Status',
        accessor: 'status',
        className: 'center',
        Cell: (row) => this.getStatus(row),
      },
      {
        Header: 'Actions',
        accessor: 'name',
        Cell: (row) => (
          <React.Fragment>
            <div className="text-center">
              <i
                className="feather icon-edit"
                style={{ fontSize: '18px' }}
                onClick={this.editItem(row)}
              />
              <i
                className="feather icon-trash"
                style={{ fontSize: '18px' }}
                onClick={this.deleteItem(row)}
              />
            </div>
          </React.Fragment>
        ),
      },
    ];

    return (
      <Aux>
        <Row>
          <Toaster
            isVisible={this.state.toastVisible}
            onChange={this.toastChange}
            message={this.state.toastMessage}
          />
          <Modaler
            isVisible={this.state.modalarVisible}
            onChange={this.modalarChange}
            message={this.state.modalarMessage}
            yesAction={this.yesAction}
          />
          <Col md={12} xl={12}>
            <Card className="card-social">
              <Card.Body>
                <Button
                  bsstyle="primary"
                  bssize="large"
                  onClick={this.open}
                  className="mb-3"
                >
                  Add Project
                </Button>

                <Modal
                  show={this.state.showModal}
                  onHide={() => this.setState({ showModal: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {this.state.selectedEle ? 'Edit ' : 'Add'} Project
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>
                      <Col md={12}>
                        <Form>
                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Title
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="name"
                                type="text"
                                value={this.state.formValues?.name}
                                onChange={this.textChange}
                                required
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Client Name
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="client_name"
                                type="text"
                                value={this.state.formValues?.client_name}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Country
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="country"
                                type="text"
                                value={this.state.formValues?.country}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Cost
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="cost"
                                type="text"
                                value={this.state.formValues?.cost}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Contact
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="contact"
                                as="textarea"
                                rows="3"
                                value={this.state.formValues?.contact}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Note
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="note"
                                as="textarea"
                                rows="3"
                                value={this.state.formValues?.note}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Start Date
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="start_date"
                                type="date"
                                value={this.state.formValues?.start_date}
                                onChange={this.textChange}
                              />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm="3">
                              Status
                            </Form.Label>
                            <Col sm="9">
                              <Form.Control
                                name="status"
                                as="select"
                                className="mb-3"
                                value={this.state.formValues?.status}
                                onChange={this.textChange}
                              >
                                {statusOptions.map((x) => (
                                  <option value={x.id}>{x.title}</option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>
                      {this.state.selectedEle ? 'Update' : 'Submit'}
                    </Button>
                  </Modal.Footer>
                </Modal>
                <ReactTable
                  data={this.state.data}
                  columns={columns}
                  defaultPageSize={15}
                  pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
                  className="react-table"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Projects;
