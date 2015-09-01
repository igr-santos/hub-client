import React from 'react'
import { Route } from 'react-router'
import { Application, Mobilizations, Mobilization } from '../../app/scripts/containers'
import { Login, Logout, ListMobilizations, NewMobilization, ShowMobilization,
  EditMobilization, MobilizationBasics, MobilizationCity,
  MobilizationAnalytics, NewBlock, FormWidgetFields,
  FormWidgetForm } from '../../app/scripts/pages'
import { TopMenu, MobilizationMenu } from '../../app/scripts/components'

export default function(store) {
  return (
    <Route component={Application}>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route component={Mobilizations}>
        <Route path="/" components={{main: ListMobilizations, topMenu: TopMenu}} />
        <Route path="/mobilizations/new" components={{main: NewMobilization, topMenu: TopMenu}} />
          <Route component={Mobilization} >
            <Route path="/mobilizations/:mobilization_id" components={{main: ShowMobilization}} />
            <Route path="/mobilizations/:mobilization_id/edit" components={{main: EditMobilization, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/basics" components={{main: MobilizationBasics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/city" components={{main: MobilizationCity, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/cityNew" components={{main: MobilizationCity, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/analytics" components={{main: MobilizationAnalytics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/blocks/new" components={{main: NewBlock, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/widgets/:widget_id/fields" components={{main: FormWidgetFields, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/widgets/:widget_id/form" components={{main: FormWidgetForm, sidebar: MobilizationMenu, topMenu: TopMenu}} />
          </Route>
      </Route>
    </Route>
  );
}