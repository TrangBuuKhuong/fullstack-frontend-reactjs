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
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    componentDidMount() {
        this.props.fetchAllDoctor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('check state: ', this.props.saveDetailDoctor)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true

            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false

            })
        }
        console.log('Hoi dan it channel: ', res);
    };
    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-info'>
                    <div className='content-left form-group'>

                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>

                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows='4' onChange={(event) => this.handleOnchangeDesc(event)}
                            value={this.state.description}
                        >abc</textarea>
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
                >{this.state.hasOldData === true ? <span>Lưu thông tin </span> : <span>Tạo thông tin</span>}</button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: (id) => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
