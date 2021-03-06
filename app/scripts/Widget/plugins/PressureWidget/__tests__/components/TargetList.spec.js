import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { TargetList } from '../../components'

describe('<TargetList />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TargetList />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    expect(wrapper.find('.target-item').length).to.equal(0)
  })

  it('should render .target-item according targets passed', () => {
    wrapper.setProps({
      targets: ['Igor Santos <igor@nossascidades.org>']
    })
    expect(wrapper.find('.target-item').length).to.equal(1)
  })

  it('should render target parsed to Name <user@host.com>', () => {
    const targets = ['Igor Santos <igor@nossascidades.org>']
    wrapper.setProps({targets: targets})

    expect(wrapper.find('.target-item span').at(0).text()).to.equal('Igor Santos')
    expect(wrapper.find('.target-item span').at(1).text()).to.equal('igor@nossascidades.org')
  })
})
