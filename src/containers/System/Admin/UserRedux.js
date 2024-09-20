import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import { Lightbox } from "react-modal-image";
import TablemanageUser from './TablemanageUser';
import { curry } from 'lodash';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //this.props.dispatch(actions.fetchGenderStart());
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render -> didupdate
        // check hiện tại (this) và quá khứ (prev)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({

                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE

            })
        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: file
            }
            )
        }

    }
    openPreviewImage = () => {

        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    closePreviewImage = () => {
        this.setState({
            isOpen: false
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
            'gender',
            'position',
            'role']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state.action;
        if (this.state.action === CRUD_ACTIONS.CREATE) {
            //fire redux action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                //avatar:this.state.avatar
            });
        }
        console.log('check before submit', this.state)
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleUserEditFromParent = (User) => {
        console.log("chechk user: ", User)
        this.setState({
            email: User.email,
            password: 'HARDCODE',
            firstName: User.firstName,
            lastName: User.lastName,
            phoneNumber: User.phonenumber,
            address: User.address,
            gender: User.gender,
            position: User.positionId,
            role: User.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: User.id
        }, console.log('chechk action from parent: ', this.state))
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGenderReact = this.props.isLoadingGender;
        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar } = this.state;
        return (
            <div className="user-reduc-container" >
                <div className='title'>
                    Redux With User
                </div>

                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 mt-3'>{isLoadingGenderReact === true ? 'Loading gender' : ''}</div>
                            <div className='col-12 mt-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phonenumber' /></label>
                                <input className='form-control' type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" className='form-control' type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit' />
                                        :
                                        <FormattedMessage id='manage-user.save' />
                                    }
                                </button>
                            </div>
                            <div className='col-12'>
                                <TablemanageUser
                                    handleUserEditFromParentKey={this.handleUserEditFromParent}
                                    action={this.state.action}
                                />
                            </div>
                            <div style={{ height: '220px' }}></div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        medium={this.state.previewImgURL}
                        large={this.state.previewImgURL}
                        alt="Ảnh đại diện"
                        onClose={this.closePreviewImage}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
