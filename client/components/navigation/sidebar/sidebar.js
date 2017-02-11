import React, { PropTypes } from 'react'

// Global module dependencies
import { Loading } from '~components/await'
import {
  Sidenav,
  SidenavList,
  SidenavListItem
} from '~components/navigation/sidenav'
import * as paths from '~client/paths'
import * as BlockPaths from '~mobilizations/blocks/paths'

const Sidebar = props => {
  const { children, loading, mobilization, user, community } = props

  if (loading) return <Loading />

  return (
    <div className='top-0 right-0 bottom-0 left-0 flex flex-column absolute'>
      <Sidenav community={community}>
        {
          !mobilization ? null : (
            <SidenavList className='bg-lighten-2'>
              <SidenavListItem
                text='Editar mobilização'
                icon='pencil'
                href={paths.editMobilization(mobilization.id)}
              />
              <SidenavListItem
                text='Adicionar conteúdo'
                icon='plus'
                href={BlockPaths.createBlock({ id: mobilization.id })}
              />
              <SidenavListItem
                text='Ver em uma nova aba'
                icon='external-link'
                linkType='anchor'
                href={paths.mobilization(mobilization)}
                target='_blank'
              />
              <SidenavListItem
                text='Configurações'
                icon='cog'
                href={paths.basicsMobilization(mobilization.id)}
              />
            </SidenavList>
          )
        }
        <SidenavList style={{ position: 'absolute', bottom: '0' }}>
          <SidenavListItem text='Minha Conta' icon='user' href={paths.editAccount()}>
            <div className='white h6'>{user.email}</div>
          </SidenavListItem>
          <SidenavListItem
            icon='sign-out'
            text='Sair'
            className='caps'
            href={paths.logout()}
          />
        </SidenavList>
      </Sidenav>
      <div className='flex flex-auto' style={{ marginLeft: '80px' }}>
        {children && React.cloneElement(children)}
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  mobilization: PropTypes.object
}

export default Sidebar