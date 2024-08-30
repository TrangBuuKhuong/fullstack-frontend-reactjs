import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }
    state = {

    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleOnchangeInput = (event, id) => {
        //bad code: Modify state
        /*
         * Modify directly constructor
         * This.state.email == this.state['email']
         * 
         */
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // })

        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleAddnewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // Call API create modal
            this.props.createNewUser(this.state)
        }
    }
    render() {
        //console.log(this.props);
        //console.log(this.props.isOpen);
        return (
            <Modal
                size='lg'
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}>
                <ModalHeader toggle={() => { this.toggle() }}
                >
                    Create new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='row'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                    value={this.state.email}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                    value={this.state.password}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Frist Name</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                    value={this.state.firstName}
                                ></input>
                            </div>
                            <div className='input-container'>
                                <label>Last Name</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}
                                    value={this.state.lastName}
                                ></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                    value={this.state.address}
                                ></input>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddnewUser() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

