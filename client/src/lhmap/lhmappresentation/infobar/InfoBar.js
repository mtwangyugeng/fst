import './InfoBar.css'

import React from 'react';
import LHMapPopup from '../lhmappopup/LHMapPopup';

export default class InfoBar extends React.Component{

    render() {
        return (
            <div className= "InfoBar-main" >
                <div className="InfoBar-clicker" onClick = {this.props.clickered}>
                    {this.props.active?'>':'<'}
                </div>
                <div className= {"InfoBar-content "+ (this.props.active?'InfoBar-content-a':'')}>
                    {/*contents go here*/}
                    {this.props.active_id}
                    {/* {this.props.content} */}
                    <LHMapPopup 
                        locationfishlocal = {this.props.locationfishlocal[this.props.active_id]} 
                        postNewFishLocal_initial = {this.props.postNewFishLocal_initial} 
                        id = {this.props.active_id}
                        requestFishInfo_initial = {this.props.requestFishInfo_initial}
                    />
                </div>
            </div>
        )
    }


}