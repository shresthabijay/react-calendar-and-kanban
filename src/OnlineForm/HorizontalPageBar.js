import React, { Component } from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd"
import OutsideClick from './OutsideClick';

class PageNameInput extends Component {
    state = {}

    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.props.onEnter && this.props.onEnter()
        }
    }

    render() {
        return (
            <input autoFocus defaultValue={this.props.defaultValue ? this.props.defaultValue : ""} className="page-name-input" onKeyDown={this.onKeyDown} onChange={this.props.onChange} />
        )
    }
}

class DropDown extends Component {
    render() {
        return (
            <OutsideClick onOutsideClick={this.props.toggleOffDropdown}>
                <div className="EditDropdown pageDropdown">
                    <div className="items" onClick={this.props.onRenameClick}><i className="fa fa-pen"></i><div>Rename</div></div>
                    <div className="items" onClick={this.props.onDeleteClick}><i className="fa fa-trash-alt"></i><div>Delete</div></div>
                </div>
            </OutsideClick>
        )
    }
}


class CardDialogBox extends Component {
    render() {
        return (
            <OutsideClick onOutsideClick={this.props.toggleOff}>
                <div className="card-dialog-box">
                    <div className="header">{this.props.header}</div>
                    <div className="description">{this.props.description}</div>
                    <div className="button-section">
                        <div className="cancel" onClick={this.props.onCancel}>Cancel</div>
                        <div className="confirm" onClick={this.props.deletePage}>Delete</div>
                    </div>
                </div>
            </OutsideClick>
        )
    }
}

class PageButton extends Component {

    state = {
        showDropdown: false,
        renameActive: false,
        inputName: ""
    }

    onHoverIn = () => {
        this.setState({ hover: true })
    }

    onHoverOut = () => {
        this.setState({ hover: false })
    }

    onInputChange = (e) => {
        this.setState({ inputName: e.target.value })
    }

    toggleDropDown = (e) => {
        this.setState({ showDropdown: !this.state.showDropdown })
        e.stopPropagation()
    }

    onRenameClick = () => {
        this.setState({ renameActive: true, showDropdown: false, inputName: this.props.data.name })
    }

    onDeleteClick = () => {
        this.setState({ showDeleteDialog: true, showDropdown: false })
    }

    hideDeleteDialog = () => {
        this.setState({ showDeleteDialog: false });
    }

    deletePage = () => {
        this.props.deletePage(this.props.data.name)
    }

    renamePage = () => {

        if (this.props.data.name === this.state.inputName || this.state.inputName.length === 0) {
            this.setState({ renameActive: false })
            return
        }

        this.setState({ renameActive: false })
        this.props.renamePage(this.props.data.name, this.state.inputName)
    }




    render() {

        const { provided, isSelected } = this.props

        let backgroundColor = isSelected ? "#cbd9db" : "#e8f1f2"
        let opacity = this.state.hover ? "0.85" : "1"

        return (
            <div className="pageButton" style={{ height: "100%", cursor: "pointer" }}>
                {!this.state.renameActive &&
                    <div
                        className="pageButton"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onMouseEnter={this.onHoverIn}
                        onMouseLeave={this.onHoverOut}
                        onClick={() => this.props.setActivePage(this.props.data.name)}
                        style={{ opacity: opacity, backgroundColor: backgroundColor, height: "74%", padding: "0px 12px", margin: "0 5px", fontSize: "15px", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", ...provided.draggableProps.style, pointer: "cursor" }}
                    >
                        {this.props.data.name}
                        <i style={{ marginLeft: "15px", fontSize: "20px", cursor: "pointer" }} onClick={this.toggleDropDown} className="fa fa-caret-down"></i>
                    </div>
                }
                {this.state.showDropdown && <DropDown toggleOffDropdown={() => { this.setState({ showDropdown: false }) }} onRenameClick={this.onRenameClick} onDeleteClick={this.onDeleteClick} />}
                {this.state.renameActive && <OutsideClick onOutsideClick={this.renamePage}><div><PageNameInput defaultValue={this.props.data.name} onEnter={this.renamePage} onChange={this.onInputChange} /></div></OutsideClick>}
                {this.state.showDeleteDialog && <CardDialogBox header="Are you sure wanna delete this page?" description="All the form data of this page will be lost" onCancel={this.hideDeleteDialog} deletePage={this.deletePage} toggleOff={this.hideDeleteDialog} />}
            </div>

        )
    }
}


export default class HorizontalPageBar extends Component {

    state = {
        newPageInput: false,
        pageInput: ""
    }


    onNewPageClick = (flag) => {

        if (this.state.newPageInput === flag) {
            return
        }

        if (!flag) {
            if (this.state.pageInput.length > 0) {
                this.props.addNewPage(this.state.pageInput)
                this.setState({ pageInput: "" })
            }
        }

        this.setState({ newPageInput: flag })
    }

    renamePage = (pageName, newPageName) => {
        this.props.renamePage(pageName, newPageName)
    }

    deletePage = (pageName) => {
        this.props.deletePage(pageName)
    }

    onInputChange = (event) => {
        this.setState({ pageInput: event.target.value })
    }

    render() {

        return (
            <Droppable
                type="pagebar"
                droppableId={1}
                direction="horizontal"
            >
                {
                    (provided) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ position: "absolute", top: "-50px", left: "0px", height: "50px", padding: "0px 5px", backgroundColor: "rgb(234, 248, 245)", display: "grid", gridAutoFlow: "column", justifyContent: "center", alignItems: "center", borderRadius: "5px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px" }}
                            >
                                {
                                    this.props.pageData.map((data, i) => {
                                        return (
                                            <Draggable
                                                key={data.name}
                                                draggableId={data.name}
                                                type="pagebar"
                                                index={i}
                                            >
                                                {
                                                    (provided) => {
                                                        let isSelected = data.name === this.props.activePageName
                                                        return (
                                                            <PageButton deletePage={this.deletePage} renamePage={this.renamePage} setActivePage={this.props.setActivePage} isSelected={isSelected} provided={provided} data={data} />
                                                        )
                                                    }
                                                }
                                            </Draggable>
                                        )
                                    })
                                }
                                {
                                    provided.placeholder
                                }

                                <OutsideClick onOutsideClick={() => { this.onNewPageClick(false) }}>
                                    <div id="addPage" onClick={() => this.onNewPageClick(true)} >
                                        {this.state.newPageInput && <PageNameInput onEnter={() => this.onNewPageClick(false)} onChange={this.onInputChange} />} <i id="addPageIcon" className="fa fa-plus"></i>
                                    </div>
                                </OutsideClick>

                            </div>)
                    }
                }

            </Droppable>

        )
    }
}