import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import {useQuery } from "@apollo/client"
import { GET_TAGS } from '../../graphql/tags';
import { FilterParams } from '../../interfaces';

function TegSelect({name, onChange}:FilterParams) {
  //const fullSelection = JSON.parse(localStorage.getItem("fullSelection")!);
  const {data} = useQuery(GET_TAGS);
  let items: { id: string; name: string; }[] = []
  data && data.tags.forEach((item: { id: string; name: string; }) => {
    items.push({id: `${item.id}`, name: `${item.name}`}) 
  })
  return (
    <div className="selectWrapper">
    <label className="mutiselect-label">By Tags</label>
    <Multiselect        
    name={name}
    onRemove={onChange}
    onSelect={onChange}
    options={items}
    displayValue="name"
    // selectedValues={fullSelection}
  />
    </div>
  )
}


export default TegSelect
