import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions/index';

// As surveyFormReview is not a direcet desecndent of App, it does not have access to react-router features like Link, which is what we've been using to navigate. To give it some functionality, we wrap the export variable with "withRouter" which gives it what we need. This lets us provide the action creator the history prop which will be used to redirect after everything is done.
import { withRouter } from 'react-router-dom';

// this is actually props.onCancel, ptops.formValues
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // const reviewFields = _.map(formFields, field => { - again we destructure and instead of field.name, we do ({name}) which is the same
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Review your form</h5>

      {reviewFields}
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={onCancel}
        style={{ marginTop: 10 }}
      >
        Back
      </button>
      <button
        className='green btn-flat right white-text'
        style={{ marginTop: 10 }}
        onClick={() => submitSurvey(formValues, history)}
      >
        Send survey
        <i className='material-icons right'>mail</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
