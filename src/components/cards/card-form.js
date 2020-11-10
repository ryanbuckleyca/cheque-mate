import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../../scripts/callAPI';
import dateToStr from '../../scripts/dateToStr';
import requiredFieldsValid from '../../scripts/requiredFieldsValid';
import './cards.scss';
import '../forms/form.scss';


class CardForm extends Component {

  // TODO: create Delete/Destroy actions
  // consider renaming to form controller

  loadRecordState(table, id='') {
    const user_id = 1; // TODO: get this from auth0 props
    console.log('on loadRecordState props is ', this.props)
    callAPI(`/api/${table}/${id}`)
    .then(result => {
      if (result && result.due_date)
        result.due_date = dateToStr(result.due_date);
      this.setState({ ...result, user_id: user_id })
    })
  }

  saveFormToDB() {
    const url = `/api/${this.props.table}/${this.props.id || ''}`
    const method = this.props.id ? 'PUT' : 'POST'
    const body = this.state

    callAPI(url, method, body)
      .then(res => {
        console.log(`${this.props.table} saved`)
        return res
      }).catch(err => console.log('card-form saveFormToDB err: ', err))
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFieldsValid()) {
      const saved =  await this.saveFormToDB();
      console.log('submitted: database result is ', saved)
    }
    else {
      // TODO: render form to show errors
      console.log('Fields null or undefined')
    }
  }

  changeHandler = (e) => {
    console.log('change handler called in card-form with event: ', e)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, console.log('new state is: ', this.state))

  }

  passProps = (props) => {
    console.log('passProps called with: ', props)
    this.setState({ ...props })
  }

  componentDidMount() {
    const { table, id } = this.props
      this.loadRecordState(table, id || 'new');
  }

  render() {
    if(!this.props.table)
      return "Loading..."

    return(
      <form className="form-wrapper">
        <div className='card-form'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            passProps: this.passProps,
            auth0_id: this.props.auth0.user.sub,
            ...this.state
          })}

          {/* CardFormFields */}
          {React.cloneElement(this.props.children[1], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            passProps: this.passProps,
            auth0_id: this.props.auth0.user.sub,
            ...this.state
          })}
        </div>
      </form>
    );
  }
}

export default withAuth0(CardForm);
