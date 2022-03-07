// export const member = ({ $request }, inject) => {
//   return $request({
//     url: "members/login",
//     method: "post",
//     data
//   })
// }

export default ({ $request }, inject) => {
  const member = {
    api: {
      login(data) {
        return $request({
          url: "members/login",
          method: "post",
          data
        })
      }
    }
  }
}

