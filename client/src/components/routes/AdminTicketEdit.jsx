import React, { Component } from "react"
import Layout from "../shared/Layout"
import { Link } from "react-router-dom"
import apiUrl from "../../apiConfig"
import Axios from "axios"

import "../../styles/admin-tickets.css"

class AdminTicketEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: null,
      updated: false,
    }
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedTicket = Object.assign(this.state.ticket, updatedField)

    this.setState({ ticket: editedTicket })
  }

  async componentDidMount() {
    try {
      const response = await Axios(
        `${apiUrl}/api/tickets/${this.props.match.params.id}`
      )
      this.setState({
        ticket: response.data.ticket,
        deleted: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  updateTicket = async (event) => {
    event.preventDefault()

    Axios({
      url: `${apiUrl}/api/tickets/${this.props.match.params.id}`,
      method: "PUT",
      data: this.state.ticket,
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  ticketDetailEdit = () => {
    if (this.state.ticket && !this.state.updated) {
      return (
        <React.Fragment>
          <div className="admin-ticket-detail">
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Number:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="id"
                onChange={this.handleChange}
                value={this.state.ticket.id}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Type:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="type"
                onChange={this.handleChange}
                value={this.state.ticket.type}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Start:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="startLocation"
                onChange={this.handleChange}
                value={this.state.ticket.startLocation}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket End:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="endDestination"
                onChange={this.handleChange}
                value={this.state.ticket.endDestination}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket BusId:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="busId"
                onChange={this.handleChange}
                value={this.state.ticket.busId}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket TravelTime:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="travelTime"
                onChange={this.handleChange}
                value={this.state.ticket.travelTime}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Price:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="price"
                onChange={this.handleChange}
                value={this.state.ticket.price}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Tax:</div>
              <input
                className="admin-ticket-value edit"
                type="text"
                name="tax"
                onChange={this.handleChange}
                value={this.state.ticket.tax}
              />
            </div>
            <div className="admin-ticket-field-container">
              <div className="admin-ticket-field">Ticket Donation:</div>
              <div className="admin-ticket-value edit">
                <input
                  className="edit checkbox"
                  type="checkbox"
                  name="donation"
                  onChange={this.handleChange}
                  checked={this.state.ticket.donation}
                />
              </div>
            </div>
          </div>
          <div>
            <button onClick={this.updateTicket}>Update</button>
          </div>
        </React.Fragment>
      )
    } else if (this.state.updated) {
      return <h4>Ticket updated</h4>
    } else {
      return <h4>Loading...</h4>
    }
  }

  render() {
    return (
      <Layout>
        <h1>Admin Ticket Edit:</h1>
        <div>
          <Link to={`/admin/tickets/${this.props.match.params.id}`}>
            <button>Back</button>
          </Link>
        </div>
        {this.ticketDetailEdit()}
      </Layout>
    )
  }
}

export default AdminTicketEdit
