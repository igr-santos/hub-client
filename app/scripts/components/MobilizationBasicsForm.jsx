import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import reduxForm from 'redux-form'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import * as MobilizationActions from './../actions/MobilizationActions'

function mobilizationBasicsValidation(data) {
  const errors = {}
  if (!data.name) {
    errors.name = 'Informe nome da mobilização'
  }
  if (!data.goal) {
    errors.goal = 'Informe o objetivo da mobilização'
  }
  return errors
}

@connect(state => ({ form: state.mobilizationBasics }))
@reduxForm('mobilizationBasics', mobilizationBasicsValidation)
@reactMixin.decorate(Navigation)

export default class MobilizationBasicsForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      initializing: true,
      submitting: false,
      error: null
    }
    const { name, goal } = props.mobilization || {name: undefined, goal: null}
    props.initializeForm({name, goal})
  }

  componentWillReceiveProps(nextProps) {
    this.state.initializing && this.setState({initializing: false})
    this.state.submitting && this.setState({submitting: false})
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    touchAll: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, touchAll, valid, dispatch, mobilization } = this.props
    const mobilizationAction = (mobilization ? MobilizationActions.editMobilization : MobilizationActions.addMobilization)
    const mobilizationId = (mobilization ? mobilization.id : null)
    const defaultData = (mobilization ? {} : {color_scheme: 'meurio-scheme'})
    this.setState({ submitting: true, error: null })

    if (valid) {
      dispatch(mobilizationAction({
        id: mobilizationId,
        transitionTo: this.transitionTo.bind(this), 
        mobilization: {...data, ...defaultData}
      }))
    } else {
      touchAll()
      this.setState({ submitting: false })
    }
  }

  handleCancelClick(event) {
    event.preventDefault()
    this.goBack()
  } 

  renderErrorMessage() {
    if (this.state.error) {
      return (
        <div className="red center mt2">{this.state.error}</div>
      )
    }
  }

  renderCancelButton() {
    if(this.props.mobilization) {
      return (
        <button
          className="caps button bg-darken-3 col col-3 mt1 p2 mr2"
          disabled={this.state.submitting} 
          onClick={::this.handleCancelClick}>
          Cancelar
        </button>
      )
    }
  }

  renderForm() {
    const {
      data: { name, goal },
      errors: { name: nameError, goal: goalError },
      touched: { name: nameTouched, goal: goalTouched },
      handleChange,
      handleBlur,
      mobilization
    } = this.props
    const submitText = (mobilization ? 'Salvar' : 'Continuar')

    return (
      <form onSubmit={::this.handleSubmit}>
        <label className="block h6 caps bold mb1">Nome</label>
        {nameError && nameTouched && <span className="red ml2">{nameError}</span>}
        <input
          type="text"
          className="field-light block full-width mt1 mb2"
          placeholder="Ex: Pela criação de uma delegacia de desaparecidos"
          style={{height: '44px'}}
          value={name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')} />

        <label className="block h6 caps bold mb1">Objetivo</label>
        {goalError && goalTouched && <span className="red ml2">{goalError}</span>}
        <textarea
          className="field-light block full-width mt1 mb2"
          placeholder="Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois."
          style={{height: '160px'}}
          value={goal}
          onChange={handleChange('goal')}
          onBlur={handleBlur('goal')} />


        <div className="clearfix">
          {this.renderCancelButton()}
          <input
            type="submit"
            className={classnames("caps button bg-aqua mt1 p2", (mobilization ? 'col col-3' : 'full-width'))}
            disabled={this.state.submitting}
            value={this.state.submitting ? "Salvando..." : submitText} />
        </div>

        {::this.renderErrorMessage()}
      </form>
    )
  }

  render(){
    return(
      <div className="bg-white border rounded lg-col-6 mx-auto p3">
        { !this.state.initializing && this.renderForm() }
      </div>
    )
  }
}