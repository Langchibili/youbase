'use client'

import React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Grid,
  Alert,
} from '@mui/material'
import { api_url } from '@/Constants'
import { textHasPhoneNumber, validateEmail } from '@/Functions'

export default class ContactSupportForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      contactMethod: '',
      email: '',
      phone: '',
      issue: '',
      issueBody: '',
      submitting: false,
      errorExists: false,
      errorText: '',
      supportIssues: [],
      supportContacted: false
    }
  }

  async componentDidMount() {
    const supportIssues = await fetch(api_url+'/support-issue', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error))

      if(supportIssues && supportIssues.data && supportIssues.data.attributes.issues){
        this.setState({
            supportIssues: supportIssues.data.attributes.issues
        })
     }
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value, errorExists: false })
  }

  handleSubmit = async () => {
    const { firstName, lastName, contactMethod, email, phone, issue } = this.state

    if (!firstName || !lastName || !contactMethod || !issue) {
      this.setState({
        errorExists: true,
        errorText: 'Please fill out all mandatory fields. Fields with a *',
      })
      return
    }

    if (contactMethod === 'email' && !validateEmail(email)) {
      this.setState({
        errorExists: true,
        errorText: 'Please provide a valid email address.',
      })
      return
    }

    if (contactMethod === 'phone' && !textHasPhoneNumber(phone)) {
      this.setState({
        errorExists: true,
        errorText: 'Please provide a valid phone number.',
      })
      return
    }

    if (issue === 'Other' && this.state.issueBody.length < 1) {
      this.setState({
        errorExists: true,
        errorText: 'Please provide additional details about the issue.',
      })
      return
    }

    this.setState({ submitting: true })

    const supportRequest = {
      data:{
        issue,
        fullnames: firstName+ " "+lastName,
        body: this.state.issueBody,
        email:null,
        phoneNumber: null
      }
    }
    if(contactMethod === 'email'){
        supportRequest.data.email = email
    }
    
    if(contactMethod === 'phone'){
        supportRequest.data.phoneNumber = phone
    }

    const response = await fetch(api_url+'/supports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supportRequest),
    }).then((res) => res.json())

    if (!response.hasOwnProperty("error")) {
      this.setState({
        submitting: false,
        firstName: '',
        lastName: '',
        contactMethod: '',
        email: '',
        phone: '',
        issue: '',
        issueBody: '',
        errorExists: false,
        errorText: '',
        supportContacted: true
      })
    } else {
      this.setState({
        submitting: false,
        errorExists: true,
        errorText: 'An error occurred. Please try again later.',
      })
    }
  }

  render() {
    const { firstName, lastName, contactMethod, email, phone, issue, issueBody, supportIssues, errorExists, errorText, submitting } = this.state
    if(this.state.supportContacted){
        return <Alert severity='success'> Thank you for contacting our support team, we shall look into your issue and get back to you within 48 hours.</Alert>
    }
    return (
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Support
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => this.handleInputChange('firstName', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => this.handleInputChange('lastName', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>How Should We Contact You?</InputLabel>
              <Select
                value={contactMethod}
                onChange={(e) => this.handleInputChange('contactMethod', e.target.value)}
              >
                <MenuItem value="email">Via Email</MenuItem>
                <MenuItem value="phone">Via Phone</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {contactMethod === 'email' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => this.handleInputChange('email', e.target.value)}
                required
              />
            </Grid>
          )}
          {contactMethod === 'phone' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => this.handleInputChange('phone', e.target.value)}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Issue</InputLabel>
              <Select
                value={issue}
                onChange={(e) => this.handleInputChange('issue', e.target.value)}
              >
                <MenuItem value="">-- Select an Issue --</MenuItem>
                {supportIssues.map((issue, index) => (
                  <MenuItem key={index} value={issue}>
                    {issue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Details (Optional)"
              multiline
              rows={4}
              value={issueBody}
              onChange={(e) => this.handleInputChange('issueBody', e.target.value)}
            />
          </Grid>
          {errorExists && (
            <Grid item xs={12}>
              <Typography color="error">{errorText}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }
}
