import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import OutsideClick from "./OutsideClick"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class DropDown extends Component {
    render() {
        return (
            <OutsideClick onOutsideClick={this.props.toggleOffDropdown}>
                <div className="EditDropdown formDropdown">
                    <div className="items" onClick={this.props.onEditClick}><i className="fa fa-pen"></i><div>Edit</div></div>
                    <div className="items" onClick={this.props.onRemoveClick}><i className="fa fa-trash-alt"></i><div>Remove</div></div>
                </div>
            </OutsideClick>
        )
    }
}


class FormDataEditModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            label: props.data.label || "",
            placeholder: props.data.settings.placeholder || "",
            description: props.data.settings.description || "",
            readonly: props.data.settings.readonly || false,
            mandatory: props.data.settings.mandatory || false,
        }
    };



    render() {
        let props = this.props
        let { data } = props
        return (
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                {
                    data && <ModalHeader toggle={props.toggle}>Edit Form Field (ID: {data.id})</ModalHeader>
                }
                {
                    data &&
                    <ModalBody>
                        <div className="form-group">
                            <div>
                                <label>Label</label>
                                <input className="form-input form-control" onChange={(e) => { this.setState({ label: e.target.value }) }} defaultValue={data.label ? data.label : ""} />
                            </div>
                            <br />
                            <div>
                                <label>Placeholder</label>
                                <input className="form-input form-control" onChange={(e) => { this.setState({ placeholder: e.target.value }) }} defaultValue={data.settings.placeholder ? data.settings.placeholder : ""} />
                            </div>
                            <br />
                            <div>
                                <label>Description</label>
                                <input className="form-input form-control" onChange={(e) => { this.setState({ description: e.target.value }) }} defaultValue={data.settings.description ? data.settings.description : ""} />
                            </div>
                            <br />
                            <div className="checkbox">
                                <label><input type="checkbox" value="" onChange={(e) => { this.setState({ readonly: !this.state.readonly }) }} defaultChecked={data.settings.readonly} />Read Only</label>
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" value="" onChange={(e) => { this.setState({ mandatory: !this.state.mandatory }) }} defaultChecked={data.settings.mandatory} />Mandatory</label>
                            </div>

                        </div>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { this.props.onSaveClick({ ...props.data, label: this.state.label, settings: { ...props.data.settings, ...this.state } }) }}>Save Changes</Button>{' '}
                            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                        </ModalFooter>

                    </ModalBody>
                }

            </Modal>
        )
    }
}

const getFieldUI = (data) => {

    let UIComponent = null

    switch (data.fieldType) {
        case "text":
            UIComponent = <input className="form-input form-control" type="text" placeholder={data.settings.placeholder} />
            break
        case "select":
            UIComponent = <select className="form-control" placeholder={data.settings.placeholder}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
            break
        case "phone":
            UIComponent = <input className="form-input form-control" type="phone" placeholder={data.settings.placeholder} />
            break
        case "email":
            UIComponent = <input className="form-input form-control" type="email" placeholder={data.settings.placeholder} />
            break
        case "address":
            UIComponent = <input className="form-input form-control" type="address" placeholder={data.settings.placeholder} />
            break
        default:
            UIComponent = <input className="form-input form-control" placeholder={data.settings.placeholder} />
            break
    }

    return UIComponent

}

class FormUI extends Component {

    state = {
        showDropDown: false,
    }

    onRemoveClick = () => {
        this.props.removeFormInput(this.props.data)
    }

    onEditClick = () => {
        this.props.onEditClick(this.props.data)
    }

    render() {
        let UIComponent = getFieldUI(this.props.data)

        let { data } = this.props

        return (
            <div className="form-group form-input-ui" style={{ margin: "0px", padding: "10px 0px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex' }}>
                        <label style={{ fontWeight: "400" }}>{data.name || data.label}</label>
                    </div>
                    <div style={{ marginRight: "10px", display: "flex" }}>
                        {data.settings.mandatory && <div className="form-label-tag mandatory">mandatory</div>}
                        {data.settings.readonly && <div className="form-label-tag readonly">readonly</div>}
                        <i className="fas fa-pen form-input-button" onClick={() => { this.setState({ showDropDown: true }) }} style={{ cursor: "pointer", marginLeft: "20px" }}></i>
                    </div>
                </div>
                {UIComponent}
                {this.state.showDropDown && <DropDown onRemoveClick={this.onRemoveClick} onEditClick={this.onEditClick} toggleOffDropdown={() => { this.setState({ showDropDown: false }) }} />}
            </div>
        )
    }
}


export default class FormGenerator extends Component {

    state = {
        showEditFormModal: false,
        currentEditData: null
    }

    toggleEditModal = () => {

        if (this.state.showEditFormModal) {
            this.setState({ currentEditData: null })
        }

        this.setState({ showEditFormModal: !this.state.showEditFormModal })
    }

    onEditClick = (data) => {
        this.setState({ showEditFormModal: true, currentEditData: data })
    }

    onSaveClick = (data) => {
        this.props.editFormField(data)
        this.toggleEditModal()
    }

    render() {
        let { pageData, provided } = this.props
        let isPageEmpty = pageData.length === 0

        return (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: "80vh", height: "100%" }} className="form-wrapper">
                {this.state.currentEditData && <FormDataEditModal onSaveClick={this.onSaveClick} data={this.state.currentEditData} isOpen={this.state.showEditFormModal} toggle={this.toggleEditModal} />}
                {
                    pageData.map((data, i) => {
                        if (data.type === "FIELD") {
                            return (
                                <Draggable
                                    key={data.id}
                                    draggableId={parseInt(data.id)}
                                    index={i}
                                >
                                    {
                                        (prov, snap) => {
                                            return (
                                                <div className={`form-input-wrapper ${snap.isDragging && "isDragging"}`} key={data.id} ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{ ...prov.draggableProps.style }}>
                                                    <FormUI onEditClick={this.onEditClick} removeFormInput={this.props.removeFormInput} data={data} key={i} />
                                                </div>
                                            )
                                        }}
                                </Draggable>
                            )
                        }
                        else if (data.type === "SECTION") {
                            return (
                                <div key={data.name} className="form-section">
                                    {
                                        data.data.map((fieldData, i) => {
                                            if (fieldData.type === "FIELD") {
                                                return <FormUI onSaveClick={this.onSaveClick} removeFormInput={this.removeFormInput} data={fieldData} key={i} index={i} />
                                            }
                                        })
                                    }
                                </div>
                            )
                        }
                    })
                }{
                    isPageEmpty &&
                    <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "300" }}>
                        Drag the fields here and edit them!
                    </div>
                }
            </div>
        )
    }
}
