import React from 'react'
import './Sidebar.css'
import './Searchbar.css'
import './SidebarChat.css'
import SidebarChat from './SidebarChat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from '@material-ui/core'
import {SearchOutlined} from '@material-ui/icons'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
          {/** profile Pic  */}
            <Avatar/>

            {/**Icons  */}
            <div className='sidebar_headerRight'>
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>



        {/**Search Bar  */}
        <div className='sidebar_search'>
          <div className='sidebar_searchContainer'>
          <SearchOutlined/>
          <input 
          placeholder='Search or start new chat'
          type="text"
          />
          </div>
        </div>
        

        {/**Chats  */}
        <div className='sidebar_chats'>
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
        </div>
    </div>
  )
}

export default Sidebar