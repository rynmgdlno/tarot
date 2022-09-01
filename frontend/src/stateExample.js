// State Template

{
  UI: {
    composer: {
      channelEditor: [
        { id: 0, red: 235, green: 241, blue: 205 },
        { id: 1, red: 50, green: 133, blue: 123 },
        { id: 2, red: 93, green: 180, blue: 164 },
        { id: 3, red: 220, green: 202, blue: 128 },
        { id: 4, red: 220, green: 154, blue: 70 }
      ],
        { colorSlider: false || true },
        { editorSlider: false || true }
    }
    modals: {
      userModal: {
        { userToggled: false || true }
        { loggedIn: null || user }
        { thirdParty: null || serviceName } 
      }
      palettesModal: {
        { palettesToggled: false || true }
        { savedPalettes: null || palettesObject }
      }
      saveModal: {
        { saveToggled: false || true }
      }
      helpModal: {
        { helpToggled: false || true }
      }
    }
  }
  DATA: {
    savedPalettes: []
    prevQuery: ''
    query: ''
    queryResult: []
    queryResultLength: null
    activeQueryResult: 0
    queryPages: 0
    currentPage: 1
  }
}
