import { ref, reactive } from "vue";

export function PiniaHistoryPlugin({ pinia, app, store, options }) {

  if (!options.historyEnabled) return
  const history = reactive([])
  const future = reactive([])
  const doingHistory = ref(false)
  history.push(JSON.stringify(store.$state))

  const redo = () => {
    const latestState = future.pop()
    if (!latestState) return;
    doingHistory.value = true;
    history.push(latestState)
    store.$state = JSON.parse(latestState)
    doingHistory.value = false
  }
  const undo = () => {
    if (history.length === 1) return
    doingHistory.value = true;
    future.push(history.pop());
    store.$state = JSON.parse(history.at(-1));
    doingHistory.value = false;
  }

  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state))
      future.splice(0, future.length)
    }
  })

  store.$onAction(({
    name,
    // store,
    args,
    after,
    // onError
  }) => {
    if (name === 'addItems') {
      after(() => {
        console.log(args[0])
      })
    }
  })

  return { undo, redo, history, future }

}