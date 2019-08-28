const appState = {
    header: {
      isLogged: false,
      user: {
        name: ''
      },
      basket: {
        open: false,
        products: [],
        defaultData : {
          states: []
        },
        paymentData :{}
      },
      searchResult: []
    },
    products: [],
  }

 export default appState;