import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart, faWindowClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faShoppingCart, faWindowClose, faTrashAlt)
export default (app) => {
  app.component('fa', FontAwesomeIcon)
}
