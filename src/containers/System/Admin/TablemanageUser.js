import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TablemanageUser.scss';
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";

class TablemanageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleUserEditFromParentKey(user)
    }
    render() {
        console.log('check list: ', this.props.listUsers);
        console.log('check state: ', this.state.usersRedux);
        let arrUsers = this.state.usersRedux;
        return (

            <table>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th >Action</th>
                    </tr>

                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        ><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TablemanageUser);
