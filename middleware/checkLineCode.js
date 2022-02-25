export default ({ redirect, route }) => {
  if (route.query.code) {
    redirect(`${process.env.VUE_APP_REDIRECTURI}/register?code=${route.query.code}`)
  }
}