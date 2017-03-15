import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import ReactS3Uploader from 'react-s3-uploader'

import DefaultServerConfig from '~server/config'
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation'
import ColorPicker from '~components/color-picker'
import { BlockMiniature } from '~mobilizations/blocks/components'
import { BLOCK_LAYOUTS } from '~mobilizations/blocks/constants'
import * as BlockActions from '~mobilizations/blocks/action-creators'

if (process.env.BROWSER) require('./page.scss')

class BlocksCreatePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedLayout: BLOCK_LAYOUTS[0],
      color: undefined,
      bgImage: undefined,
      uploading: undefined
    }
  }

  render () {
    const { mobilization, location, onCreateBlock } = this.props
    const { color_scheme: colorScheme } = mobilization
    const newBlockPath = paths.createBlock(mobilization)

    return (
      <div className='block-create col-12 flex flex-column bg-silver gray relative'>
        <div className='block-create-header bg-white pt3 pr4 pl3'>
          <h1 className='h1 mt0 mb3'>Adicione um bloco de conteúdo</h1>
          <Tabs>
            <Tab
              path={newBlockPath}
              text='Blocos em branco'
              isActive={newBlockPath === location.pathname}
            />
          </Tabs>
        </div>

        <div className='clearfix overflow-auto'>
          <div className='col-12 clearfix py3 pr4 pl3'>
            <p className='lightgray mb2'>
              Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a
              qualquer momento
            </p>

            <label className='block-type bold mb1 block gray20'>
              Tipo de bloco
            </label>
            <div className='mxn1 clearfix'>
              {BLOCK_LAYOUTS.map((layout, index) => (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={this.state.selectedLayout}
                  onClick={() => this.setState({ selectedLayout: layout })}
                />
              ))}
            </div>

            <label className='block-type bold mb1 block gray20'>
              Fundo
            </label>
            <div className='col-12'>
              <ColorPicker
                color={this.state.color}
                onChangeColor={color => this.setState({ color: color.rgb })}
                theme={colorScheme.replace('-scheme', '')}
                className='left'
              />
              <div
                className={
                  'border border-gray94 rounded p2 bg-white center relative' +
                  ' overflow-hidden inline-block'
                }
              >
                <div className='clearfix' style={{ width: 240 }}>
                  {this.state.bgImage ? (
                    <div
                      className='bg-cover square'
                      style={{ backgroundImage: `url(${this.state.bgImage})` }}
                    />
                  ) : (
                    <div className='square-float'>
                      <i
                        className='fa fa-image silver'
                        style={{ fontSize: '7em', marginTop: '2.5rem' }}
                      />
                    </div>
                  )}
                  <div className={this.state.bgImage ? 'hide' : null}>
                    <div className='mb1 gray'>Selecione a imagem de fundo</div>
                  </div>
                  <div className='overflow-hidden'>
                    {
                      this.state.uploading
                      ? <i className='fa fa-spin fa-refresh' />
                      : <ReactS3Uploader
                        id='blockBackgroundImage'
                        signingUrl={`${DefaultServerConfig.apiUrl}/uploads`}
                        accept='image/*'
                        onProgress={progress =>
                          !this.state.uploading && this.setState({ uploading: progress })
                        }
                        onFinish={image => {
                          const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                          this.setState({ bgImage: imageUrl, uploading: undefined })
                        }}
                        className='border-none bg-darken-4 rounded p1 white'
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: '1rem',
                          width: '80%',
                          marginLeft: '-40%'
                        }}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>

            <button
              className='block-create-button btn float-btn-menu rounded'
              onClick={() => {
                const block = {
                  bg_class: this.state.color ? JSON.stringify(this.state.color) : undefined,
                  bg_image: this.state.bgImage,
                  widgets_attributes: this.state.selectedLayout.map(col => ({ kind: 'draft', ...col })),
                  mobilization_id: mobilization.id
                }
                onCreateBlock(block)
                  .then(() => {
                    browserHistory.push(
                      `${paths.editMobilization(mobilization.id)}?newBlock=true`
                    )
                  })
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

BlocksCreatePage.contextTypes = {
  router: React.PropTypes.object
}

BlocksCreatePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  onCreateBlock: PropTypes.func.isRequired
}

export default BlocksCreatePage