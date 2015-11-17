
export function actionGravatarFetching() {
  return {type: 'GRAVATAR_FETCHING'}
}

export function actionGravatarFetchedSuccess() {
  return {type: 'GRAVATAR_FETCHED_SUCCESS'};
}

export function actionGravatarFetchedFail() {
  return {type: 'GRAVATAR_FETCHED_FAIL'};
}

export function actionGravatarChangeSize(size) {
  return {type: 'GRAVATAR_CHANGE_SIZE', size};
}
