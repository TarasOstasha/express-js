const appState = {
  header: {
    isLogged: false,
    user: {
      name: '',
      _id: 'unlogged'
    },
    basket: {
      open: false,
      products: [],
      defaultData: {
        states: []
      },
      paymentData: {}
    },
    searchResult: []
  },
  products: [],
  pages: {
    admin: {
      header: {
        isLogged: false,
        user: {
          name: ''
        },
        basket: {
          open: false,
          products: [],
          defaultData: {
            states: []
          },
          paymentData: {}
        },
        searchResult: [],
      },
      products: [],
      productPage: 1,
      productChunk: 10,
      users: [],
      newProduct: {
        productName: '',
        productPrice: 0,
        productCategories: {name:'hight level',subCategories:[]},
        checkedCategory: '',
        color: '',
        colorProducts: [],
        standartSizes: [{ size: 6, checked: true },
                        { size: 7, checked: true },
                        { size: 8, checked: true },
                        { size: 9, checked: true },
                        { size: 10, checked: true },
                        { size: 11, checked: true },
                        { size: 12, checked: true }
                      ],
        sizes: [],

        currentNewProductImg: 'assets/img/sws1.png',
        previews: [
          {
            reader: {
              result: "assets/img/400x300.png"
            }
          }
        ]
      },
      table: {
        user: {
          range: 5,
          start: 0,
          end: 4,
          page: 1,
          search: ''
        },
        product: {
          range: 5,
          start: 0,
          end: 4,
          page: 1,
          search: ''
        }
      },

      productSearchResult: [], // idea???
      userSearchResult: [] // idea???
    }
  }

}



export default appState;