import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
        }
        return result;
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
        console.log('check state: ', this.props.saveDetailDoctor)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let priceId = '', provinceId = '', paymentId = '', addressClinic = '', nameClinic = '', note = '',
                selectedPrice = '', selectedProvince = '', selectedPayment = '';

            if (res.data.Doctor_Infor) {
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                paymentId = res.data.Doctor_Infor.paymentId;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })


            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedPayment: selectedPayment,

            })

        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''

            })
        }
        console.log('Hoi dan it channel: ', res);
    };
    handleChangeSelectDoctorInfor = (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({ ...stateCopy })
    }

    handleOnchangeText = (event, id) => {
        console.log('check text area: ', event, id)
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className='more-info'>
                    <div className='content-left form-group'>

                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}

                        />
                    </div>
                    <div className='content-right'>

                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control' onChange={(event) => this.handleOnchangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>

                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.nameclinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.addressclinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor"></div>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    value={this.state.contentMarkdown}
                    onChange={this.handleEditorChange} />
                <button className={this.state.hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >{this.state.hasOldData === true ? <span><FormattedMessage id='admin.manage-doctor.save' /></span>
                    :
                    <span><FormattedMessage id='admin.manage-doctor.add' /></span>}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: (id) => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
