import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import HorizontalPageBar from './HorizontalPageBar';
import { fields } from './mock_data';
import './formUI.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormGenerator from './FormGenerator';
import ReactJson from 'react-json-view';

const JSONModalView = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>FORM DATA JSON VIEW</ModalHeader>
      <ModalBody>
        <div style={{ height: '500px', overflow: 'scroll' }}>
          <ReactJson name="Form Data" src={props.data} />
        </div>
      </ModalBody>
    </Modal>
  );
};

class FieldCard extends Component {
  render() {
    let { data, index } = this.props;

    return (
      <Draggable
        key={data.id}
        draggableId={data.id}
        type="form-drop"
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <div
              key={data.id}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style }}
            >
              {
                <div
                  className={`field-body ${snapshot.isDragging &&
                    'isDragging'}`}
                >
                  <div className="header">{data.label}</div>
                  {!snapshot.isDragging && (
                    <div className="description">{data.fieldType}</div>
                  )}
                </div>
              }
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default class FormUI extends Component {
  state = {
    formData: [
      {
        type: 'PAGE',
        name: 'Default Page',
        data: []
      }
    ],
    unmappedFields: fields,
    activePageName: null,
    JSONModal: false
  };

  componentDidMount = () => {
    this.setState({ activePageName: this.state.formData[0].name });
  };

  setActivePage = pageName => {
    this.setState({ activePageName: pageName });
  };

  addNewPage = pageName => {
    let updatedFormData = [...this.state.formData];

    updatedFormData.push({
      type: 'PAGE',
      name: pageName,
      data: []
    });

    let isDuplicate = false;

    this.state.formData.find(data => {
      if (data.type === 'PAGE' && data.name === pageName) {
        isDuplicate = true;
        return true;
      }
    });

    if (isDuplicate) {
      alert('Please Choose Different Name');
      return;
    }

    this.setState({ formData: updatedFormData, activePageName: pageName });
  };

  renamePage = (pageName, newPageName) => {
    let updatedFormData = [...this.state.formData];

    let duplicateArr = this.state.formData.filter((data, i) => {
      if (data.type === 'PAGE' && data.name === newPageName) {
        return true;
      }
    });

    if (duplicateArr.length >= 1) {
      alert('Please Choose Different Name');
      return;
    }

    let index = null;

    this.state.formData.find((data, i) => {
      if (data.type === 'PAGE' && data.name === pageName) {
        index = i;
        return true;
      }
    });

    updatedFormData[index].name = newPageName;

    this.setState({ formData: updatedFormData, activePageName: newPageName });
  };

  editFormField = data => {
    let updatedFormData = JSON.parse(JSON.stringify(this.state.formData));

    let activePageIndex = null;

    let activePageData = this.state.formData.find((data, i) => {
      if (data.type === 'PAGE' && data.name === this.state.activePageName) {
        activePageIndex = i;
        return true;
      }
    });

    let fieldDataIndex = null;

    console.log(data);
    activePageData.data.find((fieldData, i) => {
      if (fieldData.id === data.id) {
        fieldDataIndex = i;
        return true;
      }
    });

    console.log(fieldDataIndex);

    updatedFormData[activePageIndex].data[fieldDataIndex] = data;

    console.log(updatedFormData);

    this.setState({ formData: updatedFormData });
  };

  deletePage = pageName => {
    let updatedFormData = [...this.state.formData];

    let index = null;

    this.state.formData.find((data, i) => {
      if (data.type === 'PAGE' && data.name === pageName) {
        index = i;
        return true;
      }
    });

    let unmappedFields = [...this.state.formData[index].data];
    let updatedFields = JSON.parse(JSON.stringify(this.state.unmappedFields));
    updatedFields = [...updatedFields, ...unmappedFields];

    console.log(unmappedFields);

    updatedFormData.splice(index, 1);
    let newActivePageIndex =
      updatedFormData.length === index ? index - 1 : index;
    let isThereNoPage = updatedFormData.length === 0;

    if (isThereNoPage) {
      updatedFormData.push({
        type: 'PAGE',
        name: 'Default Page',
        data: []
      });
      newActivePageIndex = 0;
    }

    this.setState({
      formData: updatedFormData,
      activePageName: updatedFormData[newActivePageIndex].name,
      unmappedFields: updatedFields
    });
  };

  onDragStart = result => {
    let { source, type } = result;
    console.log(result);

    if (source.droppableId === 3) {
      this.setState({ allowDropInFieldBox: true });
    } else {
      this.setState({ allowDropInFieldBox: false });
    }
  };

  removeFormInput = data => {
    let updatedFields = JSON.parse(JSON.stringify(this.state.unmappedFields));
    updatedFields.push(data);
    let updatedFormData = JSON.parse(JSON.stringify(this.state.formData));

    let activePageIndex = null;

    let activePageData = this.state.formData.find((data, i) => {
      if (data.type === 'PAGE' && data.name === this.state.activePageName) {
        activePageIndex = i;
        return true;
      }
    });

    let fieldDataIndex = null;

    activePageData.data.find((fieldData, i) => {
      if (fieldData.id === data.id) {
        fieldDataIndex = i;
        return true;
      }
    });

    updatedFormData[activePageIndex].data.splice(fieldDataIndex, 1);

    this.setState({ formData: updatedFormData, unmappedFields: updatedFields });
  };

  onDragEnd = result => {
    let { destination, source, type } = result;
    if (destination === null) {
      return;
    }
    let activePageIndex = null;
    let activePageData = this.state.formData.find((data, i) => {
      if (
        data.type === 'PAGE' &&
        data.name === (this.state.activePageName || this.state.formData[0].name)
      ) {
        activePageIndex = i;
        return true;
      }
    });

    if (type === 'pagebar') {
      if (destination.index === source.index) {
        return;
      }
      let data = [...this.state.formData];
      let selectedData = this.state.formData[source.index];
      data.splice(source.index, 1);
      data.splice(destination.index, 0, selectedData);
      this.setState({ formData: data });
    }

    if (type === 'form-drop') {
      if (source.droppableId === destination.droppableId) {
        if (destination.index === source.index) {
          return;
        }
        let formData = [...this.state.formData];
        let selectedData = { ...activePageData.data[source.index] };
        activePageData.data.splice(source.index, 1);
        activePageData.data.splice(destination.index, 0, selectedData);
        formData[activePageIndex] = activePageData;
        this.setState({ formData: formData });
      } else if (source.droppableId === 2 && destination.droppableId === 3) {
        let updatedFields = JSON.parse(
          JSON.stringify(this.state.unmappedFields)
        );
        let selectedData = updatedFields.splice(source.index, 1);
        let updatedFormData = JSON.parse(JSON.stringify(this.state.formData));
        let newAddedFieldData = { ...selectedData[0], type: 'FIELD' };
        updatedFormData[activePageIndex].data.splice(
          destination.index,
          0,
          newAddedFieldData
        );
        this.setState({
          formData: updatedFormData,
          unmappedFields: updatedFields
        });
      } else if (source.droppableId === 3 && destination.droppableId === 2) {
        let updatedFields = JSON.parse(
          JSON.stringify(this.state.unmappedFields)
        );
        let selectedData = activePageData.data.splice(source.index, 1);
        updatedFields.splice(destination.index, 0, selectedData[0]);
        let updatedFormData = JSON.parse(JSON.stringify(this.state.formData));
        updatedFormData[activePageIndex] = activePageData;
        this.setState({
          formData: updatedFormData,
          unmappedFields: updatedFields
        });
      }
    }
  };

  toggleJSONView = () => {
    this.setState({ JSONModal: !this.state.JSONModal });
  };

  render() {
    let headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      fontWeight: '100',
      fontSize: '18px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    };

    let pageData = this.state.formData.filter((data, i) => {
      return data.type === 'PAGE';
    });

    let activePageIndex = null;

    let activePageData = this.state.formData.find((data, i) => {
      if (
        data.type === 'PAGE' &&
        data.name === (this.state.activePageName || this.state.formData[0].name)
      ) {
        activePageIndex = i;
        return true;
      }
    });

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
      >
        <JSONModalView
          isOpen={this.state.JSONModal}
          toggle={this.toggleJSONView}
          data={this.state.formData}
        />
        <div
          style={{
            backgroundColor: '#BCE9EC',
            padding: '10px',
            paddingTop: '60px',
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '7fr 3fr',
            gridColumnGap: '10px'
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '5px',
              borderTopLeftRadius: '0px',
              backgroundColor: 'rgb(234, 248, 245)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <HorizontalPageBar
              deletePage={this.deletePage}
              renamePage={this.renamePage}
              addNewPage={this.addNewPage}
              activePageName={this.state.activePageName}
              setActivePage={this.setActivePage}
              pageData={pageData}
            />
            <div style={headerStyle}>
              <div>
                Form Preview: <b>{activePageData.name}</b>
              </div>
              <div>
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={this.toggleJSONView}
                  className={`fas ${
                    this.state.JSONModal ? 'fa-eye' : 'fa-eye-slash'
                  }`}
                />
              </div>
            </div>
            <Droppable type="form-drop" droppableId={3}>
              {(provided, snapshot) => {
                return (
                  <div
                    style={{ padding: '20px' }}
                    className={`form-section ${snapshot.isDraggingOver &&
                      'isDraggingOver'}`}
                  >
                    <FormGenerator
                      editFormField={this.editFormField}
                      removeFormInput={this.removeFormInput}
                      provided={provided}
                      pageData={this.state.formData[activePageIndex].data}
                    />
                  </div>
                );
              }}
            </Droppable>
          </div>
          <div
            style={{
              overflow: 'hidden',
              borderRadius: '5px',
              backgroundColor: 'rgb(234, 248, 245)',
              height: '100%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <div style={headerStyle}>Fields</div>
            <Droppable
              type="form-drop"
              droppableId={2}
              isDropDisabled={!this.state.allowDropInFieldBox}
            >
              {(provided, snapshot) => {
                return (
                  <div
                    style={{
                      padding: '20px 20px',
                      height: '100%',
                      backgroundColor: snapshot.isDraggingOver
                        ? 'rgb(255, 223, 231)'
                        : ''
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.state.unmappedFields.map((data, i) => {
                      return <FieldCard data={data} index={i} />;
                    })}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
