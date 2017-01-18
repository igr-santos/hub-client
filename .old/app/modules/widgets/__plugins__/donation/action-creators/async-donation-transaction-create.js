import { createAction } from './create-action'
import * as t from '../action-types'
<<<<<<< HEAD
import AnalyticsEvents from '../../../../../modules/widgets/utils/analytics-events'
=======
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316

const asyncDonationTransactionCreate = params => (dispatch, getState, axios) => {
  const endpoint = `/mobilizations/${params.mobilization_id}/donations`
  const body = { donation: genRequestPayload(params) }

  dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_REQUEST })
  return axios.post(endpoint, body)
    .then(response => {
      dispatch({ type: t.ASYNC_DONATION_TRANSACTION_CREATE_SUCCESS })
<<<<<<< HEAD

      AnalyticsEvents.donationFinishRequest()

=======
>>>>>>> d93940b3... Merge app structure of branch develop into .old directory #316
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.ASYNC_DONATION_TRANSACTION_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

export default asyncDonationTransactionCreate

const genRequestPayload = params => ({
  widget_id: params.widget_id,
  card_hash: params.card_hash,
  payment_method: params.payment_method,
  amount: params.amount,
  customer: params.customer,
  subscription: params.subscription,
  period: params.recurring_period
})
