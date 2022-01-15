import create from "zustand"

type Store = {
  setSearchTags:(value:string[] | null)=>void,
  searchTags:string[] | null,
  setSearchQuery:(value:string)=>void,
  searchQuery:string,
  setSelection:(value:string)=>void,
  selection:string,
  fullTags:{id:string, name:string}[] | null,
  setFullTags:(value : {id:string, name:string}[] | null)=>void,
}

const useStore = create<Store>((set)=>({
  searchTags:null,
  searchQuery:"",
  selection:"all",
  fullTags:null,

  setSearchTags(value:string[] | null){
    set((state)=>({
      ...state,
      searchTags:value
    }));
  },

  setFullTags(value:{id:string, name:string}[] | null){
    set((state)=>({
      ...state,
      fullTags:value
    }));
  },

  setSearchQuery(value:string){
    set((state)=>({
      ...state,
      searchQuery:value
    }));
  },

  setSelection(value:string){
    set((state)=>({
      ...state,
      selection:value
    }));
  },
  
}))
export default useStore;