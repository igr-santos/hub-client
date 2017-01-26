import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { SettingsFinishMessagePage } from '~widget-plugins/match/pages'

describe('client/mobilizations/widgets/__plugins__/match/pages/settings-finish-message-page', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SettingsFinishMessagePage />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})