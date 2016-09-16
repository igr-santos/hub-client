import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { FormControl } from '../../Forms'


describe('<FormControl />', () => {
  let wrapper
  const context = {
    $formRedux: { formInline: false, submitting: false, dirty: false },
    $formGroup: { controlId: 'form-group-id' }
  }

  beforeEach(() => {
    wrapper = mount(<FormControl />, { context })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set id when $formGroup.controlId passed by context', () => {
    expect(wrapper.find('input').props().id).to.equal('form-group-id')
  })

  it('should set props field redux-form passed by context', () => {
    const onChange = () => {}
    const onBlur = () => {}
    const cloneContext = context
    const formGroupContext = {
      $formGroup: {
        value: 'Form Control',
        onChange: onChange,
        onBlur: onBlur
      }
    }
    wrapper.setContext(Object.assign(cloneContext, formGroupContext))
    expect(wrapper.find('input').props().value).to.equal('Form Control')
    expect(wrapper.find('input').props().onChange).to.equal(onChange)
    expect(wrapper.find('input').props().onBlur).to.equal(onBlur)
  })

  it('should resize to 20rem when componentClass is textarea', () => {
    wrapper.setProps({ componentClass: 'textarea' })
    expect(wrapper.find('textarea').props().style.height).to.equal('20rem')
  })

  describe('when it is form inline style', () => {
    before(() => {
      const cloneContext = context
      const formReduxContext = { $formRedux: { formInline: true } }
      wrapper.setProps(Object.assign(cloneContext, formReduxContext))
    })
    it('should render <ControlButtons> component', () => {
      expect(wrapper.find('ControlButtons')).to.have.length(1)
    })
    it('should render input with width in its style', () => {
      expect(wrapper.find('.form-control-input').props().style).to.have.property('width')
    })
    it('should render input with 250px of width in its style', () => {
      expect(wrapper.find('.form-control-input').props().style).to.have.property('width', '250px')
    })
    it('should render input with form inline style specific className', () => {
      expect(wrapper.find('.form-control-input').props().className).to.have.string('inline-block')
    })
  })
})