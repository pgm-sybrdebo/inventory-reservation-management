import React from 'react'

import { Multiselect } from 'multiselect-react-dropdown';
import {useQuery } from "@apollo/client"
import { GET_TAGS } from '../../graphql/tags';
import { FilterParams } from '../../interfaces';
import useStore from '../../store';

function TegSelect({name, onChange}:FilterParams) {
  const store = useStore();
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
    selectedValues={store.fullTags}
  />
    </div>
  )
}


export default TegSelect
